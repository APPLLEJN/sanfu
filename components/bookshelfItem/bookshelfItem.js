const app = getApp()

Component({
  properties: {
    
  },

  data: {
  },

  // 自定义事件
  methods: {
    onBack: function () {
      wx.navigateBack()
    },
  },

  // 组件生命周期函数，在组件实例进入页面节点树时执行
  attached: function () {
    // console.log(this.data)
  },
})
