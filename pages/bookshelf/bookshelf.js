// pages/bookshelf.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabType: 'bookshelf',
    isSearch: false,
    currentBookPage: 1,
    currentHistoryPage: 1,
    bookshelfList: [],
    historyList: [],
    initSlide: 0
  },

  handleChangeTab: function (e) {
    this.setData({
      tabType: e.target.dataset.type
    })
  },

  handleSearch: function (e) {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },
  
  handleBack: function(e) {
    this.setData({
      isSearch: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBookData()
    this.getHistoryData()
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
    if (this.data.tabType == 'bookshelf') {
      this.getBookData()
    } else {
      this.getHistoryData()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  getBookData: function () {
    app.request({
      url: 'https://sanfu.weilubook.com/littleapp/favorite_comic/get_my_list',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: { access_token: wx.getStorageSync('token'), page: this.data.currentBookPage, keyword: '' },
      success: (result) => {
        this.setData({
          bookshelfList: this.data.bookshelfList.concat(result.data.comics),
        })
        if (result.data.comics.length > 0) {
          this.setData({
            currentBookPage: this.data.currentBookPage + 1
          })
        }
      }
    })
  },
  getHistoryData: function () {
    app.request({
      url: 'https://sanfu.weilubook.com/littleapp/read_history/get_my_list',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: { access_token: wx.getStorageSync('token'), page: this.data.currentHistoryPage, keyword: '' },
      success: (result) => {
        this.setData({
          historyList: this.data.historyList.concat(result.data.comics),
        })
        if (result.data.comics.length > 0) {
          this.setData({
            currentHistoryPage: this.data.currentHistoryPage + 1
          })
        }
      }
    })
  },
  handleDelete: function (e) {
    const id = e.detail
    app.request({
      url: 'https://sanfu.weilubook.com/littleapp/favorite_comic/remove',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: { access_token: wx.getStorageSync('token'), comic_id: id },
      success: (result) => {
        let list = this.data.bookshelfList
        list.forEach((item, index) => {
          if (item.comic_id == id) {
            list.splice(index, 1)
            return
          }
        })
        this.setData({
          bookshelfList: []
        })
        this.setData({
          bookshelfList: list
        })
      }
    })
  },
  handleTop: function (e) {
    const id = e.detail
    app.request({
      url: 'https://sanfu.weilubook.com/littleapp/favorite_comic/set_top',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: { access_token: wx.getStorageSync('token'), comic_id: id },
      success: (result) => {
        this.setData({
          currentPage: 1
        })
        if (this.data.tabType == 'bookshelf') {
          this.setData({
              currentBookPage: 1,
              bookshelfList: []
          }, () => {this.getBookData()})
        } else {
          this.getHistoryData()
        }
      }
    })
  },
  handleInitSlide: function(e) {
    this.setData({
      initSlide: e.detail
    })
  },
  handleCancelTop: function (e) {
    const id = e.detail
    app.request({
      url: 'https://sanfu.weilubook.com/littleapp/favorite_comic/remove_top',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: { access_token: wx.getStorageSync('token'), comic_id: id },
      success: (result) => {
        this.setData({
          currentPage: 1
        })
        if (this.data.tabType == 'bookshelf') {
            this.setData({
                currentBookPage: 1,
                bookshelfList: []
            }, () => {this.getBookData()})
        } else {
          this.getHistoryData()
        }
      }
    })
  }
})