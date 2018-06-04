const app = getApp()

Component({
    properties: {
        title: {
            type: String,
            value: ''
        },
        info: {
            type: String,
            value: ''
        },
        image: {
            type: String,
            value: ''
        }
    },

    data: {
        statusBarHeight: 0,
        barStyle: '',
        showBack: false,
    },

    // 自定义事件
    methods: {
        onBack: function() {
            wx.navigateBack()
        },
    },

    // 组件生命周期函数，在组件实例进入页面节点树时执行
    attached: function () {
        // console.log(this.data)
    },
})
