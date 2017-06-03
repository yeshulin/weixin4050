var app = getApp();
var appUrl = getApp().globalData.appUrl;
Page({
  data: {
    appUrl: appUrl,
    showTopTips: false,

    radioItems: [
      { name: '男', value: '男', checked: true },
      { name: '女', value: '女' }
    ],

    date: "1970-09-01",
    time: "12:01",

    countryCodes: ["+86", "+80", "+84", "+87"],
    countryCodeIndex: 0,

    countries: [],
    countryIndex: 0,

    accounts: ["微信号", "QQ", "Email"],
    accountIndex: 0,

    isAgree: false
  },
  
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }

    this.setData({
      radioItems: radioItems
    });
  },
  
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  bindCountryCodeChange: function (e) {
    console.log('picker country code 发生选择改变，携带值为', e.detail.value);

    this.setData({
      countryCodeIndex: e.detail.value
    })
  },
  bindCountryChange: function (e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);

    this.setData({
      countryIndex: e.detail.value
    })
  },
  bindAccountChange: function (e) {
    console.log('picker account 发生选择改变，携带值为', e.detail.value);

    this.setData({
      accountIndex: e.detail.value
    })
  },
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  }, 
  onLoad: function () {
    var that = this;
    //设置当前年份
    var myDate = new Date();
    that.setData({
      years: myDate.getFullYear(),
      userid:wx.getStorageSync("userid")
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
    //设置区域
    wx.request({
      url: appUrl +'/api/zones',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          countries:res.data.data
        })
      }
    })
  },
  formSubmit: function (e) {
    var that = this;
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var showTopTips = true;
    if(e.detail.value.username==""){
        this.setData({
          showTopTips: true,
          errMessage:"身份证号不能为空！"
        });
        showTopTips = false;
        return showTopTips;
    }
    if (e.detail.value.realname == "") {
      this.setData({
        showTopTips: true,
        errMessage: "真实姓名不能为空！"
      });
      showTopTips = false;
      return showTopTips;
    }
    if (e.detail.value.realname == "") {
      this.setData({
        showTopTips: true,
        errMessage: "真实姓名不能为空！"
      });
      showTopTips = false;
      return showTopTips;
    }

    if (e.detail.value.address == "") {
      this.setData({
        showTopTips: true,
        errMessage: "家庭住址不能为空！"
      });
      showTopTips = false;
      return showTopTips;
    }
    if (e.detail.value.phone == "") {
      this.setData({
        showTopTips: true,
        errMessage: "手机号不能为空！"
      });
      showTopTips = false;
      return showTopTips;
    }
    if (e.detail.value.workaddress == "") {
      this.setData({
        showTopTips: true,
        errMessage: "灵活就业地址不能为空！"
      });
      showTopTips = false;
      return showTopTips;
    }
    if (e.detail.value.worktype == "") {
      this.setData({
        showTopTips: true,
        errMessage: "灵活就业形式不能为空！"
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
        url: appUrl +'/user/apply', //仅为示例，并非真实的接口地址
        data: e.detail.value,
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method:'post',
        success: function (res) {
          if (res.data.code == 1) {
            wx.redirectTo({
              url: '/pages/apply/msg_success',
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
      })
    }
  },
});