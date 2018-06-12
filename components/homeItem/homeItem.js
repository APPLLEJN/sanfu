const app = getApp()

Component({
    properties: {
        image: {
            type: String,
            value: ''
        },
        name: {
            type: String,
            value: ''
        },
        sid: {
            type: String,
            value: ''
        },
        cnt: {
            type: String,
            value: ''
        },
        type: {
            type: String,
            value: ''
        }
    },

    data: {
        statusBarHeight: 0,
        barStyle: '',
        showBack: false
        //childSiteType: [{1: '三福漫画'}, {2:'四喜文学'}, {3: '为炉文学'}]
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
