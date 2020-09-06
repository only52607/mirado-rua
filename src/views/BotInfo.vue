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
	export default {
		props: {
			bot: Object
		}
	}
</script>

<style>
</style>
