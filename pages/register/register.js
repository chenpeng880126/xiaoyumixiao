// pages/register/register.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false, //for customized modal
    modalNum: '',//for customized modal
    modalName: '',//for customized modal
    isModified:'false',
    teamType:null,
    team:'队名',
    tempNum:'',
    tempName:'',
    index: null,
    players: [],
  },

  playerNumInput:function(e){
    this.setData({
      tempNum: e.detail.value
    })
  },

  playerNameInput: function (e) {
    this.setData({
      tempName: e.detail.value
    })
  },

  clickBtnAdd:function(){
    var playerSize = this.data.players.length;
    if (playerSize < 14){
      if (this.data.tempNum != '' && this.data.tempName != ''){
        var newarray = [{
          num: this.data.tempNum, name: this.data.tempName, score: 0,
          foul: [], lineUp: true, selected: false
        }];
        this.setData({
          players: this.data.players.concat(newarray),
          tempNum: '',
          tempName: ''
        });
      }else{
        wx.showToast({
          title: '请同时输入球员号码与姓名',
          icon: 'loading',
          duration: 1000
        })
      }
    }else{
      wx.showToast({
        title: '检入球员数量已达上限',
        icon: 'loading',
        duration: 1500
      })
      console.log('The max number for team members is 14.');
    }
  },

  clickBtnCheckIn:function(){
    var that = this;
    var playerSize = this.data.players.length;
    if (playerSize < 5){
      wx.showToast({
        title: '首次检入至少登记5名球员信息',
        icon: 'loading',
        duration: 2000
      })
    }else{
      wx.showModal({
        title: '球员信息',
        content: '请确认所有球员已登记完毕！并点击左上角“返回”。',
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

  clickBtnModify:function(){
    var that = this;
    var playerSize = this.data.players.length;
    if (playerSize < 5) {
      wx.showToast({
        title: '球员信息不能少于5条',
        icon: 'loading',
        duration: 2000
      })
    } else {
      wx.showModal({
        title: '球员信息',
        content: '请确认所有球员已登记完毕！并点击左上角“返回”。',
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

  setGlobleData:function(){
    if(this.data.teamType == 'home'){
      app.globalData.homePlayers = this.data.players;
    } else if (this.data.teamType == 'guest'){
      app.globalData.guestPlayers = this.data.players;
    }
  },
  
  // clickBtnCancel:function(){
  //   wx.showModal({
  //     title: '球员信息',
  //     content: '您想取消此次球员登记？',
  //     success: function (res) {
  //       if (res.confirm) {
  //         wx.redirectTo({
  //           url: '../setup/setup',
  //         })
  //       } else if (res.cancel) {
  //         console.log('用户点击取消')
  //       }
  //     }
  //   }) 
  // },

  remove: function (e) {
    var that = this;
    var dataset = e.target.dataset;
    var Index = dataset.index; 
    var players = that.data.players;
    wx.showModal({   
      title: '删除球员信息',
      content: '您想删除此球员信息？',
      success: function (res) {
        if (res.confirm) {
          players.splice(Index, 1);
          that.setData({
            players: players
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    }) 
    
  },

// Customized modal
  edit: function(e){
    var dataset = e.target.dataset;
    var index = dataset.index;
    var players = this.data.players;
    console.log(players[index].name);
    this.setData({
      index:index,
      modalNum: players[index].num,
      modalName: players[index].name,
      showModal: true
    })
  },
  /**
     * 弹出框蒙层截断touchmove事件
     */
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    var i = this.data.index;
    var players = this.data.players;
    var num = 'players['+i+'].num';
    var name = 'players['+i+'].name';
    this.setData({
      [num]: this.data.modalNum,
      [name]: this.data.modalName,
    });
    console.log('players[i]:'+players[i].name);
    this.hideModal();
  },

  inputNumChange:function(e){
    this.setData({
      modalNum: e.detail.value
    })
  },
  inputNameChange: function (e) {
    this.setData({
      modalName: e.detail.value
    })
  },
  // Customized modal end

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      teamType: options.teamType,
      team: options.team,
      isModified: options.isModified,
    })
    if (this.data.teamType == 'home') {
      this.setData({
        players: app.globalData.homePlayers,
      })
    } else if (this.data.teamType == 'guest') {
      this.setData({
        players: app.globalData.guestPlayers,
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