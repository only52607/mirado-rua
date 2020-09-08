<template>
	<a-button>
		<ReloadOutlined v-slot:icon />{{text}}
	</a-button>
</template>

<script>
	import {ReloadOutlined} from '@ant-design/icons-vue'
	export default{
		props:{
			text:String
		},
		components:{
			ReloadOutlined
		}
	}
</script>

<style>
</style>
