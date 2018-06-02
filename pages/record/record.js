//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
    	recordList: [{money: 300, date: 'date'}, {money: 400, date: 'date3'}, {money: 500, date: 'date2'}]
    },
    
    onLoad: function (options) {
        wx.setNavigationBarTitle({
            title: options.type === 'recharge' ? '充值记录' : '消费记录'//页面标题为路由参数
        })
    }
})