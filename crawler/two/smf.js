var request = require('request')
var cheerio = require('cheerio')
var dbmodel = require('../model.js')

module.exports = function() {
	var open = {
		url: 'http://jingji.cctv.com/2019/11/18/ARTIeGSYeQL5yhEMf4GP63X1191118.shtml?spm=C87458.PxZ1sQfyXDLK.S00982.4',
		methods: 'get',
		headers: {
			'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36'
		}
	}
	request(open, function(error, response, body) {
		$ = cheerio.load(body, {
			decodeEntities: false
		})
		// 定义一个数组用来存放url 地址
		var array1 = []
		//获取url地址存放到array1 数组 
		var arr = $(".mtab_con .chblock .cbox3 .right .title_list_05 li a").html();
		for (var i = 0; i < 8; i++) {
			array1[i] = $(".mtab_con .chblock .cbox3 .right .title_list_05 li a").eq(i).attr("href")
		}
		// 循环遍历每一个url地址
		for (var i = 0; i < array1.length; i++) {
			var open_2 = {
				url: array1[i],
				methods: 'get',
				headers: {
					'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36'
				}
			}
			request(open_2, function(error, response, body) {
				$ = cheerio.load(body, {
					decodeEntities: false
				})
			   var arr1=[]
				var cont = $('#content_area p').length;
				 for (var j = 0; j < cont; j++) {
					arr1=$('#content_area p').eq(j).html()
				}
				// 将年月日转化成毫秒数
				var date = new Date();
				var thisDate = date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate() + "  " + date.getHours() +
					":" + date.getMinutes();
				var thisTimes = new Date(thisDate).getTime() //将时间转换成毫秒数
				var studb = new dbmodel({
					title: $("#title_area h1").html(),
					content: arr1,
					postTime: thisTimes,
					source: $("#title_area .info").html(), //来源
					className: '新闻',
					url: open_2.url
				})
				studb.save(function(err) {
                      // console.log(err)
				})
                
			})

		}

	})

};
