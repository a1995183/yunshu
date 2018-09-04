// pages/details/details.js
import {fetch} from '../../utils/util.js'
Page({
  data: {
bookId:"",
bookData:{}
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
    fetch.get(`/book/${this.data.bookId}`).then(res=>{
      console.log(res)
      this.setData({
        bookData:res
      })
    })
  },
  jumpCatalog(){
wx.navigateTo({
  url:`/pages/catalog/catalog?id=${this.data.bookId}`
})
  }
})