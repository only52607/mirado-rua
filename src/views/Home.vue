<template>
	<a-layout id="main">
		<AffixHeader @more="isTopDrawerVisible=!isTopDrawerVisible" />
		<a-layout>
			<a-modal v-model:visible="captchaModelVisible" title="请输入验证码" @ok="handleCaptcha" @cancel="handleCaptcha">
				<img :src="captchaSrc" />
				<a-input v-model:value="captchaResult" />
			</a-modal>

			<AffixSider :offset-top=85 width="200">
				<NavMenu v-model:selectedKeys="selectedNavKeys" @select="$router.replace(selectedNavKeys[0])" :bots="bots" />
			</AffixSider>

			<TopDrawer v-model:visible="isTopDrawerVisible" title="菜单">
				<NavMenu v-model:selectedKeys="selectedNavKeys" @select="$router.replace(selectedNavKeys[0])" :bots="bots" />
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

	import { getCurrentInstance,reactive,ref,watchEffect,computed,onMounted } from 'vue'
	
	export default {
		components: {
			AffixHeader,
			NavMenu,
			AffixSider,
			TopDrawer
		},
		setup(){
			const {ctx} = getCurrentInstance()
			const isTopDrawerVisible = ref(false)
			const selectedNavKeys = reactive([])
			const captchaSrc = ref("")
			const captchaResult = ref("")
			const captchaModelVisible = ref(false)
			async function handleCaptcha() {
				ctx.$api.post("/bots/"+ ctx.$botStore.recentBotId.value +"/captchaResult", {result: captchaResult.value})
				captchaModelVisible.value = false
			}
			onMounted(async ()=>{
				selectedNavKeys.push(ctx.$router.currentRoute.value.fullPath)
				ctx.$eventBus.onopen = () => {
					ctx.$eventBus.registerHandler("sockJs.bot.log", (err, msg) => {
						ctx.$logStore.pushLog(msg.body)
					})
					ctx.$eventBus.registerHandler("sockJs.bot.loginSolver", (err, msg) => {
						captchaModelVisible.value = true
						if (msg.body.type == "PicCaptcha") {
							captchaSrc.value = "data:image/bmp;base64," + msg.body.data
						}
					})
				}
				try{
					await ctx.$api.get('/auth')
				}catch(err){
					if(err.response) ctx.$router.replace("/auth")
					else ctx.$message.error('连接服务器失败！', 2)
				}
				ctx.$botStore.updateBots()
			})
			return {
				isTopDrawerVisible,
				selectedNavKeys,
				captchaSrc,
				captchaResult,
				captchaModelVisible,
				handleCaptcha,
				bots:ctx.$botStore.bots
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
