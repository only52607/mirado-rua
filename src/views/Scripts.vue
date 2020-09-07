<template>
	<a-page-header title="脚本" sub-title="Script" backIcon=false>
		<a-tabs>
			<a-tab-pane key="runningScripts" tab="正在运行的脚本" force-render>
				<a-button class="button-op">
					<FileAddOutlined v-slot:icon/>
					从已上传文件添加
				</a-button>
				<ScriptInfoTable :loading="loadingScripts" :data-source="scripts" @edit="editRunningScript" @reload="reloadRunningScript"
				 @download="downloadRunningScript" @remove="removeRunningScript"></ScriptInfoTable>
			</a-tab-pane>
			
			<a-tab-pane key="localScripts" tab="已上传文件" force-render>
				<a-upload v-model:fileList="fileList" name="file" :multiple="true" action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
				 :headers="headers" @change="handleChange" class="button-op">
					<a-button style="z-index: 20;">
						<UploadOutlined v-slot:icon/>
						上传文件
					</a-button>
				</a-upload>
				<FileInfoTable :loading="loadingFiles" :data-source="files" @edit="editFile" @load="loadFile"
				 @download="downloadRunningScript" @remove="removeRunningScript"></FileInfoTable>
			</a-tab-pane>
			
			<a-tab-pane key="remoteScripts" tab="云脚本中心" force-render>
				云脚本中心
			</a-tab-pane>
			
		</a-tabs>
	</a-page-header>
</template>


<script>
	import {
		FileAddOutlined,
		UploadOutlined
	} from '@ant-design/icons-vue';

	import ScriptInfoTable from '@/components/ScriptInfoTable'
	import FileInfoTable from '@/components/FileInfoTable'

	const scripts = [{
			key: 0,
			name: '复读机',
			author: "ooooonly",
			description: '简单的复读机脚本',
			version: 'v1.0',
			file: "repeater.lua"
		},
		{
			key: 1,
			name: '复读机',
			author: "ooooonly",
			description: '简单的复读机脚本',
			version: 'v1.0',
			file: "repeater.lua"
		}
	]

	const files = [{
		key: 0,
		name: 'aaa.lua',
		size: 566
	}]


	export default {
		components: {
			FileAddOutlined,
			UploadOutlined,
			ScriptInfoTable,
			FileInfoTable
		},
		data() {
			return {
				scripts,
				files,
				loadingScripts: false,
				loadingFiles: false
			};
		},
		methods: {
			removeRunningScript(index) {
				this.loading = true
				console.log("remove" + index)
			},
			editRunningScript(index) {
				console.log("edit" + index)
				this.$router.push({name:"editor",params:{
					name:this.scripts[index].file}
				})
			},
			reloadRunningScript(index) {
				console.log("reload" + index)
			},
			downloadRunningScript(index) {
				this.loadingScripts = true
			},
			removeFile(index) {
				this.loading = true
				console.log("remove" + index)
			},
			editFile(index) {
				console.log("edit" + index)
			},
			loadFile(index) {
				console.log("load" + index)
			},
			downloadFile(index) {
				
			}
		}
	}
</script>

<style>
	.button-op {
		float: left;
		margin-bottom: 10px;
		z-index: 10;
	}
</style>
