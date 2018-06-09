//index.js
//获取应用实例
var WxParse = require('../../wxParse/wxParse.js');
const app = getApp()

Page({
    data: {
		info: {},
		tabOn: 0,
		similarList: [1,2,3],
		order: 'down',
    	isCollected: false,
		id: null,
		readCurrent: 1,
		directoryName: ''
    },
    
    onLoad: function (option) {
		this.getDetail(option.id)
		this.setData({
			id: option.id,
			readCurrent: wx.getStorageSync('read_current'+option.id) || 1
		})
    },
	changeTab: function(e) {
    	console.log(e)
    	const index = e.currentTarget.id
    	this.setData({
			tabOn: +index
		})
    },
	getDetail: function (id) {
		const { readCurrent } = this.data
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
				console.log(readCurrent, result.data.chapters.filter(item=>item.chapter_id))
				this.setData({
					comic: result.data,
					directoryName: readCurrent === 1 ? result.data.chapters[0].title : result.data.chapters.filter(item=>item.chapter_id==readCurrent)[0].title
				})
			}
		})
	},
	changeFavor: function() {
		app.request({
			url: this.comic.isCollected ? 'https://sanfu.weilubook.com/littleapp/favorite_comic/remove' : 'https://sanfu.weilubook.com/littleapp/favorite_comic/add',
			method: 'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded' // 默认值
			},
			data: {comic_id: this.data.id, access_token: wx.getStorageSync('token')},
			success: (result) => {
				// 换成红色桃心！
			}
		})
	}
})