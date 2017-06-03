// pages/applyinfo/index.js
var appUrl = getApp().globalData.appUrl;
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    appUrl: appUrl
  
  },

  onLoad: function () {
    var that = this;
    var userid = wx.getStorageSync("userid");
    wx.request({
      url: appUrl +'/api/applys/list',
      data: {
        userid: userid
      },
      success: function (res) {
        //console.log(res.data.data)
        if (res.data.data) {
          var array = new Array();
          res.data.data.forEach(function (val, index, arr) {
            val.Addtime = util.formatTime(new Date(parseInt(val.Addtime) * 1000))
            array.push(val)
          })
          console.log(array)
          that.setData({
            applyslist: array
          })
        } else {
          that.setData({
            applyslist: ""
          })
        }
      }
    })
  }
})