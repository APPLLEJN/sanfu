//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        
    },
    
    onLoad: function (options) {
        console.log(options.path)
        this.setData({
            fromPath: options.path || '/pages/index/index'
        })
        
    },
    getUserinfo: function (e) {
        const fromPath = this.data.fromPath
        wx.login({
            success: function(res) {
                console.log(res, '====')
                if (res.code) {
                    //发起网络请求
                    app.request({
                        url: 'https://sanfu.weilubook.com/littleapp/user/login',
                        method: 'POST',
                        header: {
                            'content-type': 'application/x-www-form-urlencoded' // 默认值
                        },
                        data: {js_code: res.code},
                        success: (result) => {
                            const {cash, user_id} = result.data
                            // wx.getUserInfo({
                            //     success: (data) => {
                            wx.setStorageSync('token', result.data.access_token)
                            wx.setStorageSync('userInfo', Object.assign({}, e.detail.userInfo, {cash, user_id}))
                            wx.reLaunch({
                              url: decodeURIComponent(fromPath)
                            })
                            //     }
                            // })
                        }
                    })
                } else {
                    console.log('登录失败！' + res.errMsg)
                }
            }
        })

    }
})