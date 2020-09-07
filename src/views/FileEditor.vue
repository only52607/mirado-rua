<template>
	<a-page-header title="编辑" :sub-title="$route.params.name" @back="() => $router.go(-1)">
		<template v-slot:extra>
			<a-button>
				<SaveOutlined v-slot:icon />
				保存
			</a-button>
		</template>
		<!-- 		<codemirror>
			
		</codemirror> -->
		<a-textarea v-model:value="code" placeholder="Basic usage" :rows="20" />
	</a-page-header>
</template>

<script>
	import {
		codemirror,
	} from 'vue-codemirror'
	import "codemirror/theme/ambiance.css"
	require("codemirror/mode/javascript/javascript")

	import {
		SaveOutlined
	} from '@ant-design/icons-vue'
	
	export default {

		data() {
			return {
				code: '',
				cmOptions: {
					value: '',
					mode: "text/javascript",
					theme: "ambiance",
					readOnly: false,
				}
			}

		},
		components: {
			codemirror,
			SaveOutlined
		},
	}
</script>

<style>
</style>
