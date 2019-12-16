// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    news: [],
    inputValue: '',
    isTrue: true,
    loading: false, //"正在加载"的判定变量，默认false，隐藏  
    loaded: false, //“没有更多数据”的判定变量，默认false，隐藏 
    pageIndex: 1, // 每次触发上拉事件，把pageIndex+1  默认为1
  },

  bindKeyInput: function(e) {
    this.setData({
      inputValue: e.detail.value
    })
    this.getSearchList(this.data.inputValue)
  },
  search: function() {
    this.getSearchList(this.data.inputValue)
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log("加载")
    if (this.data.loaded) return
    this.setData({
      loading: true, //把"上拉加载"的变量设为false， 隐藏
      pageIndex: this.data.pageIndex + 1
    })
    setTimeout(() => {
      this.getSearchList(this.data.inputValue)
    }, 500)
  },
  getSearchList: function(key) {
    console.log(key)
    let that = this;
    let pageIndex = this.data.pageIndex;
    if (key) {
      wx.request({
        url: 'http://localhost:9999/search',
        method: 'POST',
        data: {
          key: key,
          page: pageIndex
        },
        success(res) {
          if (res.data.data.length != 0) {
            let news = that.data.news
            if (that.data.pageIndex == 1) {
              news = res.data.data
            } else {
              news = news.concat(res.data.data)
            }
            that.setData({
              news: news,
              loading: false, //把"上拉加载"的变量设为false，显示 
            })
          } else { // 数组为空
            that.setData({
              loading: false, //把"上拉加载"的变量设为true，隐藏
              loaded: true, //把"上拉加载完成"的变量设为false，显示
            })
          }
        }
      })
    } else {
      this.setData({
        news: [],
        loaded: false
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})