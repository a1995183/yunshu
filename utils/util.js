const baseUrl="https://m.yaojunrong.com"
const fetch={
  http(url,method,data){
    return new Promise((resolve,reject)=>{
      wx.request({
        url: baseUrl + url,
        data,
        method,
        header: {
          'content-type': 'application/json'
        },
        //不使用contentType: “application/json”则data可以是对象
        //使用contentType: “application/json”则data只能是json字符串
        success(res) {
resolve(res.data)
        },
        fail(err) {
reject(err)
        }
      })
    })
  },
  get(url,data){
return this.http(url,'GET',data)
  }
}
exports.fetch=fetch;