// pages/setup/setup.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    matchName:'',
    date: '2015-01-16',
    time: '12:00',
    matchAdd: '',
    matchNum: '',
    homeTeam:'',
    guestTeam:'',
    numIndex:4,
    num2Index: 4,
    num:[1,2,3,4,5,6,7,8,9],
    isNew:'true'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var myDate = new Date();
    var date = myDate.getFullYear() + '-' + (myDate.getMonth()+1) + '-' + myDate.getDate();
    var time = myDate.getHours() + ':' + myDate.getMinutes();
    console.log(options);
    this.setData({
      isNew: options.isNew,
      matchName: app.globalData.matchName,
      date: date,
      time: time,
      matchAdd: app.globalData.matchAdd,
      matchNum: app.globalData.matchNum,
      homeTeam: app.globalData.homeTeam,
      guestTeam: app.globalData.guestTeam
    });
  },

matchNameInput:function(e){
    this.setData({
      matchName: e.detail.value
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  matchAddInput: function (e) {
    this.setData({
      matchAdd: e.detail.value
    })
  },
  matchNumInput: function (e) {
    this.setData({
      matchNum: e.detail.value
    })
  },
  homeTeamInput: function (e) {
    this.setData({
      homeTeam: e.detail.value
    })
  },

  guestTeamInput: function (e) {
    this.setData({
      guestTeam: e.detail.value
    })
  },
  bindNumChange:function(e){
    this.setData({
      numIndex: e.detail.value
    })
  },
  bindNum2Change: function (e) {
    this.setData({
      num2Index: e.detail.value
    })
  },

  clickBtnSave: function () {
    var that = this;
    if (this.data.matchName == '' || this.data.matchAdd == '' || this.data.matchNum == '' || 
      this.data.homeTeam == '' || this.data.guestTeam == ''){
      wx.showToast({
        title: '信息填写不完整',
        icon: 'loading',
        duration: 1500
      })
    }else{
      wx.showModal({
        title: '信息填写完毕',
        content: '请确定比赛信息是否正确',
        success: function (res) {
          if (res.confirm) {
            that.setGlobleData();
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      }) 
    }  
  },

  clickBtnHCheckIn:function(){
    var that = this;
    if (this.data.matchName == '' || this.data.matchAdd == '' || this.data.matchNum == '' ||
      this.data.homeTeam == '' || this.data.guestTeam == '') {
      wx.showToast({
        title: '信息填写不完整',
        icon: 'loading',
        duration: 1500
      })
    }else{
      wx.showModal({
        title: '比赛信息填写完毕',
        content: '基本信息填写完毕，检入主队球员。',
        success: function (res) {
          if (res.confirm) {
            that.setGlobleData();
            wx.navigateTo({
              url: '../register/register?teamType=home&team=' + that.data.homeTeam + '&isModified=false',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })  
    }
  },

  clickBtnGCheckIn: function () {
    var that = this;
    if (this.data.matchName == '' || this.data.matchAdd == '' || this.data.matchNum == '' ||
      this.data.homeTeam == '' || this.data.guestTeam == '') {
      wx.showToast({
        title: '信息填写不完整',
        icon: 'loading',
        duration: 1500
      })
    } else {
      wx.showModal({
        title: '比赛信息填写完毕',
        content: '基本信息填写完毕，检入客队球员。',
        success: function (res) {
          if (res.confirm) {
            that.setGlobleData();
            wx.navigateTo({
              url: '../register/register?teamType=guest&team=' + that.data.guestTeam + '&isModified=false',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },

  setGlobleData: function(){
    app.globalData.matchName = this.data.matchName;
    app.globalData.matchDate = this.data.date;
    app.globalData.matchTime = this.data.time;
    app.globalData.matchAdd = this.data.matchAdd;
    app.globalData.matchNum = this.data.matchNum;
    app.globalData.homeTeam = this.data.homeTeam;
    app.globalData.guestTeam = this.data.guestTeam;
    app.globalData.foulLimitedNum = this.data.numIndex;
    app.globalData.quarterfFoulLimitedNum = this.data.num2Index;
    // wx.redirectTo({
    //   url: '../recording/recording',
    // })
  },
  clickBtnStart:function(){
    var hPlayers = app.globalData.homePlayers;
    var hSize = hPlayers.length;
    var gPlayers = app.globalData.guestPlayers;
    var gSize = gPlayers.length;
    console.log(hSize + ';' + gSize);
    if (hSize >4 && gSize>4 ){
      wx.redirectTo({
       url: '../recording/recording',
     })
    }else{
      wx.showToast({
        title: '球队队员检入不完整，请确认。',
        icon: 'loading',
        duration: 1500
      })
    }
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