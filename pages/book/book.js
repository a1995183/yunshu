import { fetch } from '../../utils/util.js'
const app=getApp();
Page({
  data: {
    titleId: "",
    title: "",
    bookId: "",
    catalog: [],
    isShow: false,
    isLoading:false
  },
  onLoad: function (options) {
    this.setData({
      titleId: options.id,
      bookId: options.bookId,
      isLoading:true
    })
    this.getData()
    this.getCatalog()
  },
  getData() {
    fetch.get(`/article/${this.data.titleId}`)
      .then(res => {
        let data = app.towxml.toJson(res.data.article.content, 'markdown');
        this.setData({
          article: data,
          title: res.data.title
        })
      })
  },
  getCatalog() {
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
  onShareAppMessage: function () {

  }
})