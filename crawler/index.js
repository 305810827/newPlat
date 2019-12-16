const express = require('express');
const bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
const model = require('./model.js');
const colModel = require('./colModel');
const usermodule = require('./user'); //user   用户表
const statusmodule = require('./userstatus'); //status 用户状态表
const multer = require('multer');//上传文件
const path = require('path');//上传文件
const app = express();

var crawler = require('./crawler.js')
// crawler();
setInterval(function(){
    crawler();
},1000*60*60*24)

//上传配置
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname,'./', 'public', 'img', 'avatar'))
    },
    filename: function (req, file, cb) {
        var suffix = file.originalname.split('.')
        cb(null, file.fieldname + '-' + Date.now() + '.' + suffix[suffix.length - 1]);
    }
})
let upload = multer({storage: storage});
//静态路径 可供外界直接使用url地址访问的路径
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(require('koa-static')(__dirname, 'public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(function(req, res, next) {
	res.set({
		'Access-Control-Allow-Origin': '*'
	})
	next();
})

//前端访问服务器静态路径的图片
app.get('/upload/:name', function (req, res, next) {
  var options = {
    root: __dirname + '/public/img/avatar/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };
  var fileName = req.params.name;
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:', fileName);
    }
  });
})
//查询新闻列表
app.post('/list', (req, res) => {
	try {
		let type = req.body.type; // 类别
		let page = req.body.page ? req.body.page : 1; // 页数
		model.find({
			className: type
		},{_id:1,title:1,className:1,source:1,postTime:1,img:1}, function(err, infos) {

			res.json({
				status: 'Success!',
				msg: '查询成功',
				data: infos
			})
		}).limit(20).skip((page - 1) * 20).sort({'postTime':-1})
	} catch (err) {
		res.json({
			status: 'Fail!',
			msg: err,
			data: []
		})
	}
})
//查询新闻详细页面
app.post('/news', (req, res) => {
	try {
		let id = req.body.newId; // 类别
		model.findById(id, function(err, nn) {
			console.log(nn)
			res.json({
				status: 'Success!',
				msg: '查询成功',
				data: nn
			})
		})
	} catch (err) {
		res.json({
			status: 'Fail!',
			msg: err,
			data: []
		})
	}
})
//查询
app.post('/search',function(req,res){
	try{
		var key = req.body.key;
		var page = req.body.page?req.body.page:1
		model.find({title: new RegExp(key,'i')},{_id:1,title:1,className:1,source:1,postTime:1}).limit(20).skip((page-1)*20).sort({'postTime':-1}).exec(function(err,ns){
			res.json({status:'success',msg:'查询成功',data:ns})
		})
	}catch(err){
		res.json({status:'fail',msg:'查询失败',data:[]})
	}
})
//注册接口  username-账号   password-密码   img-用户头像文件名称
//code错误状态码    msg返回的提示信息
app.post('/reg', upload.single('avatar') , function(req, res) {

	let username = req.body.username
	let password = req.body.password
	let imgname = req.file.filename;
	if (username == null || password == null || username == '' || password == '' || imgname == null || imgname == '') {
		res.json({
			code: '0',
			msg: '参数错误'
		})
	} else {
		usermodule.find({
			user: `${username}`
		}, function(err, ret) {
			if (err) { //数据库报错提示
				res.json({
					code: '5',
					msg: 'Internal Server Error'
				})
			} else { //进行账号判断   是否已经注册

				if (ret.length != 0) { //说明有数据查出来==>账号已经被注册
					res.json({
						code: '1',
						msg: '账号已注册'
					})
				} else { //说明没有数据查出来==>账号没有被注册,进行注册
					var mewsshuju = new usermodule({
						user: username,
						password: password,
						img: imgname,
						time: new Date().getTime()
					})
					//保存数据   是否有异常进行处理
					mewsshuju.save(function(err) {
						if (err) {
							res.json({
								code: '2',
								msg: '注册失败,未知错误'
							})
						} else {
							res.json({
								code: '3',
								msg: '注册成功'
							})
						}
					})
				}
			}
		})
	}
})


//登录接口 username-账号   password-密码
app.post('/login', function(req, res) {
	let username = req.body.username
	let password = req.body.password
	if (username == null || password == null || username == '' || password == '') {
		res.json({
			code: '0',
			msg: '参数错误'
		})
	} else {
		usermodule.find({
			user: `${username}`
		}, function(err, ret) {
			if (err) { //数据库报错提示
				res.json({
					code: '5',
					msg: 'Internal Server Error'
				})
			} else {
				if (ret.length == 0) { //没有查询出数据来  说明没有该账号
					res.json({
						code: '1',
						msg: '没有该账号'
					})
				} else { //有查询出数据  说明该账号存在
					//进行账号的密码是否正确判断
					if (password != ret[0].password) { //密码不匹配
						res.json({
							code: '2',
							msg: '账号密码错误'
						})
					} else { //密码匹配正确
						//token值设置
						let tokenstr = jwt.sign({
							exp: Math.floor(Date.now() / 1000) + (60 * 60 * 12 *30),
							data: username
						}, 'lq'); //secret 密钥
						//登录更新 token值
						statusmodule.find({
							user: `${username}`
						}, function(err, ret) {
							if (err) {
								res.json({
									code: '5',
									msg: '未知错误'
								})
							} else {
								if (ret.length > 0) { //用户登录状态
									if (ret[0].token == null || ret[0].token == '') {
										//修改用户状态
										statusmodule.update({
												"user": username
											}, {
												$set: {
													"token": `${tokenstr}`,
													"userstatus": 1
												}
											},
											function(error, result) {});
										res.json({
											code: '4',
											msg: '登录成功',
											token: tokenstr
										})
									} else {
										res.json({
											code: '4',
											msg: '登录成功',
											token: ret[0].token
										})
									}
								} else { //用户第一次登录保存状态
									var statusdb = new statusmodule({
										user: username,
										token: tokenstr,
										userstatus: 1 // 0-未登录  1-登录
									})
									statusdb.save()
									res.json({
										code: '4',
										msg: '登录成功',
										token: tokenstr
									})
								}
							}
						})
					}
				}
			}
		})
	}
})



//收藏和取消收藏
//post请求  传入三个参数 一、token 登录时返回的token  二、newId 新闻ID 三、1代表查询该文章是否收藏、2代表给该文章收藏或取消收藏
//返回值 一、status 请求是否成功   二、msg 描述   三、data对象，属性isCollect代表该新闻是否收藏
app.post('/collected', function(req, res) {
	let status = 'success';
	let msg = '参数错误';
	let isCollect = false;
	let newId = req.body.newId;
	let token = req.body.token;
	let type = req.body.type;
	//判断传来的参数是否存在
	if (!newId || !token || type != 1 && type != 2) {
		status = 'fail'
		res.json({
			status: status,
			msg: msg,
			data: {
				isCollect: isCollect
			}
		});
		return;
	}
	let username = jwt.decode(token).data;
	//查询收藏表中是否有该用户
	colModel.find({
		username: username,
		newId: newId
	}, function(err1, result1) {
		//收藏表中若无该用户，则存入该用户id和收藏的文章id
		if (result1.length === 0) {
			//type为1时查询文章是否收藏 、type为2时对文章收藏和取消收藏
			if (type == 1) {
				msg = '未收藏';
				isCollect = false;
			} else if (type == 2) {
				let colInfo = new colModel({
					username: username,
					newId: newId,
					isCollect: true
				})
				colInfo.save(function(err2) {
					if (err2) {
						console.log(err2)
						res.json({
							status: 'fail',
							msg: '收藏失败',
							data: {
								isCollect: false
							}
						});
						return;
					}
				})
				msg = '收藏成功';
				isCollect = true;
			}
		} else {
			//收藏表中若有该用户，则查询是否有收藏该文章
			//type为1时查询文章是否收藏、type为2时对文章收藏和取消收藏
			if (type == 1) {
				status = 'success';
				msg = '已收藏';
				isCollect = true;
			} else if (type == 2) {
				isCollect = false;
				msg = '取消收藏';
				colModel.remove({
					username: username,
					newId: newId
				}, function(err3, result3) {
					if (err1) {
						console.log('更新失败')
						res.json({
							status: 'fail',
							msg: '收藏失败',
							data: {
								isCollect: false
							}
						});
						return;
					}
				})
			}
		}
		res.json({
			status: status,
			msg: msg,
			data: {
				isCollect: isCollect
			}
		})
	})
})

//个人收藏列表   参数  一、token 登录时返回的token
app.post('/collectList', function(req, res) {
	let token = req.body.token;
	let data = [];
	let msg = '';
	let status = '';
	//判断传来的参数是否存在
	if (!token) {
		res.json({
			status: 'fail',
			msg: '参数错误',
			data: []
		});
		return;
	}
	let username = jwt.decode(token).data;
	colModel.find({
			username: username,
			isCollect: true
		}, {
			newId: 1
		})
		.populate('newId').exec(function(err1, result1) {
			status = 'success';
			if (result1.length === 0) {
				msg = '暂无收藏';
			} else {
				msg = '收藏列表';
				data = result1
			}
			res.json({
				status: status,
				msg: msg,
				data: data
			})
		})
})

//退出登录
app.post('/logout',(req,res)=>{
    let token = req.body.token;
    //判断传来的参数是否存在
    if (!token) {
        res.json({code:'1',msg:'参数错误'});
        return;
    }
    let username = jwt.decode(token).data;
    statusmodule.find({user:`${username}`},function(err,es){
    //     res.json({msg:'登出成功'})
        var whereData = {"user":username}
        var updateDat = {$set: {"token":"","userstatus":0}}; //如果不用$set，替换整条数据
        statusmodule.update(whereData, updateDat, function(error, result){
            if (error) {
                res.json({code:'403',msg:'登出失败'});
            }else{
                res.json({code:'200',msg:'登出成功',data:result});
            }
        });
    })
})

//查看登录状态
app.post('/login/status',(req,res)=>{
    let token = req.body.token;
    if (!token) {
        res.json({code:'1',msg:'参数错误'});
        return;
    }
    let username = jwt.decode(token).data;
	console.log(jwt.decode(token))
	jwt.verify(token, 'lq', (err, decoded) => {
		console.log(decoded,err) 
		if (err) {
			switch (err.name) {
				case 'JsonWebTokenError':
					res.json({ code: -1, msg: '无效的token' });
					break;
				case 'TokenExpiredError':
					res.json({ code: -1, msg: 'token过期' });
					break;
			}
			let whereData = {"user":username}
			let updateDat = {$set: {"token":"","userstatus":0}}; //如果不用$set，替换整条数据
			usermodule.update(whereData, updateDat, function(error, result){
			    if (error) {
			        res.json({code: 500,msg: '修改失败',error: error});
			    }
			});
		}else{
			usermodule.find({user:`${username}`},function(err,es){
				res.json({
					code: 200,
					msg: '登录中',
					data:{
						username: es[0].user,
						imgname: es[0].img
					}
				})
			})
		}
	})
})

//端口监听
app.listen(8001, () => {
	console.log('\n http://127.0.0.1:8001  \n http://localhost/  \n 开启成功!!!! \n')
})
