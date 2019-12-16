const db = require('./db.js');
//  用户表  user
let userSchema = db.Schema({
    user: String, //账号
    password: String, //密码
    img:String,//用户头像文件名称
    time: Number //注册时间戳
}, { collection: 'user' })

module.exports = db.model('user', userSchema);