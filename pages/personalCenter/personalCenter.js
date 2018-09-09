// pages/personalCenter/personalCenter.js
import { fetch } from "../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookNum: 0,
    pn:1,
    // size:,
    myBooks:[],
    userinfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  this.getCollectonBooks();
  wx.getUserInfo({
    success:(data)=>{
      this.setData({
        userinfo:data.userInfo
      })
    }
  })
  },
getColnNum(){
  return new Promise((resolve,reject)=>{
    fetch.get('/collection',{
      pn:this.data.pn,size:this.data.size
    }).then(res=>{
      resolve();
  
    this.setData({
    })
    }).catch(err=>{
      reject()
    })
  })
},
  getCollectonBooks() {
    return new Promise((resolve, reject) => {
      fetch.get('/collection', {
        pn: this.data.pn, 
        // size: this.data.size
      }).then(res => {
        resolve();
        this.setData({
          myBooks: res.data
        })
      }).catch(err => {
        reject()
      })
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
  onPullDownRefresh() {//下拉刷新函数
    this.getCollectonBooks();
    wx.stopPullDownRefresh()//停止刷新

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