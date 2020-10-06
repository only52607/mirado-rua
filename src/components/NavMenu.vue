<template>
	<a-menu mode="inline" :style="{ height: '100%', borderRight: 0 }">
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
	
	export default{
		components:{
			CodeOutlined,
			UserOutlined,
			PlusCircleOutlined,
			AppstoreOutlined,
			ControlOutlined
		},
		props:{
			"bots":Array
		}
	}
</script>

<style>
</style>
