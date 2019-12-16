var request = require('request');
var Iconv = require('iconv-lite')
var cheerio = require('cheerio')
var newsinfo = require('../model.js')
const rp = require('request-promise');
module.exports = function(){
  
/**********获取数据*************/
 
var articleUrls = [];  //获取链接
var articleTtile = [];  //获取标题
var Timestamp =[];
var articleContext =[]; //获取文章内容
 
var baseUrl = 'http://www.zgjrjw.com/news/finance/';
//  数据解析财经,内容,时间,来源,类别,原文链接
 
const options = {
  url:baseUrl,
  method:'get',
  encoding:null,
}
request(options,function(err,response,body){
  if(err) throw err;
 //解码gb2312
  var bodyg = Iconv.decode(body,'gb2312').toString()
  var $ = cheerio.load(bodyg,{decodeEntities:false});
  for(let i=0; i<$('.rtleft .renr tr,.rtright .renr tr').length; i++){
    articleUrls.push( $('.rtleft .renr tr a,.rtright .renr tr a').eq(i).attr('href') )
    articleTtile.push($('.rtleft .renr tr a,.rtright .renr tr a').eq(i).html())
  }
  for(let i=0; i<articleUrls.length; i++){
    var options={
      url:articleUrls[i],
      method:'get',
      encoding:null,
    }
    rp(options).then(body=>{
		if(body){
			var bodyg = Iconv.decode(body, 'gb2312').toString()
			var $ = cheerio.load(bodyg,{decodeEntities:false});
			//处理时间
			var time = $('td[align="center"].guanggao').text()
			time = time.replace(/[年月]/g,'-')
			time = time.replace(/日/g,'')
			time = time.slice(0,20)
			Timestamp = new Date(time).getTime()
			//处理内容
			articleContext = $('td[align="left"].zhengwen').html()
			img = $('td[align="left"].zhengwen').find('img').eq(0).attr('src');
			var news = new newsinfo({
			  url:articleUrls[i],
			  title:articleTtile[i],
			  postTime:Timestamp,
			  content:articleContext,
			  img:img,
			  source: '金融界网',
			  className:'财经'
			})
			news.save(function(err){
			  if(err){
			      console.log(err);
			  }
			})
		}else{
			
		}
     
      
    }).catch(err=>{
		
	})
  }
})
 
}