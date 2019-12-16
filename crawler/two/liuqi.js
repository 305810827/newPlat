var request = require('request');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var dbmodel= require('../model.js')

module.exports=function(){

var opt = {
    url: 'http://www.cntour.cn/',
    methods: 'get',
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36'
    },
    encoding: null //让body 直接是buffer
}
request(opt, function (err, response, body) {
    let html = iconv.decode(body, "gb2312")
    var $ = cheerio.load(html, {
        decodeEntities: false
    })
    //-----------------------
    let orglink = []  //原文链接
    let liarr = []
    let ul = $('.news')
    //遍历所有信息父节点
    for (let i = 0; i < ul.length; i++) {
        let newli = ul.eq(i).children('li')
        //再次遍历ul下所有的li
        for (let j = 0; j < newli.length; j++) {
            liarr.push(newli.eq(j).children('a').attr('href'))
        }
    }
    //过滤值为 null 的链接
    for (let k = 0; k < liarr.length; k++) {
        if (liarr[k] != null) {
            orglink.push(liarr[k])
        }
    }
    //2次分析 
    for (let h = 0; h < orglink.length; h++) {
        var opt2 = {
            url: orglink[h],
            methods: 'get',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36'
            },
            encoding: null
        }
        request(opt2, function (err2, response2, body2) {
            var $2 = cheerio.load(body2, {
                decodeEntities: false
            })
            var newShow=$2('.newShow')
            let timees=newShow.children().eq(0).children('p').children().eq(2).text()
			let src = $2('.reset').find('img').eq(0).attr('src')
			
			if(src!=undefined && src.match('file')){
				src = 'http://www.cntour.cn'+src
			}
			
			
            var mewsshuju=new dbmodel({
                title:newShow.children().eq(0).children('h2').text(),//标题
                content:$2('.reset').html(),//文本类容
                img:src,
                postTime:new Date(timees).getTime(),//时间
                source:newShow.children().eq(0).children('p').children().eq(0).text(),//来源
                className:'旅游',//类别
                url:orglink[h] //原文链接
            })
            mewsshuju.save()
        })
    }
})

//  --
}