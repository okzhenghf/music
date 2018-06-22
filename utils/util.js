//轮播
function indexResult(callback) {
  wx.request({
    url: 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg', //仅为示例，并非真实的接口地址
    data: {
      g_tk: 5381,
      uin: 0,
      format: 'json',
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'h5',
      needNewCode: 1,
    },
    method: "GET",
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      if (res.statusCode == 200) {  //成功了
        callback(res.data);
        //console.log(res.data)
      }

    }
  })
}
//热门歌单
function Popularsong(id,callback){
  wx.request({
    url: 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg', //仅为示例，并非真实的接口地址
    data: {
      g_tk: 5381,
      uin: 0,
      format: 'jsonp',
      inCharset: 'utf - 8',
      outCharset: 'utf - 8',
      notice: 0,
      platform:'h5',
      needNewCode: 1,
      new_format: 1,
      pic: 500,
      disstid: id,
      type: 1,
      json: 1,
      utf8: 1,
      onlysong: 0,
      nosign: 1,
      _: new Date().getTime()
     },
    method: "GET",
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      if (res.statusCode == 200) {  //成功了
        callback(res.data);
        //console.log(res.data)
      }

    }
  })
}
//排行榜
function topList(callback){
  wx.request({
    url: 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg?g_tk=538', //仅为示例，并非真实的接口地址
    data: {
      g_tk: 5381,
      uin: 0,
      format: 'json',
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'h5',
      needNewCode: 1,
    },
    method: "GET",
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      if (res.statusCode == 200) {  //成功了
        callback(res.data);
      }

    }
  })
}
//详细排行榜
function topListDetail(id,callback){
  wx.request({
    url: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg', //仅为示例，并非真实的接口地址
    data: {
      g_tk: 5381,
      uin: 0,
      format: 'json',
      inCharset: 'utf - 8',
      outCharset: 'utf - 8',
      notice: 0,
      platform: 'h5',
      needNewCode: 1,
      tpl: 3,
      page: 'detail',
      type: 'top',
      topid: id
    },
    method: "GET",
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
     
      if (res.statusCode == 200) {  //成功了
        callback(res.data);
        
      }
    }
  })
}
//歌词
function lyric(val, callback) {
  
  wx.request({
    url: 'http://gecimi.com/api/lyric/' + val, //仅为示例，并非真实的接口地址
    data: {

    },
    method: "GET",
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      if (res.statusCode == 200) {  //成功了
        callback(res.data);
  
      }
    }
  })
};
//热歌搜索
function hotkey(callback) {

  wx.request({
    url: 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg' , //仅为示例，并非真实的接口地址
    data: {
      format: 'json',
      inCharset: 'utf - 8'
    },
    method: "GET",
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      if (res.statusCode == 200) {  //成功了
        callback(res.data);
      
      }
    }
  })
};
//搜索结果
function searchResult(val,index,callback){
  wx.request({
    url: 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp', //仅为示例，并非真实的接口地址
    data: {
      g_tk: 5381,
      uin: 0,
      format: 'json',
      inCharset: 'utf - 8',
      outCharset: 'utf - 8',
      notice: 0,  
      platform: 'h5', 
      needNewCode: 1,
      w: val,
      zhidaqu:1,
      catZhida:1,
      t:0,
      flag:1,
      ie:'utf-8',
      sem: 1,
      aggr: 0,
      perpage: 20,
      n: 20,
      p: index,
      _: new Date().getTime(),
    },
    method: "GET",
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      if (res.statusCode == 200) {  //成功了
        callback(res.data);

      }
    }
  })
};


module.exports = {
  indexResult: indexResult,  //首页的数据
  topList:topList ,           //排行榜
  topListDetail: topListDetail, //详细排行榜
  lyric: lyric,                    //歌词
  hotkey: hotkey,                       //热歌搜索
  searchResult: searchResult,      //搜索结果
  Popularsong: Popularsong         //热门歌单     
} 