// pages/history/history.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    history:[]
  },

  checkHistory:function(e){
    var id = e.currentTarget.id ;
    var history = this.data.history;
    var strHistory = JSON.stringify(history[id]);
    wx.navigateTo({
      url: '../result/result?isHistory=true&' + 'match=' + strHistory
    })
  },

  clickBtnClear:function(){
    var that = this;
    wx.showModal({
      title: '清楚历史记录',
      content: '清楚历史记录，将不能恢复，您确定需要清楚？',
      success: function (res) {
        if (res.confirm) {
          that.setData({
            history: []
          })
          wx.setStorageSync('history', [])
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    }) 
    wx.setStorageSync('history', [])
  },

  remove: function (e) {
    var that = this;
    var dataset = e.target.dataset;
    var Index = dataset.index;
    var history = this.data.history;
    wx.showModal({
      title: '删除比赛记录',
      content: '您想删除此场比赛记录？',
      success: function (res) {
        if (res.confirm) {
          history.splice(Index, 1);
          that.setData({
            history: history
          });
          wx.setStorageSync('history', that.data.history)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      history: wx.getStorageSync('history') || []
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})