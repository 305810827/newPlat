var request = require('request'); 
var cheerio = require('cheerio'); 
var newsModel = require('../model.js'); 

	module.exports = function() {
			var opt = { 
				url: 'https://world.huanqiu.com/article/9CaKrnKnO36',
				methods: 'get', 
				headers: { 
					'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36' 
				}
			}
			request(opt, function(err, response, body) { 
				var $ = cheerio.load(body, {
					decodeEntities: false
				})
				var div = $('.r-hqNews').eq(0); 
				var li = div.find('li'); 
				var arr = []; 
				for (var i = 0; i < li.length; i++) { 
					var lia = li.eq(i).find('a').attr('href'); 
					arr.push(`https:${lia}`); 
				}
				for (var j = 0; j < arr.length; j++) { 
					request(arr[j], function(error, res, bodys) { 
						var $2 = cheerio.load(bodys, {
							decodeEntities: false
						})
						var title = $2('.t-container').find('h3').text(); /* 标题 */
						var sat = $2('.t-container').find('.metadata-info');
						var source = sat.find('.source span').text(); /* 来源 */ 
						var author = sat.find('.author span').text(); /* 作者 */ 
						var times = sat.find('.time').text(); /* 时间 */ // 
						var postTime = new Date(times).getTime(); //把刚刚获取的时间转化为时间戳
						var content = $2('.l-con').text(); /* 内容 */ 
						var className = "旅游";

						// 4. 定义实体
						var newsj = new newsModel({
							title: title,
							postTime: postTime,
							content: content,
							className: className,
							source: source,
							// url:url
						})

						//存到数据库
						newsj.save(function(err) {
						})

						//2查询数据库				
						newsModel.find(function(err, newss) { 
							
						})

					})
				}
				
			})
	}
