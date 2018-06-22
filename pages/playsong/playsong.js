var util = require("../../utils/util.js");
var app = getApp();

// playsong.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     imgpath:true,
     duration: 0,
     currentPosition: 0,
     currentScent: 0,
     width: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var songlist = app.globalData.songlist;
    console.log(songlist)
    util.lyric(songlist.songname, function (data) {
      
      wx.request({
        url: data.result[0].lrc, //仅为示例，并非真实的接口地址
        data: {
          x: '',
          y: ''
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          var re = /\[.+]/g;
          //console.log(res.data.replace(re,""))
          that.setData({
            lyricText: res.data.replace(re, "")
          });
        }
      })
    });
    
    that.setData({
      
      songlist: songlist,
      imgPath: 'http://y.gtimg.cn/music/photo_new/T002R150x150M000' + songlist.albummid + '.jpg'
    })
    

    
    this.playMusic()
    setInterval(function () {
      wx.getBackgroundAudioPlayerState({
        success: function (res) {
          that.setData({
            duration: res.duration, //总时长
            currentPosition: res.currentPosition,   //当前时间
            currentScent: parseInt(res.currentPosition / 60),//当前分钟
            allFZ: parseInt(res.duration / 60), // 总分钟
            width: res.currentPosition / res.duration * 100 //进度条
          })
        }
      })
    },1000)
  },
  //进度条
    //总时长    当前的时间
    //进度条的宽度  =  当前的时间  /  总时长  * 100
    //快进 后退

    //1.获取手指按下的 x  startx
    //1.获取手指移动的 x  startM
    //判断 你是前进还是后退


    //if (startx > startM )  后退  else 前进
    //改变
    //   总时长 *   20%  =   bar的宽度
  
  /*点击播放歌曲*/
  opensing:function(ev){
     var off= !this.data.imgpath;
     this.setData({
       imgpath:off
     })
    this.playMusic()
  },
  /*播放音乐*/
  playMusic(){
    var songlist = app.globalData.songlist;
   
    if (this.data.imgpath == true) {
      wx.playBackgroundAudio({
        dataUrl: 'http://ws.stream.qqmusic.qq.com/C100' + songlist.songmid + '.m4a?fromtag=38'
      })
    }
    else {
      wx.pauseBackgroundAudio();
    }
  }
})