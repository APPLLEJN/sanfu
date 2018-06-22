//获取应用实例
const app = getApp()

Page({
  data: {
    searchData: '',
    searchResultList: null,
    currentPage: 1,
    searchHistory: wx.getStorageSync('searchHistory') || [],
    currentData: '',
    hotList: []
  },
  handleGoBack: function () {
    // this.triggerEvent('handleBack')
    wx.navigateBack({
      delta: 1
    })
  },
  handleChange: function () {
    // console.log('change')
    this.getData()
  },
  handleClearHistory: function () {
    this.setData({
      searchHistory: []
    })
    wx.setStorageSync('searchHistory', [])
  },
  handleSearch: function (e) {
    // 调用搜索接口
    app.request({
      url: 'https://sanfu.weilubook.com/littleapp/comic/search',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: { page: this.data.currentPage, keyword: e.detail.value },
      success: (result) => {
        this.setData({
          searchResultList: [],
          currentPage: 1,
          currentData: e.detail.value
        })
        this.setData({
          searchResultList: this.data.searchResultList.concat(result.data.comics),
          currentPage: this.data.currentPage + 1,
        })
        setTimeout(() => {
          let list = wx.getStorageSync('searchHistory') || []
          if (list.indexOf(e.detail.value) == -1) {
            if (list.length >= 5) {
              list.shift()
            }
            list.push(e.detail.value)
          }
          wx.setStorageSync('searchHistory', list)
          this.setData({
            searchData: '',
            searchHistory: list
          })
        }, 100)
      }
    })
    
  },
  handleHistorySearch: function (e) {
    const val = e.target.dataset.name
    app.request({
      url: 'https://sanfu.weilubook.com/littleapp/comic/search',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: { page: this.data.currentPage, keyword: val },
      success: (result) => {
        this.setData({
          searchResultList: [],
          currentPage: 1,
          currentData: val
        })
        this.setData({
          searchResultList: this.data.searchResultList.concat(result.data.comics),
          currentPage: this.data.currentPage + 1,
        })
      }
    })
  },
  onLoad: function () {
    this.setData({
      searchHistory: wx.getStorageSync('searchHistory') || []
    })
    this.getData()
  },
  getData: function() {
    // 调用搜索接口
    app.request({
      url: 'https://sanfu.weilubook.com/littleapp/hot_word/get_some',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: { access_token: wx.getStorageSync('token') },
      success: (result) => {
        // console.log(result)
        this.setData({
          hotList: result.data.hot_words
        })
      }
    })
  },
  onReachBottom: function () {
    app.request({
      url: 'https://sanfu.weilubook.com/littleapp/comic/search',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: { page: this.data.currentPage, keyword: this.data,currentData },
      success: (result) => {
        this.setData({
          searchResultList: this.data.searchResultList.concat(result.data.comics),
          currentPage: this.data.currentPage + 1,
        })
      }
    })
  },
  handleTapHot: function(e) {
    // console.log(e.target.dataset.val)
    // 调用搜索接口
    app.request({
      url: 'https://sanfu.weilubook.com/littleapp/comic/search',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: { page: this.data.currentPage, keyword: e.target.dataset.val },
      success: (result) => {
        this.setData({
          searchResultList: [],
          currentPage: 1,
          currentData: e.target.dataset.val
        })
        this.setData({
          searchResultList: this.data.searchResultList.concat(result.data.comics),
          currentPage: this.data.currentPage + 1,
        })
      }
    })

  }
})

