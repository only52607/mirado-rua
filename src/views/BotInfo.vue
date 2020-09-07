<template>
	<a-page-header :title="bot.nick" :sub-title="bot.id" backIcon=false :avatar="{src:bot.avatarUrl}">
		<template v-slot:extra>
			<a-button type="danger">
				退出登录
			</a-button>
		</template>
	</a-page-header>
</template>

<script>
	function fetchBot(id) {
		return {
				id: id,
				nick: "OOOOONLY",
				avatarUrl: "https://c-ssl.duitang.com/uploads/item/202003/28/20200328111842_ijsbv.thumb.1000_0.jpg",
				protocol: "ANDROID_WATCH"
		}
	}
	export default {
		data() {
			return {
				bot:{}
			}
		},
		mounted() {
			this.bot = fetchBot(this.$route.params.id)
		},
		watch:{
			$route(to, from) {
				this.bot = fetchBot(to.params.id)
			}
		}
	}
</script>

<style>
</style>
