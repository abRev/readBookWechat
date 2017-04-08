var express = require('express');
var router = express.Router();

module.exports = function(app){
	app.use('/wechat/book',router);
}

router.get('/',function(req,res,next){
	res.render("book/book",{title:"My books"});
})
