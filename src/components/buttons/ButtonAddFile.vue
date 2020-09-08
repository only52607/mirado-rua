<template>
	<a-button>
		<FileAddOutlined v-slot:icon />{{text}}
	</a-button>
</template>

<script>
	import {FileAddOutlined} from '@ant-design/icons-vue'
	export default{
		props:{
			text:String
		},
		components:{
			FileAddOutlined
		}
	}
</script>

<style>
</style>
