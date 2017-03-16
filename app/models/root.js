var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RootSchema = new Schema({
	appID:{type:String},
	appSecret:{type:String},
	token:{type:String},
	accessToken:{type:String},
	accessTokenTime:{type:Number},
	accessTicket:{type:String},
	accessTicketTime:{type:String}
})

mongoose.model('RootUser',RootSchema);
