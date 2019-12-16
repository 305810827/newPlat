// pages/myCollect/myCollect.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    news: [],
    token:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    
  },
  onShow: function(){
    let that = this;
    //取出token值
    let token = wx.getStorageSync('token');
    wx.request({
      url: 'http://localhost:9999/collectList',
      method: 'POST',
      data: {
        token: token
      },
      success(res) {
        let news = [];
        for (let i = 0; i < res.data.data.length; i++) {
          news.push(res.data.data[i].newId)
        }
        that.setData({
          news: news
        })
      }
    })
  }
})