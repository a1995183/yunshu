// pages/myStudy/myStudy.js
import {fetch}from "../../utils/util.js"
const app = getApp()
Page({

  data: {
myBooks:[],
    bookTitles:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getCollectonBooks();
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
      fetch.get('/readList').then(res => {
        resolve();
        console.log(res)
        this.setData({
          myBooks: res.data
        })
      
        this.setlooknums() 
      }).catch(err => {
        reject()
      })
    })
  },
  setlooknums(){
    let thebooks = this.data.myBooks;
    thebooks.map((item, index) => {
      let num = item.title.index / item.title.total*100
      var date1 = new Date(item.createdTime);
      var date2=new Date();
      var time1 = date1.getTime();
      var tim2=date2.getTime();
      var thidayTime="分钟前";
      var theTime = parseInt((tim2 - time1) / 60000)
      if (theTime > 60) {
        theTime =parseInt(theTime/60)
  thidayTime="小时前"}
      if (theTime > 24) {
        theTime = parseInt(theTime / 24)
        thidayTime ="天前"
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
    console.log(event)
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})