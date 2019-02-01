// pages/charge/charge.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
      cash: 1
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

  recharge: function () {
    console.log( app.globalData.userInfo, ' app.globalData.userInfo')
      app.request({
          url: 'https://sanfu.weilubook.com/littleapp/recharge/unifiedorder',
          method: 'POST',
          header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          data: { access_token: wx.getStorageSync('token'), user_id: app.globalData.userInfo.user_id, cash: this.data.cash },
          success: (result) => {
            const {time_stamp, nonce_str, prepay_id, sign} = result
              wx.requestPayment({
                  timeStamp: time_stamp + '',
                  nonceStr: nonce_str,
                  package: `prepay_id=${prepay_id}`,
                  signType: 'MD5',
                  paySign: sign
              })
          }
      })
  }
})