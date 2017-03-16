var mongoose = require('mongoose');
var wechat = require('wechat');
var express = require('express');
var router = express.Router();
var SDK = require('../../lib/SDK');

var sdk = new SDK('wx0d3fe90f46946b2b');

module.exports = function(app){
	app.use('/',router);
}

router.get('/',function(req,res,next){
	var signature = req.query.signature;
	var nonce = req.query.nonce;
	var timestamp = req.query.timestamp;
	var echostr = req.query.echostr;
	if(sdk.getFirstSign(signature,nonce,timestamp)){
		res.send(echostr);	
	}else{
		res.send(false);	
	}
})
