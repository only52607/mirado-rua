<template>
	<a-input-password>
		<template v-slot:prefix>
			<KeyOutlined type="user" />
		</template>
	</a-input-password>
</template>

<script>
	import {
		KeyOutlined,
	} from '@ant-design/icons-vue'
	export default{
		components:{
			KeyOutlined
		}
	}
</script>

<style>
	
</style>
