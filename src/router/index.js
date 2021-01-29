import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component:  () => import('../views/home/Home')
  },
   {
    path: '/category',
    component:  () => import('../views/category/Category')
  },
  {
    path: '/cart',
    component:  () => import('../views/cart/Cart')
  },
  {
    path: '/profile',
    component:  () => import('../views/profile/Profile')
  },{
    path: '/detail/:id',
    name:"detail",
    component:  () => import('../views/detail/Detail')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
