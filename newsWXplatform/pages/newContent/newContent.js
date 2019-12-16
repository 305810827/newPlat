// pages/newContent/newContent.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newId:'',
    news:{},
    isCollect:false,
    token:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    let that = this;
    this.setData({
      newId:e.id
    })
    //取出token值
    let token = wx.getStorageSync('token')
    this.setData({
      token: token
    })
    //请求新闻详细内容
    wx.request({
      url: 'http://localhost:9999/news',
      method: 'POST',
      data: {
        newId: e.id
      },
      success(res) {
        //将内容部分的html转换为小程序的wxml
        // WxParse.wxParse('news_content', 'html', res.data.data.content, that, 5)
        res.data.data.content = res.data.data.content.replace(/\<img/gi, '<img style="width:100%;height:auto;display:block;margin: 5px 0;"');
        console.log(res.data.data.content)
        that.setData({
          news: res.data.data
        })
      }
    })
    //请求查询新闻的收藏状态
    wx.request({
      url: 'http://localhost:9999/collected',
      method: 'POST',
      data: {
        type: 1,
        newId: e.id,
        token: token
      },
      success(res){
        console.log(res,'collected');
        that.setData({
          isCollect:res.data.data.isCollect
        })
      }
    })
  },
  collected:function(){
    let that = this;
    wx.request({
      url: 'http://localhost:9999/collected',
      method:'POST',
      data:{
        type:2,
        newId: this.data.newId,
        token: this.data.token
      },
      success(res){
        console.log(res);
        that.setData({
          isCollect: res.data.data.isCollect
        })
      }
    })
  },
  toLogin(){
    wx.navigateTo({
      url: '../login/login',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})