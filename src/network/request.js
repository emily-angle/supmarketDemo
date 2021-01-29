import axios from "axios"

//请求实例1
export function request(config) {

    const service = axios.create({
      baseURL: 'http://123.207.32.32:8000',
      timeout: 5000
        // withCredentials: true
    })
    //请求拦截
    service.interceptors.request.use((config) => {
        return config
    }, () => {
        // return  Promise.reject(error)
    })
    //响应拦截
    service.interceptors.response.use((result) => {
        if(result.data.returnCode==='SUCCESS'){
            return result.data.data
        }else{
            // return  Promise.reject(result.data.message)
        }
    }, () => {

    })
  return service(config)
}
export function request1(config){

  const service = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
    // withCredentials: true
  })
  //请求拦截
  service.interceptors.request.use((config) => {
    return config
  }, () => {
    // return  Promise.reject(error)
  })
  //响应拦截
  service.interceptors.response.use((result) => {
    if(result.data.success){
      return result.data.data
    }else{
      // return  Promise.reject(result.data.message)
    }
  }, () => {

  })
  return service(config)
}
export function request3(config){

  const service = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
    // withCredentials: true
  })
  //请求拦截
  service.interceptors.request.use((config) => {
    return config
  }, () => {
    // return  Promise.reject(error)
  })
  //响应拦截
  service.interceptors.response.use((result) => {
    if(result.status===200){
      return result.data
    }
  }, () => {

  })
  return service(config)
}
