//index.js
//获取应用实例
var app = getApp()
var appUrl = getApp().globalData.appUrl;
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  applyTap:function(){
    wx.navigateTo({
      url: '../apply/index',
    })
  },
  signsTap:function(){
    wx.navigateTo({
      url: '../signs/index',
    })
  },
  applyInfoTap:function(){
    wx.navigateTo({
      url: '../applyinfo/index',
    })
  },
  signsInfoTap:function(){
    wx.navigateTo({
      url: '../signsinfo/index',
    })
  },
  onLoad: function () {
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      console.log(userInfo)
      //更新数据
      var myDate = new Date();
      var years = myDate.getFullYear();
      var userid = wx.getStorageSync("userid");
      
      wx.request({
        url: appUrl + '/user/getapply',
        data: {
          years: years,
          userid: userid
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res.data)
          console.log(res.data.code)
          that.setData({
            isapply: res.data.code
          })
        }
      })
      that.setData({
        userInfo: userInfo
      })
    })
    

   
  }
})
