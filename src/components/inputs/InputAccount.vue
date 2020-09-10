<template>
	<a-input>
		<template v-slot:prefix>
			<UserOutlined type="user" />
		</template>
	</a-input>
</template>

<script>
	import {
		UserOutlined,
	} from '@ant-design/icons-vue'
	export default{
		components:{
			UserOutlined
		}
	}
</script>

<style>
	
</style>
