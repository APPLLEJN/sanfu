const app = getApp()

Component({
  properties: {
    bookItem: {
      type: Object,
      value: {}
    },
    isSlide: {
      type: Boolean,
      value: false
    },
    isCategory: {
      type: Boolean,
      value: false
    },
    initSlide: {
      type: String,
      value: ''
    },
  },

  data: {
    startX: 0, //开始坐标
    startY: 0,
    isTouchMove: false
  },

  // 自定义事件
  methods: {
    onBack: function () {
      wx.navigateBack()
    },
    handleNav: function (e) {
      wx.navigateTo({
        url: '/pages/detail/detail?id=' + this.data.bookItem.comic_id
      })
    },
    handleDelete: function (e) {
      this.triggerEvent('deleteItem', this.data.bookItem.comic_id)
    },
    handleTop: function (e) {
      this.triggerEvent('topItem', this.data.bookItem.comic_id)
    },
    handleCancelTop: function (e) {
      this.triggerEvent('cancelTopItem', this.data.bookItem.comic_id)
    },
    handleTouchstart: function (e) {
      this.triggerEvent('initSlide', this.data.bookItem.comic_id)
      if (this.data.isSlide) {
        this.setData({
          startX: e.changedTouches[0].clientX,
          startY: e.changedTouches[0].clientY,
        })
      }
    },
    handleTouchmove: function (e) {
      if (this.data.isSlide) {
        var that = this,
          startX = that.data.startX,//开始X坐标
          startY = that.data.startY,//开始Y坐标
          touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
          touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
          //获取滑动角度
          angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY })
        ;
        //滑动超过30度角 return
        if (Math.abs(angle) > 30) return;
        if (touchMoveX > startX) //右滑
          that.setData({
            isTouchMove: false
          })
        else //左滑
          that.setData({
            isTouchMove: true
          })
      }
    },
    /**
    * 计算滑动角度
    * @param {Object} start 起点坐标
    * @param {Object} end 终点坐标
    */
    angle: function (start, end) {
      var _X = end.X - start.X,
        _Y = end.Y - start.Y
      //返回角度 /Math.atan()返回数字的反正切值
      return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
    },
  },

  // 组件生命周期函数，在组件实例进入页面节点树时执行
  attached: function () {
    // console.log(this.data)
  },
})
