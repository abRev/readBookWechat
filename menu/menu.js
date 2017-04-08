var request = require('request');
var schedule = require('node-schedule');
const menuItems = {
	"button":[
		{
			"type":"click",
			"name":"我的小说",
			"key":"mybook"
		},
		{
			"type":"view",
			"name":"最新章节",
			"url":"http://www.abrev.cn/wechat/book"
		}
	]
}
function doMenu(token){

		request.get("https://api.weixin.qq.com/cgi-bin/menu/delete?access_token="+token,function(errGet,res,body){
			if(errGet){
				console.log(e);
			}
			console.log("订单删除成功",body);
			
			request.post({url:"https://api.weixin.qq.com/cgi-bin/menu/create?access_token="+token,json:menuItems},function(errPost,_res,_body){
				if(errPost){
						cosole.log('菜单创建失败');
				}else{
					console.log('菜单创建成功',_body);
				}	
			})
		})
}

module.exports = doMenu;
/*
schedule.scheduleJob({second:0},function(){
	console.log('执行菜单脚本');
	doMenu();
})*/
