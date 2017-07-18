// recording/recording.wxml
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    foulLimitedNum: 4,
    quarterfFoulLimitedNum : 4,

    hiddenClearF: true,
    hiddenClearT: true,
    hiddenClearA: true,

    hiddenPToast:true,

    matchName: '比赛名称',
    homeTeam: '主队',
    guestTeam: '客队',
    quarter: 1,
    homeTimeOut: [],
    homeFoul: [],
    guestTimeOut: [],
    guestFoul: [],

    team:'',
    foulHidden:true,
    foulItems:['P','U','T','OP','D','Delete'],

    homeScore: 0,
    selectedHomePlayerNum: '',
    selectedHomePlayerIndex: '',
    selectedHomePlayer: false,
    homePlayers:app.globalData.homePlayers,

    guestScore: 0,
    selectedGuestPlayerNum: '',
    selectedGuestPlayerIndex: '',
    selectedGuestPlayer: false,
    guestPlayers: app.globalData.guestPlayers,

    originPlayers: [{
      num: '教练', name: 'TBD', score: 0,
      foul: [], lineUp: true, selected: false
    }]

  },

  selectHomePlayer: function (e) {
    // console.log(e);
    var id = e.currentTarget.id;    
    var homePlayers = this.data.homePlayers;
    var isSelected = homePlayers[id].selected;
    if ((!this.data.selectedHomePlayer && !this.data.selectedGuestPlayer)|| id == this.data.selectedHomePlayerIndex){
      var playerSelected = 'homePlayers[' + id + '].selected';
      var playerSelectedNum = 'homePlayers[' + id + '].num'
      this.setData({ 
        selectedHomePlayer: !this.data.selectedHomePlayer, 
        [playerSelected]: !isSelected,
        selectedHomePlayerIndex: e.currentTarget.id,
        selectedHomePlayerNum: [playerSelectedNum],
        selectedGuestPlayerIndex:'',
        team:'home'
      });
    }
  },

  selectGuestPlayer: function (e) {
    // console.log(e);
    var id = e.currentTarget.id;
    var guestPlayers = this.data.guestPlayers;
    var isSelected = guestPlayers[id].selected;
    if ((!this.data.selectedHomePlayer && !this.data.selectedGuestPlayer)|| id == this.data.selectedGuestPlayerIndex) {
      var playerSelected = 'guestPlayers[' + id + '].selected';
      var playerSelectedNum = 'guestPlayers[' + id + '].num'
      this.setData({
        selectedGuestPlayer: !this.data.selectedGuestPlayer,
        [playerSelected]: !isSelected,
        selectedGuestPlayerIndex: e.currentTarget.id,
        selectedGuestPlayerNum: [playerSelectedNum],
        selectedHomePlayerIndex: '',
        team: 'guest'
      });
    }
  },

  operScore:function(n){
    var hScore = this.data.homeScore;
    var hPlayerIndex = this.data.selectedHomePlayerIndex;
    var homePlayers = this.data.homePlayers;

    var gScore = this.data.guestScore;
    var gPlayerIndex = this.data.selectedGuestPlayerIndex;
    var guestPlayers = this.data.guestPlayers;

    if(this.data.team == 'home'){
      var selectedScore = 0;
      var score = parseInt(n);

      selectedScore = homePlayers[hPlayerIndex].score;
      selectedScore += score;
      hScore += score;

      var playerScore = 'homePlayers[' + hPlayerIndex + '].score';
      var playerSelected = 'homePlayers[' + hPlayerIndex + '].selected';
      this.setData({
        [playerScore]: selectedScore,
        [playerSelected]: ![playerSelected],
        selectedHomePlayerIndex: '',
        selectedHomePlayer: !this.data.selectedHomePlayer,
        homeScore: hScore
      });
    } else if (this.data.team == 'guest'){
      var selectedScore = 0;
      var score = parseInt(n);

      selectedScore = guestPlayers[gPlayerIndex].score;
      selectedScore += score;
      gScore += score;

      var playerScore = 'guestPlayers[' + gPlayerIndex + '].score';
      var playerSelected = 'guestPlayers[' + gPlayerIndex + '].selected';
      this.setData({
        [playerScore]: selectedScore,
        [playerSelected]: ![playerSelected],
        selectedGuestPlayerIndex: '',
        selectedGuestPlayer: !this.data.selectedGuestPlayer,
        guestScore: gScore
      });
    }
  },

  clickBtnScore: function (e) {
    var id = e.target.id;
    var hPlayerIndex = this.data.selectedHomePlayerIndex;
    var gPlayerIndex = this.data.selectedGuestPlayerIndex;

    switch (id) {
      case 's1':
        if (hPlayerIndex == '' && gPlayerIndex == ''){
          this.setData({
            hiddenPToast: !this.data.hiddenPToast
          });
          console.log('please select a player');
          break;
        }else{
          this.operScore(1);
          break; 
        }

      case 's2':
        if (hPlayerIndex == '' && gPlayerIndex == '') {
          this.setData({
            hiddenPToast: !this.data.hiddenPToast
          });
          console.log('please select a player');
          break;
        } else {
          this.operScore(2);
          break;
        }
      case 's3':
        if (hPlayerIndex == '' && gPlayerIndex == '') {
          this.setData({
            hiddenPToast: !this.data.hiddenPToast
          });
          console.log('please select a player');
          break;
        } else {
          this.operScore(3);
          break;
        }
      case 's_1':
        if (hPlayerIndex == '' && gPlayerIndex == '') {
          this.setData({
            hiddenPToast: !this.data.hiddenPToast
          });
          console.log('please select a player');
          break;
        } else {
          this.operScore(-1);
          break;
        }
      case 'foul':
        if (hPlayerIndex == '' && gPlayerIndex == '') {
          this.setData({
            hiddenPToast: !this.data.hiddenPToast
          });
          console.log('please select a player');
          break;
        } else {
          this.setData({
            foulHidden: !this.data.foulHidden
          })
          break;
        }
      case 'timeOut':
        if (hPlayerIndex == '' && gPlayerIndex == '') {
          this.setData({
            hiddenPToast: !this.data.hiddenPToast
          });
          console.log('please select a player');
          break;
        } else {
          this.operTimeOutFoul('timeOut');
          break;
        }
      case 'foulAdd':
        if (hPlayerIndex == '' && gPlayerIndex == '') {
          this.setData({
            hiddenPToast: !this.data.hiddenPToast
          });
          console.log('please select a player');
          break;
        } else {
          this.operTimeOutFoul('foulAdd');
          break;
        }
    }   
  },
  
  foulChange:function(e){
    this.setData({
      foulHidden: !this.data.foulHidden
    })
  },

  operFoul:function(n){
    var team = this.data.team;
    var foulLimitedNum = parseInt(this.data.foulLimitedNum);
    var quarterfFoulLimitedNum = parseInt(this.data.quarterfFoulLimitedNum);

    var hPlayerIndex = this.data.selectedHomePlayerIndex;
    var homePlayers = this.data.homePlayers;
    var gPlayerIndex = this.data.selectedGuestPlayerIndex;
    var guestPlayers = this.data.guestPlayers;

    var hFoul = this.data.homeFoul;
    var gFoul = this.data.guestFoul;

    if (team == 'home'){
      var playerFoul = 'homePlayers[' + hPlayerIndex + '].foul';
      var playerSelected = 'homePlayers[' + hPlayerIndex + '].selected';
      var selectedFoul = homePlayers[hPlayerIndex].foul;
      if (selectedFoul.length <= foulLimitedNum){
        if (n == 'OP') {
          selectedFoul.push('P')
        } else if (n == 'Delete'){
          selectedFoul.pop();
          hFoul.pop();
        }else{
          selectedFoul.push(n);
        }
        if (hFoul.length < quarterfFoulLimitedNum && n != 'OP' && n != 'Delete' ) {
          hFoul.push('');
        } else {
          console.log('2 free shots');
        }
      }else{
        console.log('This player fouled out!');
      } 
    
      this.setData({
        homeFoul: hFoul,
        [playerFoul]: selectedFoul,
        [playerSelected]: ![playerSelected],
        selectedHomePlayerIndex: '',
        selectedHomePlayer: !this.data.selectedHomePlayer,
      });
    } else if (team == 'guest'){
      var playerFoul = 'guestPlayers[' + gPlayerIndex + '].foul';
      var playerSelected = 'guestPlayers[' + gPlayerIndex + '].selected';
      var selectedFoul = guestPlayers[gPlayerIndex].foul;
      if (selectedFoul.length <= foulLimitedNum) {
        if (n == 'OP'){
          selectedFoul.push('P')
        } else if (n == 'Delete') {
          selectedFoul.pop();
          gFoul.pop();
        }else{
          selectedFoul.push(n);
        }
        if (gFoul.length < quarterfFoulLimitedNum && n != 'OP' && n != 'Delete') {
          gFoul.push('');
        } else {
          console.log('2 free shots');
        }
      } else {
        console.log('This player fouled out!');
      }
      
      this.setData({
        guestFoul: gFoul,
        [playerFoul]: selectedFoul,
        [playerSelected]: ![playerSelected],
        selectedGuestPlayerIndex: '',
        selectedGuestPlayer: !this.data.selectedGuestPlayer,
      });
    }
  },

  operTimeOutFoul:function(n){
    var team = this.data.team;
    var quarterfFoulLimitedNum = parseInt(this.data.quarterfFoulLimitedNum);

    var hFoul = this.data.homeFoul;
    var gFoul = this.data.guestFoul;

    var hTimeOut = this.data.homeTimeOut;
    var gTimeOut = this.data.guestTimeOut;

    var hPlayerIndex = this.data.selectedHomePlayerIndex;
    var homePlayers = this.data.homePlayers;
    var gPlayerIndex = this.data.selectedGuestPlayerIndex;
    var guestPlayers = this.data.guestPlayers;
    if (team == 'home') {
      var playerSelected = 'homePlayers[' + hPlayerIndex + '].selected';
      if (n == 'timeOut'){
        if (hTimeOut.length < 5){
          hTimeOut.push('');
        }else{
          hTimeOut = [];
        }
      } else if (n == 'foulAdd'){
        if (hFoul.length < quarterfFoulLimitedNum){
          hFoul.push('');
        }else{
          hFoul = [];
        }
      }
      this.setData({
        homeTimeOut: hTimeOut,
        homeFoul : hFoul,
        [playerSelected]: ![playerSelected],
        selectedHomePlayerIndex: '',
        selectedHomePlayer: !this.data.selectedHomePlayer,
      });
    } else if (team == 'guest'){
      var playerSelected = 'guestPlayers[' + gPlayerIndex + '].selected';
      if (n == 'timeOut') {
        if (gTimeOut.length < 5) {
          gTimeOut.push('');
        } else {
          gTimeOut = [];
        }
      } else if (n == 'foulAdd') {
        if (gFoul.length < quarterfFoulLimitedNum) {
          gFoul.push('');
        } else {
          gFoul = [];
        }
      }
      this.setData({
        guestTimeOut: gTimeOut,
        guestFoul: gFoul,
        [playerSelected]: ![playerSelected],
        selectedGuestPlayerIndex: '',
        selectedGuestPlayer: !this.data.selectedGuestPlayer,
      });
    }
  },
  
  clickBtnFoul:function(e){
    var id = e.target.id;
    switch(id){
      case 'P':
        this.operFoul('P');
        break;
      case 'U':
        this.operFoul('U');
        break;
      case 'T':
        this.operFoul('T');
        break;
      case 'D':
        this.operFoul('D');
        break;
      case 'OP':
        this.operFoul('OP');
        break;
      case 'Delete':
        this.operFoul('Delete');
        break;
    } 
    this.setData({
      foulHidden: !this.data.foulHidden
    })
  },
  
  clickBtnQuarter:function(){
    var q = this.data.quarter;
    if(q<9){
      q +=1;
    }else{
      q = 1;
    }
    this.setData({
      quarter : q
    })
  },

  clickBtnClearF:function(){
    this.setData({
      hiddenClearF: !this.data.hiddenClearF,
      
    })
  },

  clickBtnClearT: function () {
    this.setData({
      hiddenClearT: !this.data.hiddenClearT,
      
    })
  },

  clickBtnClearA:function(){
    this.setData({
      hiddenClearA: !this.data.hiddenClearA
    })
  },
  clearConfirmF: function () {
    this.setData({
      homeFoul: [],
      guestFoul: [],
      hiddenClearF: true
    })
  },
  clearConfirmT: function () {
    this.setData({
      homeTimeOut: [],
      guestTimeOut: [], 
      hiddenClearT: true
    })
  },
  clearConfirmA: function () {
    var none = [];
    var hPlayers = app.globalData.homePlayers;
    var gPlayers = app.globalData.guestPlayers;
    
    this.setData({
      homeScore: 0, guestScore: 0, quarter: 1,
      homeTimeOut: none, guestTimeOut: none,
      homeFoul: none, guestFoul: none,
      matchName: '比赛名称',
      homeTeam: '好好学习',
      guestTeam: '天天向上',
      homePlayers: this.data.originPlayers,
      guestPlayers: this.data.originPlayers,
        
      hiddenClearA: true
    })
  },

  clearCancel: function () {
    this.setData({
      hiddenClearF: true,
      hiddenClearT: true,
      hiddenClearA: true
    })
  },

  pToastHidden: function () {
    this.setData({
      hiddenPToast: true
    })
  },

  editHPlayers:function(){
    wx.showToast({
      title: '球员信息修改',
      icon: 'loading',
      duration: 2000
    })
    app.globalData.homePlayers = this.data.homePlayers;
    app.globalData.guestPlayers = this.data.guestPlayers;
    wx.navigateTo({
      url: '../register/register?teamType=home&team=' + this.data.homeTeam + '&isModified=true',
    })
  },

  editGPlayers: function () {
    wx.showToast({
      title: '球员信息修改',
      icon: 'loading',
      duration: 2000
    })
    app.globalData.homePlayers = this.data.homePlayers;
    app.globalData.guestPlayers = this.data.guestPlayers;
    wx.navigateTo({
      url: '../register/register?teamType=guest&team=' + this.data.homeTeam + '&isModified=true',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      homePlayers: app.globalData.homePlayers,
      guestPlayers: app.globalData.guestPlayers,
      matchName: app.globalData.matchName,
      homeTeam: app.globalData.homeTeam,
      guestTeam: app.globalData.guestTeam,
      foulLimitedNum: app.globalData.foulLimitedNum,
      quarterfFoulLimitedNum: app.globalData.quarterfFoulLimitedNum
    })
  },

  clickBtnResult:function(){
    var that = this;
    wx.showModal({
      title: '生成比赛结果',
      content: '您是否确定生成比赛结果？',
      success: function (res) {
        if (res.confirm) {
          wx.showToast({
            title: '跳转中...',
            icon: 'loading',
            duration: 2000
          });
          that.setGlobleData();
          wx.navigateTo({
            url: '../result/result'
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    }) 
  },
  setGlobleData: function () {
    app.globalData.homeScore = this.data.homeScore;
    app.globalData.guestScore = this.data.guestScore;
    app.globalData.homePlayers = this.data.homePlayers;
    app.globalData.guestPlayers = this.data.guestPlayers;  
  },

  clickBtnEdit:function(){
    var that = this;
    wx.showModal({
      title: '修改比赛基本信息',
      content: '您是否确定需要修改当前比赛基本信息？',
      success: function (res) {
        if (res.confirm) {
          app.globalData.homePlayers = that.data.homePlayers;
          app.globalData.guestPlayers = that.data.guestPlayers;
          wx.navigateTo({
            url: '../setup/setup?isNew='+false,
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    }) 
  },

  clickBtnNew:function(){
    var that =this;
    wx.showModal({
      title: '新建比赛',
      content: '当前比赛信息将全部清除，您是否确认新建比赛？',
      success: function (res) {
        if (res.confirm) {
          that.resetGlobleData();
          wx.showToast({
            title: '跳转中...',
            icon: 'loading',
            duration: 2000
          });
          wx.redirectTo({
            url: '../setup/setup'
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    }) 
  },

  resetGlobleData: function () {
    app.globalData.matchName = '比赛名称';
    app.globalData.matchDate = '';
    app.globalData.matchTime = '';
    app.globalData.matchAdd = '';
    app.globalData.matchNum = '';
    app.globalData.homeTeam = '好好学习';
    app.globalData.guestTeam = '天天向上';
    app.globalData.foulLimitedNum = 4;
    app.globalData.quarterfFoulLimitedNum = 4;
    app.globalData.homePlayers = this.data.originPlayers;
    app.globalData.guestPlayers = this.data.originPlayers;
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
    this.setData({
      homePlayers: app.globalData.homePlayers,
      guestPlayers: app.globalData.guestPlayers,
      matchName: app.globalData.matchName,
      homeTeam: app.globalData.homeTeam,
      guestTeam: app.globalData.guestTeam,
      foulLimitedNum: app.globalData.foulLimitedNum,
      quarterfFoulLimitedNum: app.globalData.quarterfFoulLimitedNum
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    app.globalData.homePlayers = this.data.homePlayers;
    app.globalData.guestPlayers = this.data.guestPlayers;  
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

