const baseUrl="https://m.yaojunrong.com"
const fetch={
  http(url,method,data){
    return new Promise((resolve,reject)=>{
      let token=wx.getStorageSync('token')
let header={
  'content-type':'application/json'
      }
      if(token){
        header.token=token
      }
      wx.request({
        url: baseUrl + url,
        data,
        method,
        header,
        //不使用contentType: “application/json”则data可以是对象
        //使用contentType: “application/json”则data只能是json字符串
        success(res) {
resolve(res.data)
if(res.header.Token){
  wx.setStorageSync('token',res.header.Token)
}
        },
        fail(err) {
reject(err)
        }
      })
    })
  },
  get(url,data){
return this.http(url,'GET',data)
  },
  post(url,data){
  return this.http(url,'POST',data)
  },
  del(url,data){
    return this.http(url,'DEL',data)
  }
}
const login=()=>{
  wx.login({
    success(res){
      fetch.post('/login',{
        code:res.code,
        appid:"wxf270f37749a87d1c",       secret:"8a0f8e11654cef4332df114c0d40c91d"
      }).then(res=>{
      })
    }
  })
}

exports.fetch=fetch;
exports.login=login;