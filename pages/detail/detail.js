//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
		info: {title: 'title', owner: 'owner'},
		tabOn: 0,
		similarList: [1,2,3],
    order: 'down',
    isCollected: false,
    directoryList: [1,2,3,4,5,6,7,8,9]
    },
    
    onLoad: function (option) {
		//wx.setNavigationBarTitle({
		//	title: option.title
		//})
		this.getDetail(option.id)
    },
	changeTab: function(e) {
    	console.log(e)
    	const index = e.currentTarget.id
    	this.setData({
			tabOn: +index
		})
    },
	getDetail: function (id) {
		app.request({
			url: 'https://sanfu.weilubook.com/littleapp/comic/detail',
			method: 'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded' // 默认值
			},
			data: {comic_id: id},
			success: (result) => {
				wx.setNavigationBarTitle({
					title: result.data.comic_name
				})
				this.setData({
					comic: result.data
				})
			}
		})
	}
})