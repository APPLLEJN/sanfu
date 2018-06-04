//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        
    },
    
    onLoad: function () {
        
    },
    getUserinfo: function () {
        wx.login({
            success: function(res) {
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
                            wx.getUserInfo({
                                success: (data) => {

                                }
                            })
                        }
                    })
                } else {
                    console.log('登录失败！' + res.errMsg)
                }
            }
        })

    }
})