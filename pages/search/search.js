//获取应用实例
const app = getApp()

Page({
  data: {
    searchData: '',
    searchResultList: [],
    searchHistory: wx.getStorageSync('searchHistory') || []
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
    console.log(e)
    // 调用搜索接口
    setTimeout(() => {
      let list = wx.getStorageSync('searchHistory') || []
      list.push(e.detail.value)
      wx.setStorageSync('searchHistory', list)
      this.setData({
        searchData: '',
        searchHistory: list
      })
    }, 1000)
  },
  onLoad: function () {

  }
})

