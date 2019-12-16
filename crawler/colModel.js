const db = require('./db.js');
let colsSchema = db.Schema({
	//设置title为唯一值，相同的无法插入数据库
	username: String,
	//关联newInfo集合
	newId: {type:db.Schema.Types.ObjectId,ref: 'newInfo'},
	isCollect: Boolean
},{collection:'cols'})

module.exports = db.model('cols',colsSchema);