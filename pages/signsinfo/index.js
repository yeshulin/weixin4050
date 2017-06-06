var appUrl=getApp().globalData.appUrl;
Page({
  data: {
    appUrl: appUrl,
    years: [2017, 2018, 2019, 2020, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2029],
    index:0,
    markers: [{
      iconPath: "/resource/other.png",
      id: 0,
      latitude: 104.05985,
      longitude: 30.54305
    }]
  },
  previewImage: function (e) {
    console.log(e.currentTarget.id);
    console.log(appUrl + '/' + e.currentTarget.id);
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: [appUrl +e.currentTarget.id] // 需要预览的图片http链接列表
    })
  },
  bindYearsChange: function (e) {
    console.log('picker years 发生选择改变，携带值为', e.detail.value);
    this.setData({
      index: e.detail.value
    });
    var years = [2017, 2018, 2019, 2020, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2029];
    var that = this;
    var myDate = new Date();
    var year = years[e.detail.value];
    var userid = wx.getStorageSync("userid");
    wx.request({
      url: appUrl+'/api/signs/list',
      data: {
        userid: userid,
        years: year
      },
      success: function (res) {
        //console.log(res.data.data)
        if(res.data.data){
          var array = new Array();
          res.data.data.forEach(function (val, index, arr) {
            var arrayList = val.Postion.split(",", 2);
            console.log(val);
            val.Postion = arrayList;
            var arrayList1 = val.Photos.split(",", 2);
            val.Photos = arrayList1;
            array.push(val)
          })
          console.log(array)
          that.setData({
            signslist: array
          })
        }else{
          that.setData({
            signslist: ""
          })
        }
        
      }
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
  onLoad: function () {
    var that = this;
    var myDate = new Date();
    var years = myDate.getFullYear();
    var userid = wx.getStorageSync("userid");
    wx.request({
      url: appUrl +'/api/signs/list',
      data:{
        userid:userid,
        years:years
      },
      success:function(res){
        //console.log(res.data.data)
        if (res.data.data) {
          var array = new Array();
          res.data.data.forEach(function (val, index, arr) {
            var arrayList = val.Postion.split(",", 2);
            console.log(val);
            val.Postion = arrayList;
            var arrayList1 = val.Photos.split(",", 2);
            val.Photos = arrayList1;
            array.push(val)
          })
          console.log(array)
          that.setData({
            signslist: array
          })
        } else {
          that.setData({
            signslist: ""
          })
        }
      }
    })
  }
});