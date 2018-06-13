//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        questionList: [],
        showAnswer: []
    },

    onLoad: function () {
        this.getData()
    },
    tap: function (e) {
        const index = e.currentTarget.id
        const arr = this.data.showAnswer
        arr[index] = !this.data.showAnswer[index]
        this.setData({
            showAnswer: arr
        })
    },
    getData: function () {
        const showAnswer = []
        app.request({
            url: 'https://sanfu.weilubook.com/littleapp/faq/get_list',
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            data: {
                access_token: wx.getStorageSync('token'),
                page: 1
            },
            success: (result) => {
                result.data.faqs.map(item => showAnswer.push(false))
                this.setData({
                    questionList: result.data.faqs,
                    showAnswer,
                })
            }
        })
    }
})