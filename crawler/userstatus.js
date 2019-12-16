const db = require('./db.js');
//  用户登录状态表  status
let statusSchema = db.Schema({
    user: String, //账号
    token: String, //token值
    userstatus: Number // 登录状态 0-未登录  1-登录
  }, { collection: 'status' })
  
  module.exports = db.model('status', statusSchema);