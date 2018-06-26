// pages/more/more.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '',
    moreList: [],
    currentPage: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData(options.type, options.child_site)
    this.setData({
        type: options.type,
        child_site: options.child_site,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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
    const {child_site, type} = this.data
    this.getData(type, child_site)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  getData: function(type, child_site) {
    let is_fine_quality = ''
    let sort_type = ''
    let url = 'https://sanfu.weilubook.com/littleapp/comic/get_list'
    if (type == 'fine') {
      is_fine_quality = '1'
    } else if (type == 'created') {
      sort_type = 'created_at'
    } else if (type == 'updated') {
      sort_type = 'updated_at'
    } else if (type == 'popular') {
      url = 'https://sanfu.weilubook.com/littleapp/popular_comic/get_list'
    }
    app.request({
      url: url,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: { access_token: wx.getStorageSync('token'), page: this.data.currentPage, content_type: '', class_id: '', finished: '', is_charge: '', is_fine_quality: is_fine_quality, sort_type: sort_type, child_site: child_site },
      success: (result) => {
        this.setData({
          moreList: this.data.moreList.concat(type == 'popular' ? result.data.popular_comics : result.data.comics),
          currentPage: this.data.currentPage + 1
        })
      }
    })
  }
})