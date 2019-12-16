var request = require('request');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var LJMModel = require('../model');
module.exports = function () {
	var opt = {
		url: 'https://new.qq.com/ch/visit/',
		methods: 'get',
		headers: {
			'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36'
		},
		encoding: null
	}
	request(opt, function (err, response, body) {
		var $ = cheerio.load(body, { decodeEntities: false })
		var list = $('.list').eq(0)
		var lia = list.find('li h3 a');

		for (var i = 0; i < lia.length; i++) {
			var a = lia.eq(i).attr('href')
			var opt2 = {
				url: a,
				methods: 'get',
				headers: {
					'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36'
				},
				encoding: null
			}
			request(opt2, function (err2, response2, body2) {
				let html = iconv.decode(body2, 'gb2312')
				var $2 = cheerio.load(html, { decodeEntities: false })
				var LJM = new LJMModel({
					title: $2('h1').text(),
					content: $2('.content-article p').text(),
					source: '腾讯',
					className: '旅游',
					url: a,
				})

				LJM.save(function (err) {
				})
			})
		}
	})

}