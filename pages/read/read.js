//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
		scrollTop: 0,
		height: wx.getSystemInfoSync().windowHeight,
		width: wx.getSystemInfoSync().windowWidth
	},
    
    onLoad: function () {
		this.setData({
			me: {name: 'jn', money: '999999', id: '223344'}
		})
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
		this.setData({
			scrollTop: e.detail.scrollTop
		})
	}
})