import {
	createRouter,
	createWebHistory
} from 'vue-router'

const routes = [{
		path: '/',
		name: 'Home',
		component: () => import('../views/Home.vue'),
		beforeEnter: (to, from, next) => {
			if (false) {
				next("/auth")
			} else {
				next()
			}
		},
		children: [
			{
				path: 'console',
				name: 'Console',
				component: () => import('../views/Console.vue'),
			},
			{
				path: 'bots/:id',
				name: 'BotInfo',
				component: () => import('../views/BotInfo.vue'),
			},
			{
				path: 'newbot',
				name: 'CreateBot',
				component: () => import('../views/CreateBot.vue'),
			},
			{
				path: 'scripts',
				name: 'Scripts',
				component: () => import('../views/Scripts.vue'),
			},
			{
				path: 'server',
				name: 'Server',
				component: () => import('../views/ServerInfo.vue'),
			},
		]
	},
	{
		path: '/auth',
		name: "Auth",
		component: () => import('../views/Auth.vue')
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
