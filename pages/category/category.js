// pages/category.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: '',
    isSelectShow: false,
    isSelectBoxShow: false,
    categoryList: [],
    categoryTab: '',
    finishStatus: '',
    payType: '',
    // categoryTabList: [{ id: 'all', name: '全部' }, { id: 'chuanyu', name: '穿越' }, { id: 'tuili', name: '推理' }, { id: 'xuanyi', name: '悬疑' }, { id: 'riman', name: '日漫' }, { id: 'zongcai', name: '总裁' }, { id: 'lingyi', name: '灵异' }, { id: 'shaonian', name: '少年' }, { id: 'quanmou', name: '权谋' }, { id: 'yanqing', name: '言情' }, { id: 'baoxiao', name: '爆笑' }],
    categoryTabList: [{ comic_class_id: '', title: '全部' }],
    finishStatusList: [{ id: '', name: '全部' }, { id: '1', name: '完结' }, { id: '0', name: '连载' }],
    payTypeList: [{ id: '', name: '全部' }, { id: '0', name: '免费' }, { id: '1', name: '收费' }],
    currentPage: 1
  },

  
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
    this.getClassData()
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getData()
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
      data: { access_token: wx.getStorageSync('token'), page: this.data.currentPage, content_type: this.data.currentTab, class_id: '', finished: this.data.finishStatus, is_charge: this.data.payType },
      success: (result) => {
        this.setData({
          categoryList: this.data.categoryList.concat(result.data.comics),
          currentPage: this.data.currentPage + 1
        })
      }
    })
  },
  getClassData: function () {
    app.request({
      url: 'https://sanfu.weilubook.com/littleapp/comic/get_class',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: { access_token: wx.getStorageSync('token') },
      success: (result) => {
        console.log(result)
        this.setData({
          categoryTabList: this.data.categoryTabList.concat(result.data.comic_classes),
        })
      }
    })
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
  handleChangeTab: function (e) {
    this.setData({
      currentTab: e.target.dataset.type,
      categoryList: [],
      currentPage: 1
    })
    this.getData()
  },
  handleChangeClass: function (e) {
    this.setData({
      categoryTab: e.target.dataset.id,
    })
  },
  handleChangeFinish: function (e) {
    this.setData({
      finishStatus: e.target.dataset.id,
    })
  },
  handleChangePay: function (e) {
    this.setData({
      payType: e.target.dataset.id,
    })
  },
  handleReset: function () {
    this.setData({
      categoryTab: '',
      finishStatus: '',
      payType: '',
    })
  },
  handleConfirm: function () {
    this.setData({
      categoryList: [],
      currentPage: 1
    })
    this.handleHideSelect()
    this.getData()
  }
})