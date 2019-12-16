//财经
var one1 = require('./one/ccb.js')
var one2 = require('./one/newcj.js')
var one3 = require('./one/ws.js')
var one4 = require('./one/wzl.js')
var one5 = require('./one/zzj.js')
 
//旅游
var two1 = require('./two/liuqi.js')
var two2 = require('./two/ljm.js')
var two3 = require('./two/zgz.js')
var two4 = require('./two/smf.js')
var two5 = require('./two/zzy.js')
 
//科技
var third1 = require('./third/lbw.js')
var third2 = require('./third/request.js')
var third3 = require('./third/ljs.js')
var third4 = require('./third/lc.js')
 
//体育
var fourth1 = require('./fourth/czz.js')
var fourth2 = require('./fourth/ljx.js')
var fourth3 = require('./fourth/on.js')
var fourth4 = require('./fourth/xyj.js')
 
//军事
var fifth1 = require('./fifth/hzs.js')
var fifth2 = require('./fifth/jxd.js')
var fifth3 = require('./fifth/lhr.js')
var fifth4 = require('./fifth/xxj.js')
 
 
module.exports = function(){
    // one1();
    // one2();
    // one3();
    // one4();
    one5();
 
    two1();
    // two2();
    // two3();
    // two4();
    // two5();
 
    third1();
    // third2();
    // third3();
    // third4();
 
    // fourth1();
    // fourth2();
    // fourth3();
    fourth4();
 
    fifth1();
    // fifth2();
    // fifth3();
    // fifth4();
}