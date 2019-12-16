let request = require('request');
let cheerio = require('cheerio');
let ljsModel = require('../model');

let opt = {
		url: 'http://tech.ifeng.com/',
		methods: 'get',
		headers: {
			'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36'
		}
	}
	
module.exports = function() {
	
	request(opt, function(error, response, body) {
		let $ = cheerio.load(body, {
			decodeEntities: false
		})
		
		let div = $('.news-stream-newsStream-mr13').find('a'); //.attr('href');
		
		let hrefArr = [];
		// console.log(div,'div');
		for (let i = 0; i < div.length; i++) {
			// 	//所有链接存进数组

			hrefArr.push('http:' + div.eq(i).attr('href'));
			let a = hrefArr[i]
			// console.log(a);
			let opt2 = {
				url: a,
				methods: 'get',
				headers: {
					'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36'
				}
			}
			request(opt2, function(err2, res2, body2) {
				let $2 = cheerio.load(body2, {
					decodeEntities: false
				}) //处理时间转换为时间戳
				let time = $2('.time-hm3v7ddj span').text().slice(0, 17);
				let times = time.replace('年', '-').replace('月', '-').replace('日', '');

				let tit = $2('h1').text();
				let txt = $2('.text-3zQ3cZD4 p').text();
				let timer = new Date(times).getTime();
			
				// 	//处理时间转换为时间戳

				let ljs = new ljsModel({
					title: tit, //标题
					content: txt, //内容
					postTime: timer, //时间戳
					source: '凤凰网', //来源
					className: '科技', //类别
					url: a //原文链接
				})
				ljs.save(function(err) {
					// console.log(err)
				})
			})
		}
		// console.log(hrefArr);

	})

}
