import {request,request1} from './request';
export function getHomeMultidata() {
   return  request({
     url:'/home/multidata',
     method:'get'
   })
}
export function getHomeGoods(type, page) {
  return request1({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}
