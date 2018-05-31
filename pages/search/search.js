//获取应用实例
const app = getApp()

Page({
  data: {
    searchResultList: [1,2,3,4,]
  },
  handleGoBack: function () {
    // this.triggerEvent('handleBack')
  },
  handleChange: function () {
    console.log('change')
  },
  onLoad: function () {

  }
})

