Page({
  data: {
    navbarText: ['财经', '科技', '体育', '军事', '旅游'],
    currentTab: 0,
    news: [],
    loading: false, //"正在加载"的判定变量，默认false，隐藏  
    loaded: false, //“没有更多数据”的判定变量，默认false，隐藏 
    pageIndex: 1, // 每次触发上拉事件，把pageIndex+1  默认为1
  },
  onLoad() {
    this.refreshNews(this.data.navbarText[0])
  },

  //头导航栏跳转
  navbarTap: function(e) {
    let currentTab = e.currentTarget.dataset.idx
    this.setData({
      currentTab: currentTab,
    })
    //设置列表滚到顶部
    wx.createSelectorQuery().select('#srollList').boundingClientRect(function (rect) {
      wx.pageScrollTo({
        scrollTop: 0,
      })
    }).exec()
    this.refreshNews(this.data.navbarText[currentTab]);
  },

  
  toSearch: function() {
    wx.navigateTo({
      url: '../search/search'
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    setTimeout(() => {
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
      this.refreshNews(this.data.navbarText[this.data.currentTab])
    }, 500)
  },
  // 刷新数据
  refreshNews: function (type) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    var pageIndex = 1;
    this.setData({
      pageIndex: pageIndex
    })
    wx.request({
      url: 'http://localhost:9999/list',
      data: {
        type: type,
        page: pageIndex
      },
      method: 'POST',
      success: function (res) {
        that.setData({
          news: res.data.data
        })
        that.setData({
          loading: false, //把"上拉加载"的变量设为true，隐藏
          loaded: false, //把"上拉加载完成"的变量设为false，显示
        })
        wx.hideLoading()
      }
    })

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
      this.getnewsInfo(this.data.navbarText[this.data.currentTab])
    }, 500)
  },
  //加载数据
  getnewsInfo: function (type) {
    let that = this;
    let pageIndex = this.data.pageIndex;
    wx.request({
      url: 'http://localhost:9999/list',
      data: {
        type: type,
        page: pageIndex
      },
      method: 'POST',
      success(res) {
        if (res.data.data.length != 0) {
         
          let news = that.data.news
          if (that.data.pageIndex == 1) {
            news = res.data.data
          } else {
            news = news.concat(res.data.data)
          }
          console.log(news);
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
  },
  
})