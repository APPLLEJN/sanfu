// pages/charge/charge.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
      cash: 1,
      isIos: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      const res = wx.getSystemInfoSync()
      this.setData({
          isIos: res.system.indexOf('iOS') > -1
      })
      if (res.system.indexOf('iOS') > -1) return
      app.request({
          url: 'https://sanfu.weilubook.com/littleapp/recharge/get_configs',
          method: 'GET',
          header: {},
          data: { access_token: wx.getStorageSync('token')},
          success: (result) => {
              this.setData({
                  recharge_configs: result.data.recharge_configs
              })
          }
      })
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

  recharge: function (e) {
      app.request({
          url: 'https://sanfu.weilubook.com/littleapp/recharge/unifiedorder',
          method: 'POST',
          header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          data: { access_token: wx.getStorageSync('token'), money: e.currentTarget.dataset.money },
          success: (result) => {
            const {timestamp, nonce_str, prepay_id, pay_sign} = result.data
              wx.requestPayment({
                  timeStamp: timestamp + '',
                  nonceStr: nonce_str,
                  package: `prepay_id=${prepay_id}`,
                  signType: 'MD5',
                  paySign: pay_sign,
                  success: () => {
                      wx.showToast({
                        title: '充值成功'
                      })
                  }
              })
          }
      })
  },
    onShareAppMessage(res) {}
})