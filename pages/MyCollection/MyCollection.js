// pages/personalCenter/personalCenter.js
import { fetch } from "../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookNum: 0,
    pn: 1,
    // size: 2,
    myBooks: [],
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCollectonBooks();
    wx.getUserInfo({
      success: (data) => {
        this.setData({
          userinfo: data.userInfo
        })
        console.log(data.userInfo)
      }
    })
  },
  jumpBook(event) {
    const id = event.currentTarget.dataset.id
    console.log(event)
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`
    })
  },
  getColnNum() {
    return new Promise((resolve, reject) => {
      fetch.get('/collection', {
        pn: this.data.pn, size: this.data.size
      }).then(res => {
        resolve();
        console.log(res)
        this.setData({
        })
      }).catch(err => {
        reject()
      })
    })
  },
  getCollectonBooks() {
    return new Promise((resolve, reject) => {
      fetch.get('/collection', {
        pn: this.data.pn,
        //  size: this.data.size
      }).then(res => {
        resolve();
        console.log(res)
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