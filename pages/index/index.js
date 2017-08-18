var app = getApp()
Page({
  data: {
    userInfo: {}
  },

  clickBtnNew: function () {
    wx.redirectTo({
      url: '../setup/setup',
    })
  },

  clickBtnHistory:function(){
    wx.navigateTo({
      url: '../history/history',
    })
  },

  clickBtnMore:function(){
    wx.showToast({
      title: '更多功能，敬请期待...',
      icon: 'loading',
      duration: 1000
    });
  },

  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  }
})