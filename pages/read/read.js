//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
		scrollTop: 0,
		height: wx.getSystemInfoSync().windowHeight,
		width: wx.getSystemInfoSync().windowWidth,
		imageList: [],
		arr: [],
		arrHeight: [],
		itemHeight: 0,
        id: null,
        cid: null
	},
    
    onLoad: function (option) {
		this.setData({
			me: {name: 'jn', money: '999999', id: '223344'}
		})

        this.getDetail(option.id, option.cid)
        this.setData({
            id: option.id,
            cid: option.cid
        })

    },
	onReady: function () {},
	getDetail: function (id, cid) {
		app.request({
            url: 'https://sanfu.weilubook.com/littleapp/chapter/detail',
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            data: {chapter_id: id, comic_id: cid},
            success: (result) => {
                wx.setNavigationBarTitle({
                    title: result.data.title
                })
                const { content } = result.data
                const { arr } = this.data
                content.map(item => arr.push(false))
                this.setData({
                    arr: arr,
                    imageList: result.data.content
                }, () => this.getRect())
            }
		})
	},
	getRect: function () {
		var that = this
		wx.createSelectorQuery().select('.image').boundingClientRect(function(rect) {
			that.setData({
				itemHeight: rect.height,
			})
			console.log(rect.height)
			that.init(rect.height)
		}).exec()
	},
	init: function (itemHeight) {
		const { height } = this.data
		let index = parseFloat(height/itemHeight)
		for (let i = 0;i < index; i++) {
			this.data.arr[i] = true
		}
		this.setData({
			arr: this.data.arr
		})
		for (let i = 0;i < this.data.arr.length; i++) {
			this.data.arrHeight[i] = Math.floor(i/2) * (itemHeight + 10)
		}

	},
    tap: function(e) {
		const {scrollTop, height, width} = this.data
		const left = width/3
		const right = width/3*2
		const x = e.detail.x
		let top
		if (x< left) {
			top = scrollTop - height
		} else if (x > right) {
			top = scrollTop + height
		} else {
			console.log('center')
		}
		this.setData({
			scrollTop: top
		})
    },
	scroll: function(e) {
		const {arr, arrHeight, height, cid, id} = this.data
		for (var i = 0; i < arrHeight.length; i++) {
			if (arrHeight[i] < e.detail.scrollTop + height + 50 ) {
				if (arr[i] == false) {
					arr[i] = true;
				}
			}
		}
		this.setData({
			scrollTop: e.detail.scrollTop,
			arr: this.data.arr
		})
        console.log(e.detail.scrollTop, height, e.detail.scrollHeight)
        if (e.detail.scrollTop + height > e.detail.scrollHeight - 50) {
            //到底部
            console.log('到底部')
            wx.setStorageSync('read_current'+cid, id)
        }
	}
})