const app = getApp()

import { formatTime } from '../../utils/index'

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
    data: {
      fTime: 0
    },
    // 自定义事件
    methods: {

    },
    ready: function () {
      this.setData({
          fTime: formatTime(this.data.date)
      })
    },
})
