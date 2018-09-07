//index.js
//获取应用实例
import {fetch,login}from "../../utils/util.js"
const app = getApp()//用途？

Page({
  data: {
    swiperData:[],
    mainContent:[],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    isLoading:false,
    pn:1,//页数默认一页四本书
    hasMore:true
  },
  onLoad() {
    login();
   this.getAllData()
  },
  getData(neadLoading=true){//得到轮播图
    return new Promise((resolve,reject)=>{
    fetch.get('/swiper').then(res=>{
      resolve();
    this.setData({
      swiperData:res.data,
    })  
    }).catch(err=>{
      reject(reject)
      })
    })
  },
  getAllData(){
    return new Promise(resolve=>{
      this.setData({
        isLoading:true
      })
 Promise.all([this.getData(),this.getContent()]).then(()=>{
   resolve()
   this.setData({
     isLoading:false,
     pn:1,
     hasMore:true
   })
 }).catch(err=>{
   this.setData({
     isLoading:false
   })
 })
    })
  },
  getContent(){//获取图书列表
    return new Promise(resolve=>{     
  fetch.get('/category/books').then(res=>{
    resolve();
    console.log(res)
    this.setData({
      mainContent:res.data
    })
  })
    })
  },
  getMoreContent(){
return fetch.get('/category/books',{
  pn:this.data.pn
})
  },
  onPullDownRefresh(){//下拉刷新函数
this.getAllData().then(()=>{
 
  wx.stopPullDownRefresh()//停止刷新
})
  },
  onReachBottom(){//上拉触底函数
    if(this.data.hasMore){
      this.setData({
        pn:this.data.pn+1
      })
      this.getMoreContent().then(res=>{
       let newArr=[...this.data.mainContent,...res.data] 
       this.setData({
         mainContent:newArr
       })
       if(res.data.length<2){
         this.setData({hasMore:false})
       }
      })
    }
  },
  jumpBook(event){
    const id = event.currentTarget.dataset.id
    console.log(event)
    wx.navigateTo({
      url:`/pages/details/details?id=${id}`
    })
  },
  onShareAppMessage: function () {
    return {
      title: "云书",
      path: `/pages/index/index`
    }
  }

})