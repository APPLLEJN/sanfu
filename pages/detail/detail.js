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
	  isBgShow: false,
      click_cnt: '0',
      like_cnt: '0',
      fav_cnt: '0'
    },
    
    onLoad: function (option) {
		this.setData({
			id: option.id,
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
			data: {comic_id: id, access_token: wx.getStorageSync('token')},
			success: (result) => {
				wx.setNavigationBarTitle({
					title: result.data.comic_name
				})
				this.setData({
          			isCollected: result.data.has_faved,
					comic: result.data,
          			chapters: result.data.chapters,
          			readCurrent: result.data.last_read_chapter_id,
					directoryName: result.data.chapters.filter(item=>item.chapter_id==result.data.last_read_chapter_id)[0].title,
					isBgShow: true
				})
				if (this.data.comic.click_cnt && this.data.comic.click_cnt > 10000) {
				  this.setData({
					click_cnt: (this.data.comic.click_cnt/10000).toFixed(1)+ '万'
				  })
				} else {
				  this.setData({
					click_cnt: this.data.comic.click_cnt
				  })
				}
				if (this.data.comic.like_cnt && this.data.comic.like_cnt > 10000) {
				  this.setData({
					like_cnt: (this.data.comic.like_cnt / 10000).toFixed(1) + '万'
				  })
				} else {
				  this.setData({
					like_cnt: this.data.comic.like_cnt
				  })
				}
				if (this.data.comic.fav_cnt && this.data.comic.fav_cnt > 10000) {
				  this.setData({
					fav_cnt: (this.data.comic.fav_cnt / 10000).toFixed(1) + '万'
				  })
				} else {
				  this.setData({
					fav_cnt: this.data.comic.fav_cnt
				  })
				}
			}
		})
	},
	changeFavor: function() {
        let {isCollected} = this.data
        app.request({
			url: isCollected ? 'https://sanfu.weilubook.com/littleapp/favorite_comic/remove' : 'https://sanfu.weilubook.com/littleapp/favorite_comic/add',
			method: 'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded' // 默认值
			},
			data: {comic_id: this.data.id, access_token: wx.getStorageSync('token')},
			success: (result) => {
				this.setData({
                    isCollected: !isCollected
				})
			}
		})
	},
	handleOrder: function(e) {
		this.setData({
		  order: e.target.dataset.type,
		  chapters: this.data.chapters.reverse()
		})
	},
    onShareAppMessage(res) {}
})