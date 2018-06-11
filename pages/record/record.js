//index.js
//获取应用实例
const app = getApp()
import { timeFormat } from '../../utils/index'

Page({
    data: {
      currentType: 1,
      recordList: [{ money: 300, time: 1528705446124 }, { money: 400, date: 1528705446124 }, { money: 500, date: 1528705446124}],
      currentPage: 1,
      moreData: true
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
      const {recordList} = this.data
      app.request({
        url: 'https://sanfu.weilubook.com/littleapp/cash_log/get_list',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        data: { access_token: wx.getStorageSync('token'), page: this.data.currentPage, type: this.data.currentType },
        success: (result) => {
          result.data.cash_logs.map(item =>item.date = timeFormat(item.time))
          this.setData({
            recordList: result.data.cash_logs.concat(recordList),
            currentPage: this.data.currentPage + 1,
            moreData: result.data.cash_logs.length == 20
          })
        }
      })
    }
})