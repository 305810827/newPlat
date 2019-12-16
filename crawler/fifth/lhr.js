const request = require('request');
const cheerio = require('cheerio');
const newInfoModel = require('../model.js');
const rp = require('request-promise');
module.exports = function() {
	var opt = {
		url: 'http://news.baidu.com/mil',
		methods: 'get',
		headers: {
			'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3964.0 Safari/537.36'
		}
	}
	request(opt, function(error, response, body) {

		var $ = cheerio.load(body, {
			decodeEntities: false
		})

		var list = $('.ulist');
		var lia = list.find('li a');

		for (var i = 0; i < lia.length; i++) {

			var a = lia.eq(i).attr('href')

			rp(a).then(body1 => {

				var $1 = cheerio.load(body1, {
					decodeEntities: false
				});

				//标题
				var articletitle = $1('.article-title').find('h2').text();

				//内容
				var articlecontent = $1('.article-content').html();

				//图片
				var img = $1('.article-content').find('img').eq(0).attr('src');

				var myDate = new Date();

				//获取当前年
				var year = myDate.getFullYear();

				//获取到的第一个span标签里的内容
				var strArray1 = $1('.article-source').eq(0).find('span').eq(0).text().split('：');

				//获取到的小时和分钟
				var date = $1('.article-source').eq(0).find('span').eq(1).text();

				//拼接字符串得到年月日
				var yyr = year + '-' + strArray1[1];

				//拼接字符串得到年月日 时分
				var yyrsf = yyr + ' ' + date;

				//转换将格式2019-11-15 17:44转换成2019/11/15 17:44
				yyrsf = yyrsf.replace(/-/g, '/');

				//转换成时间戳
				var time = new Date(yyrsf);

				//得到时间戳
				time = time.getTime();

				//设置存入军事新闻信息数据
				var newInfo = new newInfoModel({
					title: articletitle,
					postTime: time,
					content: articlecontent,
					className: '军事',
					source: '百度新闻',
					img: img,
					url: a
				})
				//保存新闻信息数据
				newInfo.save(function(err) {})
			}).catch(err => {})
		}
	})
}
