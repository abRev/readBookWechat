var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var SDK = require('../../lib/SDK');
var request = require('request');
var superagent = require('superagent');
var menu = require('../../menu/menu');

const baseurl = 'http://www.abrev.cn';


var sdk =new SDK('wx0d3fe90f46946b2b');
module.exports = function(app){
	app.use('/wechat',router);
}
router.get('/getUsers',function(req,res,next){
	sdk.getAccessToken((err,accessToken)=>{
		if(err){
			res.json({err:true});
		}else{
			var _res = res;
			request.get(`https://api.weixin.qq.com/cgi-bin/user/get?access_token=${accessToken}&next_openid=`,(req,res,body)=>{
				var obj = JSON.parse(body);	
				_res.render('home/user',{
					action:baseurl+'/wechat/getUser',
					users:obj.data.openid
				});
			})
		}
	})
})


router.get('/getUser',function(req,res,next){
	if(req.query.openid==undefined){
		return res.send('请输入openid');
	}
	var openid = req.query.openid;
	var promise = new Promise(function(resolve,reject){
		sdk.getAccessToken(function(err,accessToken){
			if(err){
				reject(err);
			}else{
				resolve(accessToken);
			}
		});
	});
	promise.then(function(token){
		return new Promise(function(resolve,reject){
			request.get(`https://api.weixin.qq.com/cgi-bin/user/info?access_token=${token}&openid=${openid}&lang=zh_CN`,(req,res,body)=>{
				resolve(body);
			})
		})
	})
	.then(function(body){
		var obj = JSON.parse(body);
		res.json(obj);
	})
	.catch(function(err){
		res.send(err);
	})
})

router.get('/getAllUserInfo',function(req,res,next){
	var promise = new Promise(function(resolve,reject){
		sdk.getAccessToken(function(err,token){
			if(err)
				reject(err);
			else
				resolve(token);
		});
	});

	promise.then(function(token){
		return new Promise(function(resolve,reject){
			request.get(`https://api.weixin.qq.com/cgi-bin/user/get?access_token=${token}&next_openid=`,(req,res,body)=>{
				resolve({body:body,token:token});
			})
		})
	}).then(function(body){
		var obj = JSON.parse(body.body);
		var UserListObj = {};
		UserListObj.user_list=[];
		obj.data.openid.forEach((item)=>{
			UserListObj.user_list.push({
				"openid":item,
				"lang":"zh_CN"
			})
		});
		
		superagent.post(`https://api.weixin.qq.com/cgi-bin/user/info/batchget?access_token=${body.token}`)
		.send(UserListObj)
		.end((req,_res)=>{
			res.json(_res.body);
		})
	}).catch(function(err){
		console.log(err);
		res.send('err');	
	})
})

router.get('/getGroups',function(req,res,next){
	sdk.getAccessToken((err,accessToken)=>{
		if(err){
			res.json({err:true});
		}else{
			var _res = res;
			request.get(`https://api.weixin.qq.com/cgi-bin/groups/get?access_token=${accessToken}`,(req,res,body)=>{
				_res.json(body);
			})
		}
	})	
})

router.get('/setMenu',function(req,res,next){
	sdk.getAccessToken((err,accessToken)=>{
		if(err){
			res.json({err:true});
		}else{
			menu(accessToken);
			res.json({true:1});
		}
	})
})

router.get('/getMenu',function(req,res,next){
	sdk.getAccessToken((err,accessToken)=>{
		if(err){
			res.json({err:true});
		}else{
			var _res = res;
			request.get(`https://api.weixin.qq.com/cgi-bin/menu/get?access_token=${accessToken}`,(req,res,body)=>{	
				_res.json(body);
			})
		}
	})	
})
