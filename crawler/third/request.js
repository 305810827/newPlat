	var request = require('request')
	var cheerio = require('cheerio')
	var mongoose = require('../model')
	var Iconv = require('iconv-lite');

	var opt = {
		url: 'http://tech.163.com/special/techscience/',
		methods: 'get',
		headers: {
			'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36'
		}
	}
	module.exports = function() {
		request(opt, function(error, response, body) {

			var $$ = cheerio.load(body, {
				decodeEntities: false
			})

			var list = $$('.titleBar .bigsize');

			for (var i = 0; i < list.length; i++) {
				var optt = {
					url: '' + list[i].children[0].attribs.href + '',
					methods: 'get',
					encoding: null,
					headers: {
						'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36'
					}
				}
				console.log(optt.url)
				request(optt, function(error, response, body) {
					$ = cheerio.load(Iconv.decode(body, "gbk"), {
						decodeEntities: false
					})
					var len = $('#epContentLeft .post_time_source').text().split(' ')[16]
					var lens = $('#epContentLeft .post_time_source').text().split(' ')[17];
					var t = new Date(len + ' ' + lens.substring(0, lens.length - 5));
					var nv = new mongoose({
						title: $('#epContentLeft h1').text(),
						postTime: t.getTime(),
						content: $('#endText').text(),
						source: $('#epContentLeft .post_time_source').text().split(' ')[18],
						className: '科技',
						url: optt.url
					})
					nv.save(function(err){						
					});
				})
			}
		})
	}
