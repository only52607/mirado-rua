<template>
	<a-layout id="components-layout-demo-top-side-2" class="body">
		<a-affix :offset-top=0>
			<a-layout-header class="header" ref="topHeader">
				<div class="logo">
					<DingtalkOutlined /> MIRADO - RUA
				</div>
			</a-layout-header>
		</a-affix>
		<a-layout>
			<a-affix :offset-top=85>
				<a-layout-sider width="200" style="background: #fff">
					<a-menu mode="inline" v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys" :style="{ height: '100%', borderRight: 0 }">
						<a-menu-item key="Console">
							<CodeOutlined />
							<span>控制台</span>
						</a-menu-item>
						<a-sub-menu key="Bots">
							<template v-slot:title>
								<span>
									<user-outlined />Bot</span>
							</template>
							
							<template v-for="(bot,index) in bots" :key="index">
								<a-menu-item >{{bot.nick}}</a-menu-item>
							</template>
							
							<a-menu-item key="CreateBot">
								<PlusCircleOutlined />创建Bot</a-menu-item>
						</a-sub-menu>
						<a-menu-item key="Scripts">
							<AppstoreOutlined />
							<span>脚本</span>
						</a-menu-item>
						<a-menu-item key="ServerInfo">
							<ControlOutlined />
							<span>管理</span>
						</a-menu-item>
					</a-menu>
				</a-layout-sider>
			</a-affix>

			<a-layout style="padding: 0 0px 0px">
				<a-layout-content :style="{ background: '#fff', padding: '24px', margin: '20px', minHeight: '280px' }">
					<keep-alive>
						<component :is="content" v-bind="contentProps" />
					</keep-alive>
				</a-layout-content>
			</a-layout>
		</a-layout>

	</a-layout>




</template>
<script>
	import {
		DesktopOutlined,
		UserOutlined,
		LaptopOutlined,
		NotificationOutlined,
		DingtalkOutlined,
		PlusCircleOutlined,
		AppstoreOutlined,
		ControlOutlined,
		CodeOutlined
	} from '@ant-design/icons-vue';

	import CreateBot from '@/views/CreateBot.vue'
	import Console from '@/views/Console.vue'
	import BotInfo from '@/views/BotInfo.vue'
	import Scripts from '@/views/Scripts.vue'
	import ServerInfo from '@/views/ServerInfo.vue'

	function fetchBots() {
		return [{
			id: 2308065470,
			nick: "OOOOONLY",
			avatarUrl: "https://c-ssl.duitang.com/uploads/item/202003/28/20200328111842_ijsbv.thumb.1000_0.jpg",
			protocol:"ANDROID_WATCH"
		}]
	}

	export default {
		components: {
			UserOutlined,
			LaptopOutlined,
			NotificationOutlined,
			DingtalkOutlined,
			PlusCircleOutlined,
			AppstoreOutlined,
			ControlOutlined,
			CodeOutlined,
			CreateBot,
			Console,
			BotInfo,
			Scripts,
			ServerInfo
		},
		data() {
			return {
				selectedKeys: [],
				collapsed: false,
				openKeys: [],
				content: "Console",
				slideTop: 0,
				bots: null,
				contentProps:null
				
			};
		},
		watch: {
			selectedKeys(k) {
				if (typeof(k[0])=="number"){
					this.content = "BotInfo"
					this.contentProps = {
						bot: this.bots[k[0]]
					}
					return
				}
				this.content = k[0]
				switch(k[0]){
					case "Console":
						this.contentProps = {
							bots: this.bots
						}
						break;
				}
				
			}
		},
		mounted() {
			// if (true){
			// 	this.$router.replace("/auth")
			// }
			this.bots = fetchBots()
			this.selectedKeys = ["Console"]
		}
	};
</script>

<style>
	#components-layout-demo-top-side-2 .logo {
		width: 200px;
		height: 31px;
		/* background: rgba(255, 255, 255, 0.2); */
		/* margin: 16px 28px 16px 0; */
		float: left;
		color: aliceblue;
		font-size: 18px
	}
	.body{
		 height: 100%; 
		 width: 100%;
	}
</style>
