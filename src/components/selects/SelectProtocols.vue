<template>
	<a-select>
		<!-- <template v-slot:menuItemSelectedIcon>
			<smile-outlined />
		</template> -->
		<a-select-option value="ANDROID_PHONE"> Android Phone </a-select-option>
		<a-select-option value="ANDROID_PAD"> Android Pad </a-select-option>
		<a-select-option value="ANDROID_WATCH"> Android Watch </a-select-option>
	</a-select>
</template>

<script>
	import {SmileOutlined} from '@ant-design/icons-vue'
	export default{
		components:{
			SmileOutlined
		}
	}
</script>

<style>
</style>
