import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: ()=>import('../views/Home.vue')
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
