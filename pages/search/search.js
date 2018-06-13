//获取应用实例
const app = getApp()

Page({
  data: {
    searchData: '',
    searchResultList: null,
    currentPage: 1,
    searchHistory: wx.getStorageSync('searchHistory') || [],
    currentData: ''
  },
  handleGoBack: function () {
    // this.triggerEvent('handleBack')
    wx.navigateBack({
      delta: 1
    })
  },
  handleChange: function () {
    console.log('change')
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
})

