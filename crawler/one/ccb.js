var mongoose = require('../model.js')
var request = require('request');
var cheerio = require('cheerio');
module.exports = function(){

var ql = {
	url: 'http://news.baidu.com/finance',
	methods: 'get',
	headers: {
		'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36'
	}
}
var a = []
request(ql, function(err, response, body) {
	var $ = cheerio.load(body, {
		decodeEntities: false
	})
	var link = $('.middle-focus-news ul').find('li a')
	for(let i = 0; i < link.length; i++) {
		a.push($(link).eq(i).attr('href'))
		var opt2 = {
			url: a[i],
			methods: 'get',
			headers: {
				'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36'
			}
		}
		request(opt2, function(err2, res2, body2) {
			var $2 = cheerio.load(body2, {
				decodeEntities: false
			})
//			console.log('ok')
 
			var ccb = new mongoose({
				title: $2('.article-title h2').text(), //标题
				postTime: $2('.time').html(), //时间
				content: $2('.bjh-p').text(), //内容
				className: '财经', //类别
				source: '百度', //来源
				url: a[i] //原文链接
			})
			ccb.save(function(err) {
				console.log(err)
			})
     
		})
	}
})


}