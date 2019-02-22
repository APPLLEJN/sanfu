//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        bannerList: [
            'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
        ],
        indicatorDots: true,
        indicatorColor: 'rgba(0, 0, 0, .3)',
        indicatorActiveColor: '#ff5977',
        autoplay: true,
        circular: true,
        interval: 3000,
        duration: 1000,
        recommendIndex: 0,
        fineQualitiyComics: [],
        newComics: [],
        newUpdateComics: [],
        popularComics: [],
        page: 1,
        height: wx.getSystemInfoSync().windowWidth/750 * 300
    },
    changeIndicatorDots: function(e) {
        this.setData({
            indicatorDots: !this.data.indicatorDots
        })
    },
    changeAutoplay: function(e) {
        this.setData({
            autoplay: !this.data.autoplay
        })
    },
    intervalChange: function(e) {
        this.setData({
            interval: e.detail.value
        })
    },
    durationChange: function(e) {
        this.setData({
            duration: e.detail.value
        })
    },
    changeRecommend: function(e) {
        this.setData({
            recommendIndex: +e.currentTarget.id,
            popularComics: [],
            page: 1,
        }, () => {
            this.getData(+e.currentTarget.id)
            this.getPopularComics(+e.currentTarget.id)
        })
    },
    onLoad: function () {
        this.getData(0)
        this.getPopularComics(0)
    },
    getData: function (id) {
        app.request({
            url: 'https://sanfu.weilubook.com/littleapp/home/index',
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            data: {child_site: id},
            success: (result) => {
                this.setData({
                    bannerList: result.data.carousels,
                    fineQualitiyComics: result.data.fine_qualitiy_comics,
                    newComics: result.data.new_comics,
                    newUpdateComics: result.data.new_update_comics,
                })
            }
        })

    },
    getPopularComics: function (id, restart) {
        const { page, popularComics } = this.data
        app.request({
                url: 'https://sanfu.weilubook.com/littleapp/popular_comic/get_list',
                method: 'POST',
                header: {
                    'content-type': 'application/x-www-form-urlencoded' // 默认值
                },
                data: {child_site: id, page, per_page: 5},
                success: (result) => {
                    if (result.data.popular_comics.length) {
                        this.setData({
                            popularComics: result.data.popular_comics.concat(popularComics),
                            page: page+1
                        })
                    }
            }
        })
    },
    onReachBottom: function () {
        this.getPopularComics(this.data.recommendIndex)
    },
    handleSearch: function () {
        wx.navigateTo({
            url: '/pages/search/search'
        })
    },
    onShareAppMessage(res) {},
})