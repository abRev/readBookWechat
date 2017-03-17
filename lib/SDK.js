var mongoose = require('mongoose');
var sha1 = require('sha1');
var RootUser = mongoose.model('RootUser');
var request = require('request');


class sdk{
	constructor(appID){
		this.appID = appID;
		RootUser.findOne({appID:appID}).exec((err,rootUser)=>{
			if(err){
			 	throw err;
			}else{
				this.rootUser=rootUser;
			}
		})
	}
	
	getFirstSign(signature,timestamp,nonce){
		var str = [timestamp,nonce,this.rootUser.token].sort().join("");
		if(signature == sha1(str)){
			return true;
		}else{
			return false;
		}
	}

	getAccessToken(callback){
		let url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${this.rootUser.appID}&secret=${this.rootUser.appSecret}`;
		const _this = this;
		if((Date.now()/1000)>this.rootUser.accessTokenTime){
			request.get(url,function(err,res,body){
				if(err){
					console.log(err);
					callback(err);
				}else{
					var data = JSON.parse(body);
					var rootUser = _this.rootUser;
					rootUser.accessToken=data.access_token;
					rootUser.accessTokenTime =Math.round(Date.now()/1000 + data.expires_in);
					rootUser.save((err)=>{
						if(err){
							callback(err);
						}else{
							_this.rootUser = rootUser;
							callback(null,data.access_token);
						}
					})
				}
			})
		}else{
			callback(null,this.rootUser.accessToken);
		}
	}
}

module.exports = sdk;
