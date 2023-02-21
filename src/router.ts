import { createRouter, createWebHistory} from 'vue-router'
import { useMainStore } from './store'

const routerHistory = createWebHistory()
// 创建路由
const router = createRouter({
  history: routerHistory,
  routes:[
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
      meta: {redirectAlreadyLogin: true}
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('./views/Signup.vue')
    },
    {
      path: '/column/:id',
      name: 'column',
      component: () => import('./views/ColumnDetail.vue')
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('./views/CreatePost.vue'),
      meta: { requiredLogin: true}
    },
    {
      path: '/post/:postId',
      name: 'post',
      component: () => import('./views/PostDetail.vue')
    },
  ]
})
// 路由守卫
router.beforeEach((to, from, next) => {
  const mainStore = useMainStore()
  if(to.meta.requiredLogin && !mainStore.user.isLogin) {
    next({name: 'login'})
  } else if(to.meta.redirectAlreadyLogin && mainStore.user.isLogin) { // 已经登录，且跳转到登录页 就重定向到首页
    next('/')
  } else {
    next()
  }
})

export default router