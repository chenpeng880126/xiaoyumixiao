//app.js
App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  globalData: {

    userInfo: null,
    matchName: "比赛名称",
    matchDate: '',
    matchTime: '',
    matchAdd: '',
    matchNum: '',
    homeTeam: "好好学习",
    guestTeam: "天天向上",
    homeScore: 0,
    guestScore: 0,
    homeColor:'red',
    guestColor:'blue',
    foulLimitedNum:4, //个人累加犯规下场数－1
    quarterfFoulLimitedNum: 4,

    teams:[
    {
      teamName: '红队',
      players:[]
    },
    {
      teamName: '蓝队',
      players: []
    },
    {
      teamName: '黑队',
      players: []
    },
    {
      teamName: '白队',
      players: []
    }
    ],

    homePlayers: [{
      num: '教练', name: '教练', score: 0,
      foul: [], lineUp: true, selected: false
    }
   ],

    guestPlayers: [{
        num: '教练', name: '教练', score: 0,
        foul: [], lineUp: true, selected: false
      }
    ]
  }
})
