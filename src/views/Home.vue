<template>
	<a-layout id="main">
		<AffixHeader @more="visible=!visible" />
		<a-layout>
			<a-affix :offset-top=85 class="menu-left">
				<a-layout-sider width="200" class="white-background">
					<NavMenu />
				</a-layout-sider>
			</a-affix>

			<a-drawer title="菜单" placement="top" closable="true" v-model:visible="visible" :get-container="false" class="menu-top">
				<NavMenu />
			</a-drawer>

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
	import NavMenu from '@/components/NavMenu.vue'

	export default {
		components: {
			AffixHeader,
			NavMenu
		},
		mounted() {
			api.get('/auth').catch(
				err => {
					this.$router.replace("/auth")
				}
			)
		},
		data() {
			return {
				visible: false
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
