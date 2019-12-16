
const newInfoModel = require('../model.js')
var request = require('request');
var cheerio = require('cheerio')
var iconv = require('iconv-lite');	

module.exports = function(){
	
	var opt = {
		url: 'https://travel.ifeng.com/',
		methods: 'get',
		headers: {
			'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36'
		},
		enocoding: null
	}

	var link = []

	request(opt, function(error, response, body) {
		var $ = cheerio.load(body, {
			decodeEntities: false
		})

		var tH2 = $('.lx_word-xnR3MOis').eq(0).children('h2').children('a').attr('href');
		link.push(`https:${tH2}`);
		var oUl = $('.ul-12IGOnn9').eq(0);
		var oLi = oUl.find('li a')
		for (var i = 0; i < oLi.length; i++) {
			var a = oLi.eq(i).attr('href')
			link.push(`https:${a}`);
		}
		var oUl1 = $('.ul-12IGOnn9').eq(1);
		var oLi1 = oUl1.find('li a')
		for (var j = 0; j < oLi1.length; j++) {
			var a1 = oLi1.eq(j).attr('href')
			link.push(`https:${a1}`)
		}
		var oUl2 = $('.ul-12IGOnn9').eq(2);
		var oLi2 = oUl2.find('li a')
		for (var k = 0; k < oLi2.length; k++) {
			var a2 = oLi2.eq(k).attr('href')
			link.push(`https:${a2}`)
		}
		//极致
		var oDiv = $('.wrap-2WfFdAap').eq(0);
		var aDiv = oDiv.find('h3 a');
		for (var l = 0; l < aDiv.length; l++) {
			var a3 = aDiv.eq(l).attr('href')
			link.push(`https:${a3}`)
		}
		//嗜住
		var oDiv1 = $('.wrap-3tEWxi8m').eq(0);
		var aDiv1 = oDiv1.find('h3 a');
		for (var m = 0; m < aDiv1.length; m++) {
			var a4 = aDiv1.eq(m).attr('href')
			link.push(`https:${a4}`)
		}

		var obj = {};
		var times = '';
		for (let n = 0; n < link.length; n++) {
			let arr1 = link[n];
			
			var opt1 = {
				url: link[n],
				methods: 'get',
				headers: {
					'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36'
				}
			}
			request(opt1, function(err1, res1, body1) {
				var $1 = cheerio.load(body1, {
					decodeEntities: false
				})
				
				times = $1('.time-hm3v7ddj').find('span').eq(0).text().replace('月', '-')
				times = times.replace('年', '-')
				times = times.replace('日', '')
				var newInfo = new newInfoModel({
					title: $1('h1').text(),
					postTime: new Date(times).getTime(),
					content: $1('.main_content-LcrEruCc').text(),
					className: '旅游',
					source: '凤凰网',
					url: arr1
				})
				newInfo.save(function(err) {
				})

			})
		}
	})
}

