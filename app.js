//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function (result) {
          if(result.code){
            wx.request({
              url: getApp().globalData.appUrl+'/user/regweixin',
              method:'post',
              data: {code: result.code},
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success:function(data){
                 console.log(data)
                 wx.setStorageSync('openid',data.data.data.openid);
                 wx.setStorageSync("userid", data.data.data.id);
              }
            })
          }else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
          wx.getUserInfo({
            success: function (res) {
              // console.log(res)
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    //appUrl: "http://localhost:8080"
    appUrl:"https://scps.19apps.com"
  }
})