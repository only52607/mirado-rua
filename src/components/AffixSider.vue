<template>
	<a-affix class="menu-left">
		<a-layout-sider width="width" class="white-background">
			<slot />
		</a-layout-sider>
	</a-affix>
</template>

<script>
	export default{
		props:{
			width:String
		},
	}
</script>

<style>
	@media screen and (max-width: 960px) {
		.menu-left {
			display: none
		}
	}
	
	@media screen and (min-width: 960px) {
		.menu-left {
			display: inline-block;
			box-sizing: border-box;
			width: 200px !important
		}
	}
</style>
