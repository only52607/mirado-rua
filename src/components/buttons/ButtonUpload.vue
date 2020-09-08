<template>
	<a-button>
		<UploadOutlined v-slot:icon />{{text}}
	</a-button>
</template>

<script>
	import {UploadOutlined} from '@ant-design/icons-vue'
	export default{
		props:{
			text:String
		},
		components:{
			UploadOutlined
		}
	}
</script>

<style>
</style>
