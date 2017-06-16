var app = getApp();
var appUrl = getApp().globalData.appUrl;
Page({
  data: {
    appUrl: appUrl,
    showTopTips: false
  },
  
 
  onLoad: function () {
    var that = this;
    that.setData({
      userid: wx.getStorageSync("userid"),
      openid: wx.getStorageSync("openid")
    })
    //获取用户头像
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      console.log(userInfo)
      that.setData({
        userInfo: userInfo
      })
    }) 
  },
  formSubmit: function (e) {
    var that = this;
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var showTopTips = true;
    if(e.detail.value.username==""){
        this.setData({
          showTopTips: true,
          errMessage:"用户名不能为空！"
        });
        showTopTips = false;
        return showTopTips;
    }
    if (e.detail.value.password == "") {
      this.setData({
        showTopTips: true,
        errMessage: "密码不能为空！"
      });
      showTopTips = false;
      return showTopTips;
    }
    
    console.log(showTopTips);
    if (showTopTips==true){
      this.setData({
        showTopTips: false
      });
      showTopTips = true;
      console.log(e.detail.value);
      wx.request({
        url: appUrl +'/user/loginweixin', //仅为示例，并非真实的接口地址
        data: e.detail.value,
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method:'post',
        success: function (res) {
          console.log(res.data)
          if (res.data.code == 1) {
            wx.setStorageSync("userrole", res.data.data);
            wx.redirectTo({
              url: '/pages/manager/msg_success',
            })
          }else{
            that.setData({
              showTopTips: true,
              errMessage: res.data.message
            });
            showTopTips = false;
            return showTopTips;
          }
        }
      });
    }
  },
});