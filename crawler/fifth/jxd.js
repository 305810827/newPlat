var request = require('request');
var cheerio = require('cheerio');
var newsModel = require('../model');

module.exports = function(){
        var opt = {
            url:'https://www.chinanews.com/mil/news.shtml',
            methods:'get',
            headers:{
                'User-Agent':'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36'
            }
        }
        request(opt,function(error,response,body){
        var $ = cheerio.load(body,{
            decodeEntities:true
        })
        var arr = [];
       var dt = $('.content_list').find('li').find('.dd_bt a');
       for(var i=0;i<dt.length;i++){
        var sb = dt.eq(i).attr('href');
        arr.push(`https://www.chinanews.com/${sb}`);
       }
       for(var j=0;j<arr.length;j++){
            request(arr[j],function(error2,response2,body2){
        var $1 = cheerio.load(body2,{
            decodeEntities:true
        })
        var sb2 = $1('#cont_1_1_2').find('h1').text();
        var content = $1('.left_zw').text();
        var source = $1('.left-t').text().slice(17)
        var time = $1('.left-t').text().slice(0,17)
        var times = new Date().getTime(time)
        console.log(source)
        var news = new newsModel({
            title:sb2,
            postTime:times,
            content:content,
            className:'军事',
            source:source,
            url:'https://www.chinanews.com/mil/news.shtml',
           
        })
        news.save(function(err){

        console.log(err)    
        })
    })
       }
        })
}

