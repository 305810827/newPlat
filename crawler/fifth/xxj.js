var request = require('request');
var cheerio = require('cheerio');
var xxjModel = require('../model');
module.exports = function(){

	request('http://mil.gmw.cn/node_8981.htm',function(error,response,body){
		var $ =  cheerio.load(body,{decodeEntities: true})
		var ia = $('.channel-newsGroup').find('li a');
		var arr =[];
		for (var i = 0; i < ia.length; i++) {
			var sb = ia.eq(i).attr('href');
			if(/http/.test(sb)){
				arr.push(sb);
			}else{
				arr.push(`http://mil.gmw.cn/${sb}`);
			}
			
			
		}

		for (var j = 0; j < arr.length; j++) {
		 	request(arr[j],function(error2,res2,body2){
				var $1 =  cheerio.load(body2,{decodeEntities: true})
				var title = $1('.m-title-box').find('h1').text();
				var source = $1('.m-con-source').find('span a').text();
				var time = $1('.m-con-time').text();
				var times = new Date().getTime(time);
				var content = $1('.u-mainText').text();

				var xxj = new xxjModel({
					title:title,
					content:content,
					source:source,
					postTime:times,
				    url:arr[j],
				    className:'军事'
				})

					xxj.save(function(err){
					if(err){console.log(err)

					}	else{
						console.log("成功")
					}
					})
			})

		}

})

}
