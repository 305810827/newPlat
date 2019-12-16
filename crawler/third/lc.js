var dbmo = require('../model')
var request = require('request');
var cheerio = require('cheerio');
var rq = require('request-promise')


module.exports = function () {
	request('https://news.baidu.com/tech', function (error, response, body) {

		var $ = cheerio.load(body, { decodeEntities: false })

		var list = $('.middle-focus-news').eq(0)
		var lia = list.find('ul li a')

		for (var i = 0; i < lia.length; i++) {

			var a = lia.eq(i).attr('href')
			rq(a).then(bodys => {
				var $2 = cheerio.load(bodys, { decodeEntities: false })
				var time1 = $2('.article-source .date').text()
				var time2 = $2('.time').text()
				var time1s = time1.replace('发布时间：', '2019-')
				var times = time1s + ' ' + time2
				var postTime = new Date(times).getTime()
				var lc = new dbmo({
					title: $2('.article-title h2').text(),
					content: $2('.article-content').html(),
					img: $2('.article-content').find('img').eq(0).attr('src').replace(/http/,'https'),
					postTime: postTime,
					source: '百度',
					className: '科技',
					url: a,
				})

				lc.save(function (err) {

				})
			}).catch(err => {

			})
		}

	})
}



