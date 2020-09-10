<template>
	<a-page-header :title="bot.nick" :sub-title="bot.id" backIcon=false :avatar="{src:bot.avatarUrl}">
		<template v-slot:extra>
			<a-button type="danger" @click="unlogin" :loading = "unlogining">
				退出登录
			</a-button>
		</template>
	</a-page-header>
</template>

<script>
	import {bots,updateBots} from '@/utils/bots.js'
	
	export default {
		data() {
			return {
				bot:{},
				unlogining:false
			}
		},
		mounted() {
			if(bots.length == 0){
				updateBots().then(bots=>{
					this.bot = this.fetchBot(this.$route.params.id)
				})
			}else{
				this.bot = this.fetchBot(this.$route.params.id)
			}
		},
		watch:{
			$route(to, from) {
				this.bot = this.fetchBot(to.params.id)
			}
		},
		methods:{
			unlogin(){
				this.unlogining = true
				api.delete("/bots/"+this.bot.id).then(response=>{
					this.$message.success('已退出')
					updateBots()
					this.$router.replace("/console")
				}).catch(err=>{
					this.$message.error('退出失败！')
					this.unlogining = false
				})
			},
			fetchBot(id) {
				let b = bots.filter(item=>{
					return item.id == id
				})
				console.log(b)
				if (b.length == 0){
					this.$message.error('不存在此bot！')
					this.$router.replace("/console")
					return {id: 0,nick: "",avatarUrl: "",protocol: ""}
				}else{
					return b[0]
				}
			}
		}
	}
</script>

<style>
</style>
