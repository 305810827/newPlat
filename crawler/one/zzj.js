var request = require('request');
var rp = require('request-promise');
var cheerio = require('cheerio');
var model = require('../model.js');
module.exports = function() {
	request('https://finance.sina.com.cn/', function(error, response, body) {

		var $ = cheerio.load(body, {
			decodeEntities: false
		})
		var lia = $(".m-p1-m-blk2 li a")
		var arr = [];
		for (var i = 0; i < lia.length; i++) {
			var a = lia.eq(i).attr('href');
			if (a.indexOf("https://finance.sina.com.cn/") == 0) {
				arr.push(a);
			}
		}


		for (var j = 0; j <arr.length; j++) {
			let opt = {
				url: arr[j],
				headers: {
					'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36'
				}
			}
			
			rp(opt).then(function(body3){
				var $2 = cheerio.load(body3, {
					decodeEntities: false
				})
				var title = $2('.main-title').text()
				console.log(title)
				var content = $2('#artibody').html()
				
				var img = $2('#artibody').find('img').eq(0).attr('src');
				
				var times = $2('.date').text().replace("年", '-').replace("月", '-').replace("日", '').replace(':', ':') + ':00'
				var time = new Date(times).getTime()
				
				var source = '新浪';
				
				var type = '财经';
				
				var catenate = a;
				var news = new model({
					title: title,
					content: content,
					postTime: time,
					source: source,
					img: img,
					className: type,
				})
				
				news.save(function(err) {
					if (err) {
						console.log(err)
					} else {
						console.log('保存成功')
					}
				})
			}).catch(err=>{
				
			})
			
		}	
	})

}
