//index.js
//获取应用实例
import {fetch}from "../../utils/util.js"
const app = getApp()

Page({
  data: {
    swiperData:[],
    mainContent:[],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    isLoading:true
  },
  onLoad() {
    this.getData();
    this.getContent();
    this.setData({
      isLoading: true
    })
  },
  getData(){
  
    fetch.get('/swiper').then(res=>{
    
    this.setData({
      swiperData:res.data,
      isLoading: false,
    })  
    }).catch(err=>{
      this.setData({
        isLoading:false
      })
    })
  },
  getContent(){
  fetch.get('/category/books').then(res=>{
    console.log(res.data)
    this.setData({
      mainContent:res.data
    })
  })
  },
  jumpBook(event){
    const id = event.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url:`/pages/details/details?id=${id}`
    })
  }
})