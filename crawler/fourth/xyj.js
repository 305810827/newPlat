const request = require('request');
const cheerio = require('cheerio');
const rp = require('request-promise');
const newInfoModel = require('../model.js');
module.exports = function(){
	//模仿浏览器对象去访问url
	let opt = {
		url: 'http://sports.sina.com.cn/',
		methods: 'get',
		headers: {
			'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36'
		}
	}
	//使用request爬取网页数据
	request(opt, function(error, response, body) {
		let $ = cheerio.load(body, {
			decodeEntities: false
		});
		let aDom1 = $('.ty-card-tt a');
		let aDom2 = $('.ty-card-type10-makeup a');
		let aArray1 = [];
		let aArray2 = [];
		let postTime = '';
		//爬取到的url存到数组
		for (let i = 0; i < aDom1.length; i++) {
			aArray1[i] = aDom1.eq(i).attr('href');
		}
		for (let i = 0; i < aDom2.length; i++) {
			aArray2[i] = aDom2.eq(i).attr('href');
		}
		//将爬取的url数据拼接起来
		let aArray3 = aArray1.concat(aArray2)
		//使用正则过滤掉不需要的url
		let aArray4 = aArray3.filter(item => /\/\/sports.sina.com.cn[\S]+[0-9]+-[0-9]+-[0-9]+[\S]+shtml/.test(item))
		//循环爬取数组中的url
		for (let i = 0; i < aArray4.length; i++) {
			//模仿浏览器对象去访问url
			let opt1 = {
				url: 'http:' + aArray4[i],
				methods: 'get',
				headers: {
					'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36'
				}
			}
			//rq 是依赖包request-promise的对象，解决循环使用request异步方法，返回数据为null的问题
			rp(opt1).then(body1 => {
				if (body1) {
					let $1 = cheerio.load(body1, {
						decodeEntities: false
					});
					//将爬取的时间转换为时间戳
					postTime = $1('.date').text().replace('月', '-')
					postTime = postTime.replace('年', '-')
					postTime = postTime.replace('日', '')
	
					//创建一个保存存储信息的model对象
					let newInfo = new newInfoModel({
						title: $1('.main-title').text(),
						postTime: new Date(postTime).getTime(),
						content: $1('#artibody').html(),
						className: '体育',
						source: '新浪新闻',
						img: $1('#artibody').find('img').eq(0).attr('src'),
						url: 'http:'+aArray4[i],
					})
					//使用model的save保存数据到数据库
					newInfo.save(function(err) {
						// if(err) throw err;
					})
				} else {
					console.log('cheerio没有参数')
				}
			}).catch(err => {
				
			})
		}
	
	})
}
