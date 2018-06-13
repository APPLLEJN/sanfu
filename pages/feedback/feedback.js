// pages/feedback.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentNum: 0,
    
  },


  handleInput: function (e) {
    // console.log(e.detail.value.length)
    this.setData({
      currentNum: e.detail.value.length
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  bindFormSubmit: function (e) {
    app.request({
          url: 'https://sanfu.weilubook.com/littleapp/feedback/add',
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          data: {
            access_token: wx.getStorageSync('token'),
            content: e.detail.value.textarea
          },
          success: () => {
              wx.showToast({
                title: '提交成功',
                icon: 'success',
                duration: 2000
            })
          },
          fail: () => {
            wx.showToast({
              title: '提交失败',
              icon: 'fail',
              duration: 2000
            })
          }
    })
  }
})