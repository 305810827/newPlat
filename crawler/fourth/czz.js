var request = require("request");
var cheerio = require("cheerio");
var model = require("../model")
module.exports = function () {
    request("http://sports.gmw.cn/node_9638.htm", function (err, respose, body) {
        var $ = cheerio.load(body, {
            decodeEntities: false
        })

        // 链接
        var li = $('.channel-newsGroup li')
        // console.log(li.length)
        var arr = [];
        for (var i = 0; i < li.length; i++) {
            var lia = li.eq(i).find('a').attr('href');
            arr.push(`http://sports.gmw.cn/${lia}`);
            var arr2 = {};
            request(arr[i], function (error, res, bodys) {
                var $$ = cheerio.load(bodys, { decodeEntities: false })
                var title = $$('h1').text();
                // console.log(title)
                // var type = $$(".g-crumbs a").eq(2).text()
                // console.log(type)
                // var source = $$(".m-con-source").text()
                // console.log(source)
                var times = $$(".m-con-time").text()
                var time = new Date(times).getTime()
                // console.log(time)
                var content = $$(".u-mainText").text()
                // console.log(content)

                var infoModel = new model({
                    title: title,
                    source: '光明网',
                    postTime: time,
                    content: content,
                    className:'体育',
                    url: arr[i]

                })
                infoModel.save(function (err) {
                console.log(err)
                })
            })
        }
    })
}
