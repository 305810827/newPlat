
var request = require('request');
var cheerio = require('cheerio');
const ljxModel = require('../model');


module.exports = function(){


// var exp = require('express');

// var app = exp();
// 
//连接与使用mongoDB
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/news');
// var db = mongoose.connection
// db.on('error',function(){
// 	console.log("数据库连接出错")
// })
// var newsSchema = mongoose.Schema({
// 	title:String,
// 	text:String,
// 	time:String,
// 	source:String,
// 	classes:String,
// 	href:String
// },{collection:'ljx'})

// var ljxModel = mongoose.model('ljx',newsSchema);
//连接与使用mongoDB


// app.get('/test',function(req,res){

		var opt = {
		// url:'http://www.sohu.com/a/353959981_123753?spm=smpc.home.top-news2.3.15738097110208pjqCGD&_f=index_news_2',
		url:'http://www.chinanews.com/ty/gun-news.html',
		methods:'get',
		headers:{
			'User-Agent':'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36'
		}
	}


	request(opt,function(error,response,body){
		var $ =  cheerio.load(body,{
    		decodeEntities: false
    	})
		var aa = $('.dd_bt>a');
		var hrefArr = [];
			
		for(var i = 0 ; i<aa.length;i++){
			//所有链接存进数组
			hrefArr.push('http://www.chinanews.com'+aa[i].attribs.href);


			var a = hrefArr[i]
			var opt2 = {
				url:a,
				methods:'get',
				headers:{
					'User-Agent':'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36'
				}
			}

			request(opt2,function(err2,res2,body2){
				var $2 = cheerio.load(body2,{decodeEntities: false})

				//处理时间转换为时间戳
				var time = $2('.left-t').text().slice(0,17);
					time = time.replace('年','-');
					time = time.replace('月','-');
					time = time.replace('日','');
				//处理时间转换为时间戳
				
				var ljx = new ljxModel({
					title:$2('h1').eq(0).text(),//标题
					postTime:new Date(time).getTime(),//时间戳
					content:$2('.left_zw>p').text(),//内容
					className:'体育',//类别
					source:'中国新闻网',//来源
					url:a//原文链接
				})

				ljx.save(function(err){
					console.log(err)
				})
			})
		}
		// res.send(body)
	})
// })


}

// app.listen(88)

