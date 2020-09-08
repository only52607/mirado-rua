<template>
	<a-button>
		<SaveOutlined v-slot:icon />{{text}}
	</a-button>
</template>

<script>
	import {SaveOutlined} from '@ant-design/icons-vue'
	export default{
		props:{
			text:String
		},
		components:{
			SaveOutlined
		}
	}
</script>

<style>
</style>
