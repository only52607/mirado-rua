<template>
	<a-menu mode="inline" v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys" :style="{ height: '100%', borderRight: 0 }">
		<a-menu-item key="/console">
			<CodeOutlined />
			<span>控制台</span>
		</a-menu-item>
		<a-sub-menu key="Bots">
			<template v-slot:title>
				<span>
					<UserOutlined />Bot</span>
			</template>
			<a-menu-item v-for="(bot,index) in bots" :key="'/bots/' + bot.id">{{bot.nick}}</a-menu-item>
			<a-menu-item key="/newbot">
				<PlusCircleOutlined />创建Bot</a-menu-item>
		</a-sub-menu>
		<a-menu-item key="/scripts">
			<AppstoreOutlined />
			<span>脚本</span>
		</a-menu-item>
		<a-menu-item key="/server">
			<ControlOutlined />
			<span>管理</span>
		</a-menu-item>
	</a-menu>
	
	
</template>

<script>
	import {
		CodeOutlined,
		UserOutlined,
		PlusCircleOutlined,
		AppstoreOutlined,
		ControlOutlined
	} from '@ant-design/icons-vue'
	
	function fetchBots() {
		return [{
				id: 2308065470,
				nick: "OOOOONLY",
				avatarUrl: "https://c-ssl.duitang.com/uploads/item/202003/28/20200328111842_ijsbv.thumb.1000_0.jpg",
				protocol: "ANDROID_WATCH"
			},
			{
				id: 2912775665,
				nick: "Appoint",
				avatarUrl: "https://c-ssl.duitang.com/uploads/item/202003/28/20200328111842_ijsbv.thumb.1000_0.jpg",
				protocol: "ANDROID_WATCH"
			}
		]
	}
	
	export default{
		components:{
			CodeOutlined,
			UserOutlined,
			PlusCircleOutlined,
			AppstoreOutlined,
			ControlOutlined
		},
		data() {
			return {
				selectedKeys: [],
				collapsed: false,
				openKeys: [],
				bots: null
			};
		},
		watch: {
			selectedKeys(k) {
				this.$router.replace(k[0])
			}
		},
		mounted() {
			this.bots = fetchBots()
			this.selectedKeys = ["/console"]
		}
	}
	
</script>

<style>
</style>
