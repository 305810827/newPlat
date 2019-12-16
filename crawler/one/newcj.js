var request = require('request');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var newsmodules = require('../model.js');
module.exports = function() {

var opt = {
    url: 'https://money.163.com/',
    methods: 'get',
    encoding: null,
    headers: {
        'User-Agent': "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36"
    }
}

request(opt, function (error, response, body) {
    var html = iconv.decode(body, 'gb2312')
    var $ = cheerio.load(html, {
        decodeEntities: false
    });
    var boxsul = $('.tab_body').eq(0)
    var ula = boxsul.find('.topnews_nlist1 li h2 a');
    for (var i = 0; i < ula.length; i++) {
        var ahref = ula.eq(i).attr('href');
        var atext = ula.eq(i).html();
        var opt2 = {
            url: ahref,
            methods: 'get',
            encoding: null,
            headers: {
                'User-Agent': "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36"
            }
        }
        request(opt2, function (error, res, body2) {
            var html2 = iconv.decode(body2, 'gb2312')
            var $2 = cheerio.load(html2, {
                decodeEntities: false
            })
            var Timestamp =[];
            var titles = $2('#epContentLeft h1').text();
            var contexts = $2('#endText').text();
            var time = $2('.post_time_source').text();
            time = time.replace(/[年月]/g,'-')
            time = time.replace(/日/g,'')
            time = time.slice(17,36)
            Timestamp.push(new Date(time).getTime())
            var sources = $2('#ne_article_source').text();
            var news = new newsmodules({
               title:titles,
               postTime:Timestamp[0],
               content:contexts,
               className:'财经',
                source:sources,
                url:ahref
            });
            news.save(function(err){
                console.log(err)
            });
        })
    };
    var lia = boxsul.find('.topnews_nlist2 li h3 a');
    // console.log(lia.length)
    for(var i=0;i<lia.length;i++){
        var ahrefs = lia.eq(i).attr('href');
        var atext = ula.eq(i).html();
        var opt3 = {
            url: ahrefs,
            methods: 'get',
            encoding: null,
            headers: {
                'User-Agent': "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36"
            }
        };
        request(opt3,function(error,res3,body3){
            var html3 = iconv.decode(body3, 'gb2312')
            var $3 = cheerio.load(html3, {
                decodeEntities: false
            });
            var Timestamp3 =[];
            var titles3 = $3('#epContentLeft h1').text();
            var contexts3 = $3('#endText').text();
            var time3 = $3('.post_time_source').text();
            time3 = time3.replace(/[年月]/g,'-')
            time3 = time3.replace(/日/g,'')
            time3 = time3.slice(17,36)
            Timestamp3.push(new Date(time3).getTime())
            var sources3 = $3('#ne_article_source').text();
            // console.log(titles3);
             var news3 = new newsmodules({
                title:titles3,
               postTime:Timestamp3[0],
               content:contexts3,
               className:'财经',
                source:sources3,
                url:ahrefs
            });
            news3.save(function(err){
        
                console.log(err)
            });
            
        });
    }
})
}


