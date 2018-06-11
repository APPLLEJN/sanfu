//app.js

// 开发模式开关
const dev = true

const showLoading = function (options) {
    if (wx.canIUse('showLoading')) {
        wx.showLoading(options);
    } else {
        wx.showToast(Object.assign({
            icon: 'loading'
        }, options));
    }
}
const hideLoading = function () {
    if (wx.canIUse('hideLoading')) {
        wx.hideLoading();
    } else {
        wx.hideToast();
    }
}

App({
    apiBaseUrl: dev
        ? '' // 测试环境
        : '', // 正式环境
    
    onLaunch: function (options) {
        const userInfo = wx.getStorageSync('userInfo')
        const token = wx.getStorageSync('token')
        console.log('🎈 App已启动。当前用户信息', userInfo, token)
        // 验证TOKEN是否失效
        // ...
         if (!userInfo && options.path !== "pages/login/login")
             wx.reLaunch({ url: "/pages/login/login" })
         else
             this.setUserInfo(userInfo, token)
        
    },
    onShow: function (options) {
        // if (!this.globalData.hasUserInfo &&
        //     (typeof options === 'object' && options.path !== "pages/login/login")
        // )
        //     wx.reLaunch({ url: "/pages/login/login" })
        // else if (!this.globalData.hasUserInfo)
        //     wx.redirectTo({
        //         url: '/pages/login/login'
        //     })
        //
    },
    onHide: function (options) {
        // 回到首页
    },
    onError: function (msg, cbNext, text) {
        
    },
    setUserInfo: function (userInfo, token) {
        // this.globalData.userInfo = userInfo
        // this.globalData.hasUserInfo = true
        // if (token) {
        //     this.globalData.token = token
        //     wx.setStorageSync('token', token)
        // }
        // if (Array.isArray(userInfo.privilege)) {
        //     // userInfo.permissions = userInfo.privilege
        //     //     .filter(obj => obj.status && obj.status.toLowerCase() === 'on')
        //     //     .map(obj => obj.signature)
        //     const permissions = {}
        //     userInfo.privilege.forEach(obj => {
        //         if (obj.status && obj.status.toLowerCase() === 'on') {
        //             permissions[obj.signature] = true
        //         }
        //     })
        //     userInfo.permissions = permissions
        // }
        // console.log(
        //     'setUserInfo',
        //     userInfo,
        //     token
        // )
        // wx.setStorageSync('userInfo', userInfo)
    },
    clearUserInfo: function () {
        this.globalData.userInfo = undefined
        wx.removeStorageSync('userInfo')
        this.globalData.hasUserInfo = false
        this.globalData.token = undefined
    },
    globalData: {
        userInfo: null,
        hasUserInfo: false,
        token: undefined,
    },
    showLoading,
    // hideLoading,
    // 回到首页
    backToHome: function () {
        wx.redirectTo({
            url: '/pages/index/index'
        })
    },
    // AJAX请求
    request: function (options) {
        let isFailed = false
        const {
            success = function () { },
            fail: _fail,
            toast = '请求中',
            ..._options
        } = options
        const fail = err => {
            isFailed = true
            hideLoading()
            if (typeof _fail === 'function')
                _fail(err)
            else if (typeof err === 'object' && err.code) {
                wx.showModal({
                    title: `错误 (${err.code})`,
                    content: err.errMsg || '',
                    showCancel: false,
                })
            } else {
                let msg = '请求失败'
                console.log(err)
                switch (err.errMsg) {
                    // 微信内部错误
                    case 'request:fail url not in domain list':
                        msg = 'URL白名单错误'; break
                    case 'request:fail timeout':
                        msg = '请求超时'; break
                    // 项目约定错误
                    case 'invalid username or password':
                        msg = '用户名或密码错误'; break
                }
                // throw new Error(msg)
                this.onError(msg)
            }
        }
        showLoading({
            title: toast,
            mask: true
        })
        const requrestOptions = Object.assign({
            success: function (res) {
                console.log('└ 请求结果', res)
                
                if (!res.data) return fail()
                const data = res.data
                if (data.code == 502) {
                  wx.navigateTo({
                    url: '/pages/login/login'
                  })
                  return
                }
                if (data) return success(data)
                success(data)
            },
            fail,
            complete: function (res) {
                if (!isFailed) hideLoading()
            },
        }, _options)
        console.log('✈ 即将请求', requrestOptions.url)
        wx.request(requrestOptions)
    }
})