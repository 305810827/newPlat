//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    files: [],
    username:'',
    password1:'',
    password2:'',
    isTip:false,
    tip:'',
  },
  //选择上传图片
  chooseImage: function (e) {
    console.log(e);
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        console.log(that.data.files.length)
        if (that.data.files.length>=1){
          that.setData({
            files: that.data.files[0] = res.tempFilePaths
          });
        }else{
          that.setData({
            files: that.data.files.concat(res.tempFilePaths)
          });
        }
        that.hide()
      }
    })
  },
  //浏览图片
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  //账号数据双向绑定
  checkUsername: function(e){
    this.setData({
      username: e.detail.value
    })
  },
  //密码数据双向绑定
  checkPass1: function(e){
    this.setData({
      password1: e.detail.value
    })
  },
  //密码数据双向绑定
  checkPass2: function (e) {
    this.setData({
      password2: e.detail.value
    })
  },
  hide:function(){
    this.setData({
      isTip: false,
      tip: ''
    })
  },
  register: function(){
    if (!this.data.username) {
      this.setData({
        isTip: true,
        tip: '用户名不能为空'
      })
    }else if(!this.data.password1) {
      this.setData({
        isTip: true,
        tip: '密码不能为空'
      })
    }else if (!this.data.password2) {
      this.setData({
        isTip: true,
        tip: '密码不能为空'
      })
    }else if (this.data.password2 !== this.data.password1) {
      this.setData({
        isTip: true,
        tip: '两次密码不一致'
      })
    } else if (this.data.files.length === 0) {
      this.setData({
        isTip: true,
        tip: '上传的头像不能为空'
      })
    }else{
      wx.showToast({
        title: '注册成功',
        icon: 'success',
        duration: 1000
      })
      let that = this;
      console.log(this.data.files[0])
      wx.uploadFile({
        url: 'http://localhost:9999/reg',
        filePath: this.data.files[0],
        name: 'avatar',
        formData: {
          'username': this.data.username,
          'password': this.data.password1,
        },
        success(res) {
          let data = JSON.parse(res.data);
          let status = data.code;
          if (status == 1) {
            that.setData({
              isTip: true,
              tip: '账号已注册'
            })
          } else if (status == 2) {
            that.setData({
              isTip: true,
              tip: '注册失败'
            })
          } else if (status == 3) {
            console.log(status);
            wx.showToast({
              title: '注册成功',
              icon: 'success',
              duration: 500
            })
            wx.navigateTo({
              url: '../login/login',
            })
          }
        },
        fail(err){
          console.log(err);
        }
      })
    }
  }
})
