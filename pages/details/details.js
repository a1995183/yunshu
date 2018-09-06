// pages/details/details.js
import {fetch} from '../../utils/util.js'
Page({
  data: {
bookId:"",
bookData:{},
isLoading:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  this.setData({
    bookId:options.id
  })
  this.getData()
  },
  getData(){
    this.setData({ isLoading: true}),
    fetch.get(`/book/${this.data.bookId}`).then(res=>{
      this.setData({
        bookData:res,
        isLoading:false
      })
    }).catch(err=>{
      isLoading:false
    })
  },
  jumpCatalog(){
wx.navigateTo({
  url:`/pages/catalog/catalog?id=${this.data.bookId}`
})
  }
})