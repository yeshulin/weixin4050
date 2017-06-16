var appUrl = getApp().globalData.appUrl;
Page({
    data: {
        inputShowed: false,
        inputVal: "",
        appUrl:appUrl
    },
    showInput: function () {
        this.setData({
            inputShowed: true
        });
    },
    hideInput: function () {
        this.setData({
            inputVal: "",
            inputShowed: false
        });
    },
    clearInput: function () {
        this.setData({
            inputVal: ""
        });
    },
    inputTyping: function (e) {
        var that = this;
        wx.request({
          url: appUrl +'/api/users/userlist',
          data:{
            search:e.detail.value
          },
          method:'get',
          success: function (data) {
            console.log(data.data.data);
              that.setData({
                userlist:data.data.data
              })
          }
        })
        this.setData({
            inputVal: e.detail.value
        });
    }
});