//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
		info: {title: 'title', owner: 'owner'},
		tabOn: 0,
		similarList: [1,2,3]
    },
    
    onLoad: function () {
		wx.setNavigationBarTitle({
			title: 'test'
		})
    },
	changeTab: function(e) {
    	console.log(e)
    	const index = e.currentTarget.id
    	this.setData({
			tabOn: +index
		})
    }
})