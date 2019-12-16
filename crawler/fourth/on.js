
var request = require('request');
var cheerio = require('cheerio');
var rq = require('request-promise');
var llfModel = require('../model');

module.exports = function(){

  
//xs

//erthj

// mongoose.connect('mongodb://127.0.0.1:27017/news');
// var db = mongoose.connection
// db.on('error',function(){
// 	console.log("数据库连接出错")
// })
// var stuSchema = mongoose.Schema({
// 	biaoti:String,
// 	neirong:String,
// 	shijian:Number,
// 	lianjie:String,
// 	laiyuan:String,
// 	class:String,
// 	photo:String
// },{collection:'llf'})
// var llfModel = mongoose.model('llf',newsSchema);


// app.get('/test',function(req,res){
	var opt = {
		url:'http://sports.sohu.com/?spm=smpc.home.top-nav.7.1573867174794kprWpGp',
		methods:'get',
		headers:{
			'User-Agent':'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36'
		}
	}
	request(opt,function(error,response,body){
		var $ =  cheerio.load(body,{decodeEntities: false})
		var list = $('.z-c-block').eq(0);
		var lia = list.find('ul li a');
			for(var i=0; i<lia.length; i++){
				var a = 'http:'+lia.eq(i).attr('href')
				var opt2 = {
					url:a,
					methods:'get',
					headers:{
						'User-Agent':'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36'
					}
				}
				rq(opt2).then(body2=>{
					var $2 = cheerio.load(body2,{decodeEntities: false})
					// console.log(a);                                     //原文链接
					// console.log($2('.ql-align-center img').attr('src'));//照片
					// console.log($2('#mp-editor p').text());            //内容
					// console.log($2('#news-time').attr('data-val'));     //时间戳
						var llf = new llfModel({
							title:$2('.text-title h1').text(),
							content:$2('#mp-editor p').text(),
							postTime:$2('#news-time').attr('data-val'),
							url:a,
							source:'搜狐',
							className:'体育',
			
						})

						llf.save(function(err){
							console.log(err)
						})
				}).catch(err=>{
					console.log('body2为空');
				})
			}
		// res.send(body)
	})
// })
// app.listen(8008)
//wdf
}