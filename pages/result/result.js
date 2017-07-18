// pages/result/result.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    homeScore: 0,
    guestScore: 0,

    winnerHome:true,
    homePlayers: [],
    guestPlayers: [],
    homeTeam: '好好学习',
    guestTeam: '天天向上',

    matchName: "",
    matchDate: '',
    matchTime: '',
    matchAdd: '',
    matchNum: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var homePlayers = app.globalData.homePlayers;
    var guestPlayers = app.globalData.guestPlayers;
    var hScore = app.globalData.homeScore;
    var gScore = app.globalData.guestScore;
    var homeTeam = app.globalData.homeTeam;
    var guestTeam = app.globalData.guestTeam;
    var winnerHome = null;

    var matchName = app.globalData.matchName;
    var matchDate = app.globalData.matchDate;
    var matchTime = app.globalData.matchTime;
    var matchAdd = app.globalData.matchAdd;
    var matchNum = app.globalData.matchNum;

    // for (var i= 0; i < homePlayers.length; i++){
    //   if(homePlayers[i].num == '教练'){
    //     homePlayers.splice(i, 1);
    //   }
    // }
    // for (var i = 0; i < guestPlayers.length; i++) {
    //   if (guestPlayers[i].num == '教练') {
    //     guestPlayers.splice(i, 1);
    //   }
    // }

    if (hScore > gScore){
      winnerHome = true;
    } else if (hScore < gScore){
      winnerHome = false;
    }else{
      winnerHome = 'tie'
    }

    this.setData({
      homePlayers: homePlayers,
      guestPlayers: guestPlayers,
      homeTeam : homeTeam,
      guestTeam : guestTeam,
      homeScore : hScore,
      guestScore : gScore,
      winnerHome: winnerHome,
      matchName: matchName,
      matchNum: matchNum,
      matchDate: matchDate,
      matchTime: matchTime,
      matchAdd: matchAdd
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