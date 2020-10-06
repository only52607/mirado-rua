<template>
	<a-page-header :title="bot.nick" :sub-title="bot.id" backIcon=false :avatar="{src:bot.avatarUrl}">
		<template v-slot:extra>
			<a-button type="danger" @click="unlogin" :loading = "isUnlogining">
				退出登录
			</a-button>
		</template>
	</a-page-header>
</template>

<script>
	import { getCurrentInstance,reactive,ref,watchEffect,computed } from 'vue'
	export default {
		setup(){
			const {ctx} = getCurrentInstance()
			const bots = ctx.$botStore.injectBots()
			const bot = computed(()=>{
				const filterBots = bots.filter(item=>{
					return item.id == id
				})
				return filterBots[0]
			})
			const botId = ref(0)
			const isUnlogining = ref(false)
			async function unlogin(){
				isUnlogining.value = true
				try{
					await ctx.$api.delete("/bots/" + botId.value)
					ctx.$message.success('已退出')
					ctx.$botStore.updateBots()
					ctx.$router.replace("/console")
				}catch(err){
					this.$message.error('退出失败！' + err.checkData())
				}
				unlogining.value = false
			}
			return {
				bot,
				botId,
				isUnlogining,
				unlogin
			}
		},
		onMounted() {
			this.botId.value = this.$route.params.id
		},
		watch:{
			$route(to, from) {
				this.botId.value = to.params.id
			}
		},
	}
</script>

<style>
</style>
