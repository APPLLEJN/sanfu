//index.js
//获取应用实例
const app = getApp()

var WxParse = require('../../wxParse/wxParse.js');

Page({
    data: {
        comic_id: null,
        type: null,
        scrollTop: 0,
        height: wx.getSystemInfoSync().windowHeight,
        width: wx.getSystemInfoSync().windowWidth,
        imageList: [],
        arr: [],
        arrHeight: [],
        itemHeight: 0,
        id: null,
        cid: null,
        isCollected: false,
        isLiked: false,
        isShowFontSet: false,
        isShowBaseBottom: true,
        prev_id: null,
        next_id: null,
        locked: false,
        currentFontSize: '100%'
	  },
    
    onLoad: function (option) {
        this.getDetail(option.id, option.cid)
        this.setData({
            id: option.id,
            cid: option.cid,
            height: wx.getSystemInfoSync().windowHeight,
            width: wx.getSystemInfoSync().windowWidth,
        })
        setTimeout(() => {
         var article = '<p>我是HTML代码</p><img src="http://sanfu.weilubook.com/uploads/resources/2018/05/30/15276703116.jpg"><video src="http://www.zhangxinxu.com/study/media/cat.mp4" controls="controls"></video><audio src="http://mp3.9ku.com/hot/2011/12-13/461514.mp3" name="测试" author="测试" poster="haibao.jpg"></audio>';
         /**
         * WxParse.wxParse(bindName , type, data, target,imagePadding)
         * 1.bindName绑定的数据名(必填)
         * 2.type可以为html或者md(必填)
         * 3.data为传入的具体数据(必填)
         * 4.target为Page对象,一般为this(必填)
         * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
         */
         var that = this;
         WxParse.wxParse('article', 'html', article, that, 5);
        }, 1000)

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
                const { content, content_type, comic_id, previous_chapter_id, next_chapter_id } = result.data
                const { arr } = this.data
                content.map(item => arr.push(false))
                this.setData({
                    type: content_type,
                    arr: arr,
                    imageList: result.data.content,
                    isCollected: result.data.has_faved == 0 ? false : true,
                    isLiked: result.data.has_liked == 0 ? false : true,
                    comic_id: comic_id,
                    prev_id: previous_chapter_id,
                    next_id: next_chapter_id
                }, () => {
                    if(content_type===1) {this.getRect()}
                })
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
        const {scrollTop, height, width, type, isShowBaseBottom} = this.data
        const left = width/3
        const right = width/3*2
        const x = e.detail.x
        let top
        if (x< left) {
            top = scrollTop - height
        } else if (x > right) {
            top = scrollTop + height
        } else {
            if (type === 2) {
                // 这里应该判断是2！！！
                this.setData({
                    isShowBaseBottom: !isShowBaseBottom
                })
            }
        }
        this.setData({
            scrollTop: top
        })
    },
	scroll: function(e) {
		const {arr, arrHeight, height} = this.data
		for (var i = 0; i < arrHeight.length; i++) {
			if (arrHeight[i] < e.detail.scrollTop + height + 150 ) {
				if (arr[i] == false) {
					arr[i] = true;
				}
			}
		}
		this.setData({
			scrollTop: e.detail.scrollTop,
			arr: this.data.arr
		})
	},
    handleShowFontSet: function() {
        this.setData({
          isShowFontSet: !this.data.isShowFontSet
        })
    },
    handleChangeFontSize: function(e) {
      this.setData({
        currentFontSize: e.target.dataset.type
      })
    },
    jumpToPrev: function (e) {
        const {cid} = this.data
        if (e.currentTarget.dataset.id) {
            wx.redirectTo({url: '/pages/read/read?id='+e.currentTarget.dataset.id +'&cid='+cid})
        } else {
            wx.showToast({
                title: '已经是第一章了',
                duration: 2000
            })
        }

    },
    jumpToNext: function (e) {
        console.log('eeeeeenext')
        const {cid} = this.data
        if (e.currentTarget.dataset.id) {
            wx.redirectTo({url: '/pages/read/read?id='+e.currentTarget.dataset.id +'&cid='+cid})
        } else {
            wx.showToast({
                title: '已经是最后一章了',
                duration: 2000
            })
        }
    },
    handleCollect: function() {
      app.request({
        url: this.data.isCollected ? 'https://sanfu.weilubook.com/littleapp/favorite_comic/remove' : 'https://sanfu.weilubook.com/littleapp/favorite_comic/add',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        data: { comic_id: this.data.comic_id, access_token: wx.getStorageSync('token') },
        success: (result) => {
          this.setData({
            isCollected: !this.data.isCollected
          })
        }
      })
    },
    handleLike: function () {
      app.request({
        url: 'https://sanfu.weilubook.com/littleapp/comic/like',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        data: { comic_id: this.data.comic_id, access_token: wx.getStorageSync('token') },
        success: (result) => {
          this.setData({
            isLiked: true
          })
        }
      })
    },
    onReachBottom: function() {
        const {cid, id} = this.data
        console.log('onReachBottom')
        wx.setStorageSync('read_current_'+cid, id)
        this.setData({
            isShowBaseBottom: true
        })
    }
})