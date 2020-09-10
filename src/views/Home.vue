<template>
	<a-layout id="main">
		<AffixHeader @more="topDrawervisible=!topDrawervisible" />
		<a-layout>

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
	
	import {logStore} from '@/utils/logStore.js'
	
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
			eb.onopen = ()=>{
				eb.registerHandler("log", function(err, msg) {
					logStore.pushLog(msg.body)
				})
			}
		},
		data() {
			return {
				topDrawervisible: false,
				selectedNavKeys: []
			}
		},
		watch: {
			selectedNavKeys(keys) {
				this.$router.replace(keys[0])
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
