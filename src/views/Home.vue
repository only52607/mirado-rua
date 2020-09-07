<template>
	<a-layout id="main">
		<AffixHeader />
		<a-layout>
			<a-affix :offset-top=85>
				<a-layout-sider width="200" class="white-background">
					<NavMenu />
				</a-layout-sider>
			</a-affix>

			<a-layout>
				<a-layout-content id="content" class="white-background">
					<keep-alive>
						<router-view> </router-view>
					</keep-alive>
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
