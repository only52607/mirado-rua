import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'Console',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Console.vue')
  },
  {
	  path:'/anttest',
	  name:"AntTest",
	  component:()=>import('../views/AntTest.vue')
  },
  {
  	  path:'/nav',
  	  name:"NavView",
  	  component:()=>import('../views/NavView.vue')
  },
  {
  	  path:'/auth',
  	  name:"Auth",
  	  component:()=>import('../views/Auth.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
