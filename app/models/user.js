var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new  Schema({
	openid:{type:String},
	createAt:{type:Date,default:Date.now},
	
})

mongoose.model('User',UserSchema);
