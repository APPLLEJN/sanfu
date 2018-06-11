// pages/category.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: '1',
    isSelectShow: false,
    isSelectBoxShow: false,
    categoryList: [],
    categoryTab: 'all',
    finishStatus: 'all',
    payType: 'all',
    categoryTabList: [{ id: 'all', name: '全部' }, { id: 'chuanyu', name: '穿越' }, { id: 'tuili', name: '推理' }, { id: 'xuanyi', name: '悬疑' }, { id: 'riman', name: '日漫' }, { id: 'zongcai', name: '总裁' }, { id: 'lingyi', name: '灵异' }, { id: 'shaonian', name: '少年' }, { id: 'quanmou', name: '权谋' }, { id: 'yanqing', name: '言情' }, { id: 'baoxiao', name: '爆笑' }],
    finishStatusList: [{ id: 'all', name: '全部' }, { id: 'wanjie', name: '完结' }, { id: 'lianzai', name: '连载' }],
    payTypeList: [{ id: 'all', name: '全部' }, { id: 'mianfei', name: '免费' }, { id: 'shoufei', name: '收费' }],
    currentPage: 1
  },

  
  handleShowSelect: function () {
    wx.hideTabBar()
    this.setData({
      isSelectShow: true
    })
    setTimeout(() => {
      this.setData({
        isSelectBoxShow: true
      })
    }, 100)
  },
  handleHideSelect: function () {
    this.setData({
      isSelectBoxShow: false
    })
    setTimeout(() => {
      this.setData({
        isSelectShow: false
      })
      wx.showTabBar()
    }, 500)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
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
  getData: function () {
    app.request({
      url: 'https://sanfu.weilubook.com/littleapp/comic/get_list',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: { access_token: wx.getStorageSync('token'), page: this.data.currentPage, content_type: parseInt(this.data.currentTab), class_id: 1, finished: 0, is_charge: 0 },
      success: (result) => {
        this.setData({
          categoryList: result.data.comics,
          currentPage: this.data.currentPage + 1
        })
      }
    })
  },
  handleChangeTab: function (e) {
    this.setData({
      currentTab: e.target.dataset.type
    })
  }
})