//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
		info: {title: 'title', owner: 'owner'},
		tabOn: 0,
		similarList: [1,2,3],
    order: 'down',
    directoryList: [1,2,3,4,5,6,7,8,9]
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