<template>
	<a-button>
		<DeleteOutlined v-slot:icon />{{text}}
	</a-button>
</template>

<script>
	import {DeleteOutlined} from '@ant-design/icons-vue'
	export default{
		props:{
			text:String
		},
		components:{
			DeleteOutlined
		}
	}
</script>

<style>
</style>
