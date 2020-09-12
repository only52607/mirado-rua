<template>
	<a-layout id="main">
		<AffixHeader @more="topDrawervisible=!topDrawervisible" />
		<a-layout>
			<a-modal v-model:visible="captchaModelVisible" title="请输入验证码" @ok="handleCaptcha" @cancel="handleCaptcha">
				<img :src="captchaSrc" />
				<a-input v-model:value="captchaResult" />
			</a-modal>

			<AffixSider :offset-top=85 width="200">
				<NavMenu v-model:selectedKeys="selectedNavKeys" />
			</AffixSider>

			<TopDrawer v-model:visible="topDrawervisible" title="菜单">
				<NavMenu v-model:selectedKeys="selectedNavKeys" />
			</TopDrawer>

			<a-layout>
				<a-layout-content id="content" class="white-background">
					<router-view> </router-view>
				</a-layout-content>
			</a-layout>

		</a-layout>
	</a-layout>
</template>

<script>
	import AffixHeader from '@/components/AffixHeader.vue'
	import AffixSider from '@/components/AffixSider.vue'
	import NavMenu from '@/components/NavMenu.vue'
	import TopDrawer from '@/components/TopDrawer.vue'
	import {
		bots,
		updateBots
	} from '@/utils/bots.js'

	import {
		logStore
	} from '@/utils/logStore.js'

	export default {
		components: {
			AffixHeader,
			NavMenu,
			AffixSider,
			TopDrawer
		},
		mounted() {
			api.get('/auth').catch(err => {
				this.$router.replace("/auth")
				return
			})
			this.selectedNavKeys.push(this.$route.fullPath)
			updateBots()
			let eb = new EventBus("http://localhost/eb")
			let v = this
			eb.onopen = () => {
				eb.registerHandler("log", function(err, msg) {
					logStore.pushLog(msg.body)
				})
				eb.registerHandler("loginSolver", function(err, msg) {
					let jsonBody = msg.body
					let type = jsonBody.type
					v.captchaModelVisible = true
					if (type == "PicCaptcha") {
						v.captchaSrc = "data:image/bmp;base64," + jsonBody.data
					}
				})
			}
		},
		data() {
			return {
				topDrawervisible: false,
				selectedNavKeys: [],
				captchaSrc: "",
				captchaResult: "",
				captchaModelVisible:false
			}
		},
		watch: {
			selectedNavKeys(keys) {
				this.$router.replace(keys[0])
			}
		},
		methods: {
			handleCaptcha() {
				api.post("/loginSolver", {
					result: this.captchaResult
				})
				this.captchaModelVisible = false
			}
		}
	}
</script>

<style>
	#main {
		height: 100%;
		width: 100%;
	}

	.white-background {
		background: #fff;
	}

	#content {
		padding: 24px;
		margin: 20px;
		minHeight: 280px;
	}
</style>
