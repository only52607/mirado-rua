<template>
	<a-button>
		<SendOutlined v-slot:icon />{{text}}
	</a-button>
</template>

<script>
	import {SendOutlined} from '@ant-design/icons-vue'
	export default{
		props:{
			text:String
		},
		components:{
			SendOutlined
		}
	}
</script>

<style>
</style>
