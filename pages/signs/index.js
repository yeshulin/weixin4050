// pages/signs/index.js
var appUrl = getApp().globalData.appUrl;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    appUrl: appUrl,
    showTopTips: false,
    files: [],
    photos:[],
    markers: [{
      iconPath: "/resources/others.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50
    }]
    
    
  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      count: 5,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: appUrl +'/file/upload', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          success: function (res) {
            var data = JSON.parse(res.data);
            console.log(data.data);
            that.setData({
              photos: that.data.photos.concat(data.data)
            }
            )
            //do something
          }
        },"json")
      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //设置当前年份
    var myDate = new Date();
    var currMonth = myDate.getMonth();
    var currQuarter = Math.floor((currMonth % 3 == 0 ? (currMonth / 3) : (currMonth / 3 + 1)));
    console.log(currQuarter);
    that.setData({
      years: myDate.getFullYear(),
      userid: wx.getStorageSync("userid"),
      months: currQuarter
    })
    //设置当前定位
    wx.getLocation({
        type: 'wgs84',
        success: function(res) {
          that.setData({
            longitude:res.longitude,
            latitude: res.latitude
          })
        },
    })

  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },
  formSubmit: function (e) {
    var showTopTips = true;
    var that = this;
     console.log(e.detail.value);
     if (e.detail.value.photos==""){
       this.setData({
         showTopTips: true,
         errMessage: "即时拍照图不能为空！"
       });
       showTopTips = false;
       return showTopTips;
     }
     if (showTopTips == true) {
       this.setData({
         showTopTips: false
       });
       wx.request({
         url: appUrl +'/api/signs', //仅为示例，并非真实的接口地址
         data: e.detail.value,
         header: {
           'content-type': 'application/x-www-form-urlencoded'
         },
         method: 'post',
         success: function (res) {
           console.log(res)
           console.log(res.data.data)
           if(res.data.code==1){
              wx.redirectTo({
                url: '/pages/signs/msg_success',
              })
           }else{
             that.setData({
               showTopTips: true,
               errMessage: res.data.message
             });
             showTopTips = false;
           }
         }

       })
     }  
  }
})