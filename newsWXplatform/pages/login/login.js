// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isTip: false,
    tip: '',
    username: '',
    password: ''
  },
  toIndex:function(){
    wx.switchTab({
      url: '../index/index',
    })
  },
  checkUsername: function(e) {
    this.setData({
      username: e.detail.value
    })
  },
  checkPass: function(e) {
    this.setData({
      password: e.detail.value
    })
  },
  hide: function() {
    this.setData({
      isTip: false,
      tip: ''
    })
  },
  login() { 
    if (!this.data.username) {
      this.setData({
        isTip: true,
        tip: '用户名不能为空'
      })
    } else if (!this.data.password) {
      this.setData({
        isTip: true,
        tip: '密码不能为空'
      })
    } else {
      let that = this;
      wx.request({
        url: 'http://localhost:9999/login',
        data: {
          username: this.data.username,
          password: this.data.password
        },
        method: 'POST',
        success(res) {
          console.log(res);
          let status = res.data.code;
          if (status == 1) {
            that.setData({
              isTip: true,
              tip: res.data.msg
            })
          } else if (status == 2) {
            that.setData({
              isTip: true,
              tip: res.data.msg
            })
          } else if (status == 4) {
            wx.setStorage({
              key: 'token',
              data: res.data.token
            })
            wx.switchTab({
              url: '../index/index',
            })
          }
        }
      })
    }
  }
})