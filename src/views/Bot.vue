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
	import { getCurrentInstance,reactive,ref,watchEffect,computed,onMounted } from 'vue'
	export default {
		setup(){
			const {ctx} = getCurrentInstance()
			const botId = ref(0)
			const isUnlogining = ref(false)
			const bot = computed(()=>{
				const filterBots = ctx.$botStore.bots.value.filter(item=>{
					return item.id == botId.value
				})
				if (filterBots.length == 0) return {nick:"",id:0,avatarUrl:""}
				return filterBots[0]
			})
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
			onMounted(()=>{
				botId.value = ctx.$router.currentRoute.value.params.id
			})
			return {
				bot,
				botId,
				isUnlogining,
				unlogin
			}
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
