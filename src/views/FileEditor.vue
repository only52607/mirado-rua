<template>
	<a-page-header title="编辑" :sub-title="$route.params.name" @back="() => $router.go(-1)">
		<template v-slot:extra>
			<ButtonSave text="保存" @click="save" :loading="isLoading" />
		</template>
		<a-spin :spinning="isLoading">
			<textarea ref="editor" id="code-content" ></textarea>
		</a-spin>
	</a-page-header>
</template>

<script>
	import { getCurrentInstance,reactive,ref,watchEffect,computed,onMounted } from 'vue'
	import ButtonSave from '@/components/buttons/ButtonSave.vue'
	const Base64 = require('js-base64').Base64

	export default {
		components: {
			ButtonSave
		},
		setup(){
			const {ctx} = getCurrentInstance()
			const isSaving = ref(false)
			const isLoading = ref(true)
			const mirrorView = ref({})
			async function save() {
				isSaving.value = true
				try{
					await ctx.$api.put("/files/" + ctx.$router.currentRoute.value.params.name + "/raw", Base64.encode(mirrorView.getValue()))
					ctx.$message.success("保存成功")
				}catch (err) {
					ctx.$message.error("保存失败：" + err.checkData())
				}
				isSaving.value = false
			}
			onMounted(async ()=>{
				const mirror = CodeMirror.fromTextArea(document.getElementById("code-content"), {
					lineNumbers: true,
					indentWithTabs: true,
					mode: "lua",
					matchBrackets: true,
					autoRefresh: true,
					theme:"neat",
					foldGutter: true,
					lineWrapping: true,
					gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers']
				})
				const response = await ctx.$api.get("/files/" + ctx.$router.currentRoute.value.params.name + "/raw")
				mirror.setValue(Base64.decode(response.data))
				mirror.refresh()
				isLoading.value = false
				mirrorView.value = mirror
			})
			return {
				isSaving,
				isLoading,
				mirrorView,
				save
			}
		},
	}
</script>

<style>
	.CodeMirror {
	    font-family: Consolas,monospace,sans-serif,Avenir,Helvetica,Arial;
		text-align: left;
		min-width: 0 !important;
		min-height: 0 !important;
	}
	.CodeMirror-sizer{
		min-width: 0 !important;
		min-height: 0 !important;
	}
</style>
