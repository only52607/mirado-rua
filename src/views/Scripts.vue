<template>
	<a-page-header title="脚本" sub-title="Script" backIcon=false>
		<a-tabs v-model:activeKey="activeTab">
			<a-tab-pane key="0" tab="正在运行的脚本" force-render>
				<a-space class="margin-bottom">
					<ButtonAddFile @click="activeTab='1'" text="从已上传文件添加" />
					<ButtonRefresh @click="fetchScripts" text="刷新" />
				</a-space>

				<ScriptInfoTable :loading="loadingScripts" :data-source="scripts" @edit="editRunningScript" @reload="reloadRunningScript"
				 @download="downloadRunningScript" @remove="removeRunningScript" />
			</a-tab-pane>

			<a-tab-pane key="1" tab="已上传文件" force-render>
				<a-space class="margin-bottom">
					<a-upload :headers="uploadHeaders" showUploadList="false" name="file" :multiple="false" :action="uploadAction" @change="uploadFileStatusChange">
						<ButtonUpload :loading="uploadingFile" text="上传文件" />
					</a-upload>
					<ButtonAddFile @click="showCreateFile=true" text="创建空文件" />
					<ButtonRefresh @click="fetchFiles" text="刷新" />
				</a-space>
				<InputModal title="创建文件" before="文件名" v-model:visible="showCreateFile" @finish="createFile" />
				<FileInfoTable :loading="loadingFiles" :data-source="files" @edit="editFile" @load="loadFile" @download="downloadFile"
				 @remove="removeFile" @onFileNameChange="onFileNameChange" />
			</a-tab-pane>

			<a-tab-pane key="2" tab="云脚本中心" force-render>
				云脚本中心
			</a-tab-pane>

		</a-tabs>
	</a-page-header>
</template>


<script>
	import ScriptInfoTable from '@/components/ScriptInfoTable'
	import FileInfoTable from '@/components/FileInfoTable'
	import ButtonRefresh from '@/components/buttons/ButtonRefresh'
	import ButtonUpload from '@/components/buttons/ButtonUpload'
	import ButtonAddFile from '@/components/buttons/ButtonAddFile'
	import InputModal from '@/components/InputModal.vue'

	import {
		Downloader
	} from '@/utils/downloader.js'

	export default {
		components: {
			ScriptInfoTable,
			FileInfoTable,
			ButtonRefresh,
			ButtonUpload,
			ButtonAddFile,
			InputModal
		},
		data() {
			return {
				scripts: [],
				files: [],
				loadingScripts: false,
				loadingFiles: false,
				uploadAction: "",
				activeTab: "0",
				showCreateFile: false,
				uploadingFile: false,
				uploadHeaders:{}
			};
		},
		methods: {
			fetchFiles() {
				let v = this
				v.loadingFiles = true
				api.get("/files").then(response => {
					v.files.splice(0)
					response.data.forEach((item,index)=>{
						item.key = index
						v.files.push(item)
					})
					v.loadingFiles = false
				}).catch(err => {
					this.$message.error("加载失败！" + err)
					v.loadingFiles = false
				})
			},
			fetchScripts() {
				let v = this
				v.loadingScripts = true
				api.get("/scripts").then(response => {
					v.scripts.splice(0)
					response.data.forEach((item,index)=>{
						item.key = index
						v.scripts.push(item)
					})
					v.loadingScripts = false
				}).catch(err => {
					this.$message.error("加载失败！" + err)
					v.loadingScripts = false
				})
			},
			removeRunningScript(index) {
				api.delete("/scripts/" + index).then(response => {
					this.$message.success("删除成功！")
					this.fetchScripts()
				}).catch(err => {
					this.$message.error("删除失败！")
				})
			},
			editRunningScript(index) {
				this.$router.push({
					name: "editor",
					params: {
						name: this.scripts[index].file
					}
				})
			},
			reloadRunningScript(index) {
				api.get("/scripts/" + index + "/reload").then(response => {
					this.$message.success("重载成功！")
					this.fetchScripts()
				}).catch(err => {

					this.$message.error("重载失败！")
				})
			},
			createFile(name) {
				api.put("/files/" + name + "/raw", "").then(response => {
					this.$message.success("创建成功")
					this.fetchFiles()
					this.showCreateFile = false
				}).catch(err => {
					this.$message.error("创建失败")
					this.showCreateFile = false
				})
			},
			downloadRunningScript(index) {
				let filename = this.scripts[index].file
				api.get("/files/" + filename + "/file").then(response => {
					Downloader.downloadText(response.data, filename)
				})
			},
			removeFile(index) {
				let name = this.files[index].name
				api.delete("/files/" + name).then(response => {
					this.$message.success("删除成功！")
					this.fetchFiles()
				}).catch(err => {
					this.$message.error("删除失败！")
				})
			},
			editFile(index) {
				this.$router.push({
					name: "editor",
					params: {
						name: this.files[index].name
					}
				})
			},
			loadFile(index) {
				this.files[index].loading = true
				api.post("/scripts", this.files[index]).then(response => {
					this.$notification.success({
						message: '载入成功',
						description: '成功加载一个脚本',
					})
					this.fetchScripts()
				}).catch(err => {
					this.$error({
						title: '加载脚本失败',
						content: err.response.data.error,
					})
				})
				this.files[index].loading = false
			},
			downloadFile(index) {
				let filename = this.files[index].name
				api.get("/files/" + filename + "/file").then(response => {
					Downloader.downloadText(response.data, filename)
				})
			},
			onFileNameChange(index, key, name) {
				let originName = this.files[index].name
				api.put("/files/" + originName + "/name", {
					name
				}).then(response => {
					this.$message.success("重命名成功")
					this.fetchFiles()
				}).catch(err => {
					this.$message.error("重命名失败")
					this.files[index].name = originName
				})
			},
			uploadFileStatusChange(info) {
				if (info.file.status == 'uploading') {
					this.uploadingFile = true
					return
				}
				this.uploadingFile = false
				if (info.file.status === 'done') {
					this.$message.success(`${info.file.name} 上传成功`);
				} else if (info.file.status === 'error') {
					this.$message.error(`${info.file.name} 上传失败`);
				}
				this.fetchFiles()
			}
		},
		mounted() {
			this.uploadAction = api.baseURL + '/files'
			this.uploadHeaders = {'Authorization':localStorage.authorization}
			this.fetchFiles()
			this.fetchScripts()
		}
	}
</script>

<style>
/* 	.float-left {
		float: left;
	}

	.index-top {
		z-index: 10;
	} */
	
	.margin-bottom {
		margin-bottom: 10px;
	}

</style>
