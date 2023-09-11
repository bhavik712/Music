import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const routes = [
  {
    name: 'home',
    path: '/',
    component: HomeView
  },
  {
    name: 'about',
    path: '/about',
    component: () => import('@/views/AboutView.vue')
  },
  {
    name: 'authentication',
    path: '/authentication',
    component: () => import('@/components/UserAuthentication.vue')
  },
  {
    name: 'song',
    path: '/song/:id',
    component: () => import('@/views/SongPage.vue')
  },
  {
    name: 'manage',
    // alias: '/manage',
    path: '/manage-music',
    component: () => import('@/views/ManageView.vue')
    // can check the condition here
    // beforeEnter: (to, from, next) => {
    //   console.log(to, from)
    //   next()
    // }
  }
  // {
  //   path: '/manage',
  //   redirect: { name: 'manage' }
  // },
  // {
  //   path: '/:catchAll(.*)*',
  //   redirect: { name: 'home' }
  // }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500'
})
// global router function - condition will apply to all router
// router.beforeEach((to, from, next) => {
//   console.log(to, from)
//   next()
// })

export default router
