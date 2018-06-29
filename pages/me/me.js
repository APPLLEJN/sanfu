//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
    	me: {},
		list: [
      		{ icon: '/assets/images/recharge.png', name: '充值', link: '/pages/charge/charge'},
			{icon: '/assets/images/recharge_record.png', name: '充值记录', link: '/pages/record/record?type=recharge'},
			{icon: '/assets/images/pay_record.png', name: '消费记录', link: '/pages/record/record?type=pay'},
			{icon: '/assets/images/qa.png', name: '常见问题', link: '/pages/qa/qa'},
      		{icon: '/assets/images/opinion.png', name: '意见反馈', link: '/pages/feedback/feedback'}
		],
        last_price: null
    },
    
    onLoad: function () {
		this.setData({
			me: wx.getStorageSync('userInfo')
		})
        this.getUserInfo()
    },
    tap: function(e) {
    	console.log(this.data.showAnswer)
    	const index = e.currentTarget.id
    	const arr = this.data.showAnswer
    	arr[index] = !this.data.showAnswer[index]
    	this.setData({
    		showAnswer: arr
    	})
    },
    getUserInfo: function () {
        app.request({
            url: 'https://sanfu.weilubook.com/littleapp/user/get_info',
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            data: { access_token: wx.getStorageSync('token') },
            success: (result) => {
            this.setData({
            	last_price: result.data.cash * 100 /10000
       		 })
    	}
    })
    }
})