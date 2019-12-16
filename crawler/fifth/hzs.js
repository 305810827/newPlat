const request = require('request');
const cheerio = require('cheerio');
const newInfoModel = require('../model.js');
const rp = require('request-promise');
module.exports = function() {
	var opt = {
		url: 'https://mil.ifeng.com/',
		methods: 'get',
		headers: {
			'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3964.0 Safari/537.36'
		}
	}
	request(opt, function(err, response, body) {
		var $ = cheerio.load(body, {
			decodeEntities: false
		})
		var list = $('.tabsNews-2l7ikzE3').find('.news-stream-basic-news-list li');
		var arr = [];
		for (var i = 0; i < list.length; i++) {
			var lia = list.eq(i).find('a').attr('href');
			arr.push(`http:${lia}`);
		}
		var times = '';
		for (var j = 0; j < arr.length; j++) {
			let arr2 = arr[j];
			rp(arr[j]).then(bodys => {
				if (body1) {
				var $$ = cheerio.load(bodys, {
					decodeEntities: false
				})
				times = $$('.time-hm3v7ddj').find('span').eq(0).text().replace('月', '-')
				times = times.replace('年', '-')
				times = times.replace('日', '')
				var newInfo = new newInfoModel({
					title: $$('.topic-3bY8Hw-9').text(),
					postTime: new Date(times).getTime(),
					content: $$('.text-3zQ3cZD4').html(),
					img: $$('.text-3zQ3cZD4').find('img').eq(0).attr('src'),
					className: '军事',
					source: '凤凰网',
					url: arr2
				})
				newInfo.save(function(err) {
				})
				}else{
					
				}
			}).catch({
				
			})
			
		}
	})
}
