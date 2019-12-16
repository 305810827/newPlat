const db = require('./db');
let newInfoSchema = db.Schema({
	//设置title为唯一值，相同的无法插入数据库
	title: {type:String,unique:true,dropDups: true},
	postTime: String,
	content: String,
	className: String,
	source: String,
	url: String,
	img: String,
},{collection:'newInfo'})

module.exports = db.model('newInfo',newInfoSchema);