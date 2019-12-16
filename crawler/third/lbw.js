var request = require('request');
var cheerio = require('cheerio');
var rq = require('request-promise');
var newsModel = require('../model.js')
var opt = {
    url: 'http://tech.chinadaily.com.cn/5b7621d3a310030f813cf45b', //所爬网站地址
    methods: 'get',
    headers: { //头部信息
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36'
    },
    encoding: null
}
 
 
module.exports = function() {
    let list=[]
    request(opt, function(error, response, body) {
        var $ = cheerio.load(body, {decodeEntities: false})
        //href 原文连接
        let list = $('.left-liebiao .busBox3 h3 a')
        for (var h = 0; h < list.length; h++) {
            var opt2 = {
                url: 'http:'+list.eq(h).attr('href'),
                // methods: 'get',
                headers: { //头部信息
                    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36'
                },
            }
            
            rq(opt2).then(body1=>{
				if(body1){
					// console.log(body1);
					    var $1 = cheerio.load(body1, {
					        decodeEntities: false
					    })
					 
					    var dis = $1('.dabiaoti').text()
					    // console.log(dis)
					    var tis = $1('.left-liebiao').children('.busBox3').children('div').eq(1).children('p').text()
					    var contion = $1('.article').html()
					    var img = $1('.article').find('img').eq(0).attr('src');
						
						if(img!=undefined && img.match('http')){
							img = '/image/demo1.png'
						}
					    // var ly = $1('.fenx').children('.xinf-le').children('a').text()
					    var time = $1('.fenx').children('div').eq(1).text()
					    var times=new Date(time.substring(0,time.length-1)).getTime();
					 
					// console.log(contion)
					    var mewsshuju = new newsModel({
					        title: dis,//标题
					        postTime:times,//时间
					        content:contion,//内容
					        img:img,//图片
					        url:opt2.url,//原文链接
					        className:'科技',//类别
					        source:'中国日报网'//来源
					    })
					    mewsshuju.save(function(err){
					        
					    })
				}else{
					
				}
                    
            }).catch(err=>{
                
                console.log(err)
                
            })
        }
 
})
    
 
}