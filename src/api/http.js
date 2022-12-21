import axios from 'axios'
// 基础配置
const ins = axios.create({
  timeout: 60000
})

// 请求拦截
ins.interceptors.request.use(
  (config) => {
    // 在请求头中设置新属性token，参数为我们的token ，实现每次请求都会在请求头中携带token
    // config.headers.common.token = localStorage.getItem('token') || ''
    return config
  },
  (error) => {
    console.log(error, '上市时')
    return Promise.reject(error)
  }
)

// 响应拦截
ins.interceptors.response.use(
  (response) => {
    if (response.data.code === '10119') {
      window.location.href = window.location.href.split('#')[0] + '#/login'
      window.location.reload()
    }
    return response.data
  },
  (error) => {
    console.log(error);
    // return Promise.reject(error)
  }
)

function request(config) {
  let { url, data, method, headers } = config
  url = url || ''
  data = data || {}
  method = method || 'GET'
  headers = headers || ''
  // restful api  GET / POST /PUT/PATCH/DELETE
  switch (method.toUpperCase()) {
    case 'GET':
      return ins.get(url, { params: data })
    case 'POST':
      if (headers['content-type'] === 'application/x-www-form-url-encoded') {
        // 转参数 URLSearchParams/第三方库qs
        const p = new URLSearchParams()
        for (let key in data) {
          p.append(key, data[key])
        }
        return ins.post(url, p, { headers })
      }
      if (headers['content-type'] === 'multipart/form-data') {
        const p = new FormData()
        for (let key in data) {
          p.append(key, data[key])
        }
        return ins.post(url, p, { headers })
      }
      return ins.post(url, data)
    case 'PUT':
      return ins.put(url, data)
    case 'PATCH':
      return ins.patch(url, data)
    case 'DELETE':
      return ins.delete(url, { data })
    default:
      return ins(config)
  }
}

export default request
