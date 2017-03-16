var mongoose = require('mongoose');
var sha1 = require('sha1');
var RootUser = mongoose.model('RootUser');

class sdk{
	constructor(appID){
		this.appID = appID;
		RootUser.findOne({appID:appID}).exec((err,rootUser)=>{
			if(err){
			 	throw err;
			}else{
				this.token=rootUser.token;
				this.accessToken = rootUser.accessToken;
				this.accessTicket = rootUser.accessTicket;
			}
			
		})
	}
	
	getFirstSign(signature,timestamp,nonce){
		var str = [timestamp,nonce,this.token].sort().join("");
		if(signature == sha1(str)){
			return true;
		}else{
			return false;
		}
	}
}

module.exports = sdk;
