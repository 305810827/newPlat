//获取应用实例
const app = getApp()

Page({
  data: {
      username:'未登录',
      imgname:'../../image/noLogin.png',
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),
    code:-1,
  },
  onLoad: function () {
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 500)
  },
  onShow:function(){
    let that = this;
    let token = wx.getStorageSync('token');
    if(token){
      wx.request({
        url: 'http://localhost:9999/login/status',
        data: {
          token: token
        },
        method: 'POST',
        success(res) {
          console.log(res)
          res.data.data
          that.setData({
            username: res.data.data.username,
            imgname: 'http://localhost:9999/upload/' + res.data.data.imgname,
            code: res.data.code
          })
          
        }
      })
    }
    
  },
  logout:function(){
    let that = this;
    let token = wx.getStorageSync('token');
    wx.request({
      url: 'http://localhost:9999/logout',
      data:{
        token: token
      },
      method:'POST',
      success(res){
        if(res.data.code == 200){
          try {
            wx.removeStorageSync('token')
          } catch (e) {
           console.log(e)
          }
          that.toLogin()
        }
      }
    })
  },
  toCollectList:function(){
    wx.navigateTo({
      url: '../myCollect/myCollect',
    })
  },
  toLogin:function(){
    wx.navigateTo({
      url: '../login/login',
    })
  }
})
