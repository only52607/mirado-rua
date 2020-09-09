<template>
	<a-page-header title="编辑" :sub-title="$route.params.name" @back="() => $router.go(-1)">
		<template v-slot:extra>
			<ButtonSave text="保存" @click="save" :loading="saving" />
		</template>
		<a-spin :spinning="loading">
			<textarea ref="editor" id="codecontent" ></textarea>
		</a-spin>
	</a-page-header>
</template>

<script>
	import ButtonSave from '@/components/buttons/ButtonSave.vue'
	var Base64 = require('js-base64').Base64

	export default {
		data() {
			return {
				saving: false,
				mirror: null,
				loading: true
			}
		},
		components: {
			ButtonSave
		},
		mounted() {
			let m = CodeMirror.fromTextArea(document.getElementById("codecontent"), {
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
			api.get("/files/" + this.$route.params.name + "/raw").then(response => {
				this.code = Base64.decode(response.data)
				m.setValue(this.code)
				m.refresh()
				this.loading = false
			})
			this.mirror = m
		},
		methods: {
			save() {
				this.saving = true
				api.put("/files/" + this.$route.params.name + "/raw", Base64.encode(this.mirror.getValue())).then(response => {
					this.$message.success("保存成功")
					this.saving = false
				}).catch(err => {
					this.$message.error("保存失败")
					this.saving = false
				})
			}
		}
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
