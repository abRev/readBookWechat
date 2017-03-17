var mongoose = require('mongoose');
var wechat = require('wechat');
var express = require('express');
var router = express.Router();

var SDK = require('../../lib/SDK');

var sdk = new SDK('wx0d3fe90f46946b2b');

const config = {
	appid:sdk.appID,
	token:"abangReadBook"
}


module.exports = function(app){
	app.use('/api/wechat',router);
}


const handleWechatRequest = function(req,res,next){
	if(req.method=="GET"){
		var signature = req.query.signature;
		var nonce = req.query.nonce;
		var timestamp = req.query.timestamp;
		var echostr = req.query.echostr;
		if(sdk.getFirstSign(signature,nonce,timestamp)){
			res.send(echostr);	
		}else{
			res.send(false);	
		}
	}else{
			
	}
};
//初始化wechat定义数据接收处理函数
const handleRequest = wechat(config,function(req,res,next){
	var message = req.weixin
	console.log(message);
	if(message.MsgType == 'text'){
		res.reply(message.Content)	
	
	}else if(message.MsgType == 'video'){
		res.reply({
  		type: "video",
		  content: {
  	  	title: '来段视频吧',
	  	  description: '女神与高富帅',
    		mediaId: message.MediaId
  		}	
		})
	
	}else if(message.MsgType == 'event'){
		if(message.Event == 'subscribe'){
			console.log("new User => ",req.query.openid);
			res.reply({type:'text',content:"欢迎关注我！"});
		}else if(message.Event == 'unsubscribe'){
			console.log('丢失用户  =>',req.query.openid);
		}else{
			console.log(message.EventKey);
			res.reply({
				type:'text',content:"hello"
			})
		}
	}else{
		res.reply([
  		{
    		title: '你来我家接我吧',
	    	description: '这是女神与高富帅之间的对话',
  	  	picurl: 'http://olcbwiykm.bkt.clouddn.com/58a1dfea4b615938ac26afc4.jpg',
    		url: 'http://www.baidu.com'
 	 		}
		])
	}
})
router.post("/",handleRequest);	
router.get("/",handleWechatRequest);	
