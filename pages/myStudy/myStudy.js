// pages/myStudy/myStudy.js
import {fetch}from "../../utils/util.js"
const app = getApp()
Page({

  data: {
myBooks:[],
    bookTitles:[],
    isLoading:false,
    pn: 1,//页数默认一页四本书
    size:4,
    hasMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getCollectonBooks();
    this.setData({
      isLoading:true 
    })
    this.getReadList();
   
  },
  getCollectonBooks() {
    return new Promise((resolve, reject) => {
      fetch.get('/collection', {
        pn: this.data.pn, size: this.data.size
      }).then(res => {
        resolve();
        this.setData({
          myBooks:res.data
        })
      }).catch(err => {
        reject()
      })
    })
  },
  getReadList() {
    return new Promise((resolve, reject) => {
      fetch.get('/readList',{
        pn: this.data.pn,//页数默认一页四本书
        size: 4,
      }).then(res => {
        resolve();
    
        this.setData({
          myBooks: res.data,
          isLoading:false,
          
        })
        this.setlooknums() 
      
     
      }).catch(err => {
        reject()
      })
    })
  },
  getMoreReadBook(){
    return fetch.get('/readList', {
      pn: this.data.pn,//页数默认一页四本书
      size: 4
    })
  },
  setlooknums(){
    let thebooks = this.data.myBooks;
    thebooks.map((item, index) => {
      let num = item.title.index / item.title.total*100
      var date1 = new Date(item.updatedTime);
      var date2=new Date();
      var time1 = date1.getTime();
      var tim2=date2.getTime();
      var thidayTime="秒前";
      var theTime = parseInt((tim2 - time1) / 1000)

      if (theTime > 60) {
        theTime = parseInt(theTime / 60)
      thidayTime="分钟前"
        if (theTime > 60) {
          theTime = parseInt(theTime / 60)
          thidayTime = "小时前"
          if (theTime > 24) {
            theTime = parseInt(theTime / 24)
            thidayTime = "天前"
          }
        }
      }
      item.book.theTime = theTime + thidayTime
      item.book.setTheNum=parseInt(num)
     return this.setData({
       myBooks: thebooks
      })

      })

  },
  jumpBook(event) {
    const id = event.currentTarget.dataset.id
   
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`
    })
  },
  onPullDownRefresh() {//下拉刷新函数
    this.setData({
      isLoading: true,
      hasMore: true,
      pn:1
    })
    this.getReadList();
      wx.stopPullDownRefresh()//停止刷新
   
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {//上拉触底函数
    if (this.data.hasMore) {
      this.setData({
        pn: this.data.pn + 1
      })
      this.getMoreReadBook().then(res=>{
        let newArr = [...this.data.myBooks, ...res.data] 
        console.log(newArr)
        this.setData({
          myBooks: newArr
        })
        if (res.data.length < 2) {
          this.setData({ hasMore: false })
        }
      }

      )
  }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})