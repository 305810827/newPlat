const request = require('request');
const cheerio = require('cheerio');
const newsModel = require('../model');

module.exports = function () {

  request('http://finance.chinanews.com/cj/gd.shtml', (err1, res1, bod1) => {
    let $1 = cheerio.load(bod1, {
      decodeEntities: false
    });
    let a = $1('.dd_bt>a');
    for (let i = 0; i < a.length; i++) {
      let ahref = "http://finance.chinanews.com" + a[i].attribs.href;
      // console.log(ahref);
      request(ahref, (err2, res2, bod2) => {
        let $2 = cheerio.load(bod2, {
          decodeEntities: false
        });
        let title = $2('h1').eq(0).text();
        let zw = $2('.left_zw').text();
        let time = $2('.left-t').text();
        let timer = time.slice(0, 17);
        // console.log("标题：", title);
        // console.log("正文：", zw);
        let times = timer.replace('年', '-').replace('月', '-').replace('日', '');
        // 生成一个可操作的数据库对象
        var news = new newsModel({
          title: title, // 标题
          content: zw, // 内容
          postTime: new Date(times).getTime(), // 时间
          source: "中国新闻网", // 来源
          className: "财经", // 类别
          url: ahref, // 链接
        });
        news.save((err) => {
          if (err) {
            console.log(err);
          }
        })
      })
    }
  })
}