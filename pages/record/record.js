//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
      currentType: 1,
    	recordList: [{money: 300, date: 'date'}, {money: 400, date: 'date3'}, {money: 500, date: 'date2'}],
      currentPage: 1
    },
    
    onLoad: function (options) {
        wx.setNavigationBarTitle({
            title: options.type === 'recharge' ? '充值记录' : '消费记录'//页面标题为路由参数
        })
        this.setData({
          currentType: options.type === 'recharge' ? 1 : 2
        })
        this.getData()
    },
    getData: function() {
      app.request({
        url: 'https://sanfu.weilubook.com/littleapp/cash_log/get_list',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        data: { access_token: wx.getStorageSync('token'), page: this.data.currentPage, type: this.data.currentType },
        success: (result) => {
          console.log(result)
          this.setData({
            recordList: result.data.cash_logs,
            currentPage: this.data.currentPage + 1
          })
        }
      })
    }
})