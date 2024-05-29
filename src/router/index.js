import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import GraceView from '../views/MyGrace.vue'
import GraceView from '../views/Apitest1.vue'
//import JimmyView from '../views/MyJimmy.vue'
import JimmyView from '../views/MyTable.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/grace',
      name: 'GraceView',
      component: GraceView
    },
    {
      path: '/jimmy',
      name: 'JimmyView',
      component: JimmyView
    },

  
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
