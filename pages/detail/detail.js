//index.js
//获取应用实例
var WxParse = require('../../wxParse/wxParse.js');
const app = getApp()

Page({
    data: {
		info: {},
		tabOn: 0,
		order: 'down',
    	isCollected: false,
		id: null,
		readCurrent: 1,
		directoryName: '',
    isBgShow: false
    },
    
    onLoad: function (option) {
		this.setData({
			id: option.id,
			readCurrent: wx.getStorageSync('read_current_'+option.id) || 1,
			tabOn: option.isCatalog ? 1 : 0
		}, () => {
			this.getDetail(option.id)
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
				//const chapters = result.data.chapters.map((item, index) => {
				//	if (!index) {
				//		item.prev = null
				//		item.next = result.data.chapters[index+1].chapter_id
				//	} else if (index + 1 === result.data.chapters.length) {
				//		item.prev = result.data.chapters[index-1].chapter_id
				//		item.next = null
				//	} else {
				//		item.prev = result.data.chapters[index-1].chapter_id
				//		item.next = result.data.chapters[index+1].chapter_id
				//	}
				//	//if (readCurrent === 1 && item.chapter_id) {
				//	//	comic.prev = null
				//	//	comic.next =
				//	//
				//	//}
                //
				//	return item
				//})
				this.setData({
					comic: result.data,
          			chapters: result.data.chapters,
					directoryName: readCurrent === 1 ? result.data.chapters[0].title : result.data.chapters.filter(item=>item.chapter_id==readCurrent)[0].title,
          isBgShow: true
				})
			}
		})
	},
	changeFavor: function() {
		app.request({
			url: this.data.comic.isCollected ? 'https://sanfu.weilubook.com/littleapp/favorite_comic/remove' : 'https://sanfu.weilubook.com/littleapp/favorite_comic/add',
			method: 'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded' // 默认值
			},
			data: {comic_id: this.data.id, access_token: wx.getStorageSync('token')},
			success: (result) => {
				// 换成红色桃心！
			}
		})
	},
  handleOrder: function(e) {
    this.setData({
      order: e.target.dataset.type,
      chapters: this.data.chapters.reverse()
    })
  }
})