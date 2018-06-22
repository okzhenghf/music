var util = require("../../utils/util.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var index=options.id;
    
    var that=this;
      util.topListDetail(index, function (data) {
        var color = data.color.toString(16);
        if (color == 0) {
          color = "000";
        }
        that.setData({
          date:data.update_time,
          songlist: data.songlist,
          ListName:data.topinfo.ListName,
          pic_album: data.topinfo.pic_album,
          bgColor: color

        })
        
      })
  },

 //打开音乐播放
  openPlaysong:function(ev){
    var index = ev.currentTarget.dataset.idgg;
    //把数据存哪里
    app.globalData.songlist = this.data.songlist[index].data
    wx.navigateTo({
      url:'../playsong/playsong'
    })
  }
})