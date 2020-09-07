import {
	createRouter,
	createWebHistory
} from 'vue-router'

const routes = [{
		path: '/',
		name: 'home',
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
				name: 'console',
				component: () => import('../views/Console.vue'),
			},
			{
				path: 'bots/:id',
				name: 'bots',
				component: () => import('../views/Bot.vue'),
			},
			{
				path: 'newbot',
				name: 'newbot',
				component: () => import('../views/CreateBot.vue'),
			},
			{
				path: 'scripts',
				name: 'scripts',
				component: () => import('../views/Scripts.vue'),
			},
			{
				path: 'editor/:name',
				name: 'editor',
				component: () => import('../views/FileEditor.vue'),
			},
			{
				path: 'server',
				name: 'server',
				component: () => import('../views/Server.vue'),
			},
		]
	},
	{
		path: '/auth',
		name: "auth",
		component: () => import('../views/Auth.vue')
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
