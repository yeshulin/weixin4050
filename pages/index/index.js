//index.js
//获取应用实例
var app = getApp()
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
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
