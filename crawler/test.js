var exp = require('express');
var bodyParser = require('body-parser');
var app = exp();


// var newcj = require('./one/newcj.js')
// newcj();

// var ws = require('./one/ws.js')
// ws();

// var liuqi = require('./two/zzy.js')
// liuqi();


var newsModel = require('./model.js');

app.use(bodyParser.urlencoded({extended:true}))


// 传值 ： type：新闻类别  ， page：第几页 默认第一页
app.post('/list',function(req,res){
	try{
		var type = req.body.type
		var page = req.body.page?req.body.page:1
		newsModel.find({className:type}).limit(20).skip((page-1)*20).exec(function(err,ns){	
			res.json({status:'success',msg:'查询成功',data:ns})
		})
	}catch(err){
		res.json({status:'fail',msg:'查询失败',data:[]})
	}
})


app.post('/search',function(req,res){

	try{
		var key = req.body.key;
		var page = req.body.page?req.body.page:1
		newsModel.find({title: new RegExp(key,'i')}).limit(20).skip((page-1)*20).exec(function(err,ns){
			res.json({status:'success',msg:'查询成功',data:ns})
		})
	}catch(err){
		res.json({status:'fail',msg:'查询失败',data:[]})
	}
})





//443
app.listen(80,function(){
	console.log('running')
})