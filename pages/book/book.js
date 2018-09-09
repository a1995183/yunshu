import { fetch } from '../../utils/util.js'
// const app=getApp();
Page({
  data: {
    titleId: "",
    title: "",
    bookId: "",
    catalog: [],
    isShow: false,
    isLoading:false,
    index:"",
    font:40
  },
  onLoad: function (options) {
    this.setData({
      titleId: options.id,
      bookId: options.bookId,
  
    }),
    this.getData()
    this.getCatalog()
  },
  getData() {
    this.setData({ isLoading: true,
      isShow: false}),
    fetch.get(`/article/${this.data.titleId}`)
      .then(res => {
        this.setData({
          article: res.data.article.content,
          title: res.data.title,
          isLoading:false,
          index: res.data.article.index
        })
        wx: wx.setNavigationBarTitle({
          title: this.data.title,
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      }).catch(err=>{
        this.setData({
          isLoading:false
        })
      })
  },
  getCatalog() {
     this.setData({ isLoading: true}),
    fetch.get(`/titles/${this.data.bookId}`).then(res => {
      this.setData({
        catalog: res.data,
        isLoading:false
      })
    })
  },
  toggleCatalog() {
    let isShow = !this.data.isShow
    this.setData({
      isShow
    })
  },
  handleGet(event) {
    const id = event.currentTarget.dataset.id
    this.setData({
      titleId: id
    })
    this.getData()
  },
  handlePrev(){
let catalog=this.data.catalog
if(this.data.index-1<1){
  wx.showToast({
    title:"已是第一章了"
  })
  }else{
    this.setData({
      titleId:catalog[this.data.index-1]._id
    })
    this.getData();
  }},
  handleNext(){
    let catalog=this.data.catalog
    if(catalog[this.data.index+1]){
      this.setData({
        titleId:catalog[this.data.index+1]._id
      })
      this.getData()
    }else{
      wx.showToast({
        title:"已是最后于一章"
      })
    }
  },
  handleAdd(){
this.setData({
font:this.data.font+2
})
  },
  handleRuduce(){
if(this.data.font<=24){
  wx.showModal({
    title:"提示",
    content:"字体太小影响视力哦",
    showCancel:false
  })
}else{
  this.setData({
    font:this.data.font-2
  })
}
  },

  onShareAppMessage: function () {

  }
})