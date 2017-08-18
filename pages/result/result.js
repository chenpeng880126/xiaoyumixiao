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
    var isHistory = options.isHistory;
    var match = null;
    var homePlayers = null;
    var guestPlayers = null;
    var hScore = null;
    var gScore = null;
    var homeTeam = null;
    var guestTeam = null;
    var winnerHome = null;

    var matchName = null;
    var matchDate = null;
    var matchTime = null;
    var matchAdd = null;
    var matchNum = null;

    if (isHistory =='true'){ 
      match = JSON.parse(options.match);
      matchName = match.matchName;
      homeTeam = match.homeTeam;
      guestTeam = match.guestTeam;
      matchDate = match.matchDate;
      matchTime = match.matchTime;
      matchAdd = match.matchAdd;
      matchNum = match.matchNum;

      homePlayers = match.homePlayers;
      guestPlayers = match.guestPlayers;
      hScore = match.homeScore;
      gScore = match.guestScore;
    }else{
      console.log('get info from global');
      homePlayers = app.globalData.homePlayers;
      guestPlayers = app.globalData.guestPlayers;
      hScore = app.globalData.homeScore;
      gScore = app.globalData.guestScore;
      homeTeam = app.globalData.homeTeam;
      guestTeam = app.globalData.guestTeam;

      matchName = app.globalData.matchName;
      matchDate = app.globalData.matchDate;
      matchTime = app.globalData.matchTime;
      matchAdd = app.globalData.matchAdd;
      matchNum = app.globalData.matchNum;
    }
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