const app = getApp()

Component({
    properties: {
        money: {
            type: Number,
            value: 0
        },
        date: {
          type: Number,
          value: 0
        },
        description: {
          type: String,
          value: ''
        },
    },
    // data: {
    //   time: this.formatTime(date)
    // },
    // 自定义事件
    methods: {
      formatTime: function (time) {
        var date = new Date(time)
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var day = date.getDate()

        var hour = date.getHours()
        var minute = date.getMinutes()
        var second = date.getSeconds()

        return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
      },
    },
})
