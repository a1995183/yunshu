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
  },
  handleCollect(){
    fetch.post('/collection',{
      bookId:this.data.bookId
    }).then(res=>{
      if(res.code==200){
        wx.showToast({
          title:"收藏成功",
          icon:'success',
          duration:1000
        })
        let bookData={...this.data.bookData}
        bookData.isCollect=1
        this.setData({
          bookData:bookData
        })
      }else{
        let arr=[this.data.bookId];
        console.log(arr)
        fetch.post('/collection/delete', {arr}).then(res =>{
         wx.showToast({
           title: "取消收藏",
           icon: 'loading',
           duration: 1000
         })
           let bookData = { ...this.data.bookData }
         bookData.isCollect = 0
         this.setData({
           bookData: bookData
         })
         })
     
      }
    })

  },
  onShareAppMessage:function(){
    return{
      title:this.data.bookData.data.title,
      path: `/pages/details/details?id=${this.data.bookId}`,
      imageUrl:this.data.bookData.data.img
    }
  }


})