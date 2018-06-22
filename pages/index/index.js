var util=require("../../utils/util.js");
var app=getApp();
Page({
  data:{
    navlist:["推荐","排行榜","搜索"],
    navcur:0,
    searchId:1,
    searchform: true,
    searchList:[], //拉上加载
    list:[]  //离线缓存
  },
  onLoad: function (id) {
    var that = this;
    //获取缓存
    // wx.setStorage({
    //   key:"gg",
    //   success: function (res) {
    //     console.log(res.data)
    //     that.setData({
    //       list:res.data
    //     })
    //   }
    // })
    


    wx.getStorage({
      key: 'gg',
      success: function (res) {
       
        that.setData({
          list: res.data
        })

      }
    })
   //热门歌单
    util.Popularsong (id,function(data){
      console.log(data)
    })
    util.indexResult(function (data) {
      that.setData({
        radioList: data.data.radioList,  //电台
        slider: data.data.slider,
        songList: data.data.songList
        
      })
    });

    util.topList(function (data) {
      that.setData({
        topList: data.data.topList,  //排行榜
      })
    });
     
     util.hotkey(function(data){
       that.setData({
           hotkeycur: data.data.hotkey.slice(0, 1),
           hotkey:data.data.hotkey.slice(1,9),//热歌搜索
       })
     })
  },
  //点击事件
  navtap:function(ev){
    var index = ev.currentTarget.dataset.navid;
    this.setData({
      navcur:index
    })
  },
  //打开排行榜详细
  openTopList:function(ev){
    var id= ev.currentTarget.dataset.id;
    wx.navigateTo({
      url:'../toplist/toplist?id=' +id
    })
  },
  //搜索歌曲关键字
  bindKeywordInput:function(ev){
      //console.log(ev.detail.value)
      this.setData({
        searchKey: ev.detail.value,
        searchList:[]
      })
  },
  //搜索结果
  searchResult: function (){
    var that=this;
    var val = this.data.searchKey;
    var searchId = this.data.searchId;
    util.searchResult(val, searchId,function(data){
      var searchList = that.data.searchList
      if (that.data.searchform) {
        searchList = data.data.song.list
        console.log(0)
      }
      else {
        searchList = searchList.concat(that.data.searchList);
        console.log(searchList)
      }
      that.setData({
        searchList: searchList,
        searchform: false
      })
    })

    //离线缓存
    var list=that.data.list;
    console.log(list)
    var obj={};
    obj.content = this.data.searchKey;
    list.push(obj)
    wx.setStorage({
      key:"gg",
      data:list
    });
    this.setData({
      list:list
    })
    
  },
  //上拉加载
  scrolltolower: function () {
    //console.log(1)
    var that = this;
    clearTimeout(this.data.timer)
    this.data.timer = setTimeout(function () {
      that.setData({
        searchId: that.data.searchId + 1,
      })
      //console.log(that.data.searchId);

      that.searchResult();
    }, 100)
  },
  //打开热门搜索
  hotkeyTap:function(ev){
    //console.log(ev)
    app.globalData.songlist = this.data.hotkey.special
    wx.navigateTo({
      url: '../playsong/playsong'
    })


  },
  //打开页面
  openPlayMusic:function(ev){
    //console.log(ev)
    var index = ev.currentTarget.dataset.searchid
    //把一个 传到App
    app.globalData.songlist = this.data.searchList[index]

    //跳转
    wx.navigateTo({
      url: '../playsong/playsong'
    })
  },
  //打开歌单
  opensong:function(ev){
    var id = ev.currenTarget.dataset.idmm
    wx.navigateTo({
      url: '../toplist/toplist'
    })
  }
})