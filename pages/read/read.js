//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
		scrollTop: 0,
		height: wx.getSystemInfoSync().windowHeight,
		width: wx.getSystemInfoSync().windowWidth,
		imageList: [
			'http://www.pujia8.com/static/pics/20170930120018_57.jpg',
			'http://www.pujia8.com/static/uploads/20180516141341_49.jpg',
			'http://www.pujia8.com/static/uploads/20180516141343_89.jpg',
			'http://www.pujia8.com/static/uploads/20180516141346_15.jpg',
			'http://www.pujia8.com/static/uploads/20180516141349_44.jpg',
			'http://www.pujia8.com/static/uploads/20180516141351_90.jpg',
			'http://www.pujia8.com/static/uploads/20180606100423_51.png',
		],
		arr: [],
		arrHeight: [],
		itemHeight: 0,
	},
    
    onLoad: function () {
		this.setData({
			me: {name: 'jn', money: '999999', id: '223344'}
		})
		const {imageList,arr} = this.data
		imageList.map(item => {
			arr.push(false)
		})
		this.setData({
			arr: arr
		})
    },
	onReady: function () {
		setTimeout(() => {
			this.getRect()
		}, 1000)
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
		const {arr, arrHeight, height} = this.data
		console.log(arrHeight)
		for (var i = 0; i < arrHeight.length; i++) {
			if (arrHeight[i] < e.detail.scrollTop + height) {
				if (arr[i] == false) {
					arr[i] = true;
				}
			}
		}
		console.log(arr, '===')
		this.setData({
			scrollTop: e.detail.scrollTop,
			arr: this.data.arr
		})
	}
})