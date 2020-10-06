<template>
	<a-page-header title="脚本" sub-title="Script" backIcon=false>
		<a-tabs v-model:activeKey="activeTab">
			<a-tab-pane key="0" tab="正在运行的脚本" force-render>
				<a-space class="margin-bottom">
				<!-- <a-row type="flex" justify="start"> -->
					 <!-- <a-col :span="6"> --> <ButtonAddFile @click="activeTab='1'" text="从已上传文件添加" /> <!-- </a-col> -->
					<!-- <a-col :span="3"> --> <ButtonRefresh @click="fetchScripts" text="刷新" /><!-- </a-col> -->
				<!-- </a-row> -->
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
	import Downloader from '@/utils/Downloader.js'
	import { getCurrentInstance,reactive,ref,watchEffect,computed } from 'vue'
	export default {
		components: {
			ScriptInfoTable,
			FileInfoTable,
			ButtonRefresh,
			ButtonUpload,
			ButtonAddFile,
			InputModal
		},
		setup(){
			const {ctx} = getCurrentInstance()
			const scripts = reactive([])
			const files = reactive([])
			const loadingScripts = ref(false)
			const loadingFiles = ref(false)
			const uploadAction = ref("")
			const activeTab = ref("0")
			const showCreateFile = ref(false)
			const uploadingFile = ref(false)
			const uploadHeaders = reactive({})
			async function fetchFiles() {
				loadingFiles.value = true
				try{
					files.value = await ctx.$api.get("/files").data
				}catch(err){
					ctx.$message.error("加载失败：" + err.checkData())
				}
				loadingFiles.value = false
			}
			async function fetchScripts() {
				loadingScripts.value = true
				try{
					scripts.value = await ctx.$api.get("/scripts").data
				}catch(err){
					ctx.$message.error("加载失败：" + err.checkData())
				}
				loadingScripts.value = false
			}
			async function removeRunningScript(index) {
				try{
					await ctx.$api.delete("/scripts/" + index)
					ctx.$message.success("删除成功！")
					fetchScripts()
				}catch(err){
					this.$message.error("删除失败：" + err.checkData())
				}
			}
			async function editRunningScript(index) {
				ctx.$router.push({
					name: "editor",
					params: {
						name: scripts[index].file
					}
				})
			}
			async function reloadRunningScript(index) {
				try{
					await ctx.$api.get("/scripts/" + index + "/reload")
					ctx.$message.success("重载成功！")
					fetchScripts()
				}catch(err){
					ctx.$message.error("重载失败：" + err.checkData())
				}
			}
			async function createFile(name) {
				try{
					await ctx.$api.put("/files/" + name + "/raw", "")
					ctx.$message.success("创建成功！")
					fetchFiles()
				}catch(err){
					ctx.$message.error("创建失败：" + err.checkData())
				}
				showCreateFile.value = false
			}
			async function downloadRunningScript(index) {
				const response = await ctx.$api.get("/files/" + scripts[index].file + "/file")
				Downloader.downloadText(response.data, scripts[index].file)
			}
			async function removeFile(index) {
				 try{
					await ctx.$api.delete("/files/" + files[index].name)
					ctx.$message.success("删除成功！")
					fetchFiles()
				}catch(err){
					ctx.$message.error("删除失败：" + err.checkData())
				}
			}
			async function editFile(index) {
				ctx.$router.push({
					name: "editor",
					params: {
						name: this.files[index].name
					}
				})
			}
			async function loadFile(index) {
				files[index].loading = true
				try{
					await ctx.$api.post("/scripts", files[index])
					ctx.$notification.success({
						message: '载入成功',
						description: '成功加载一个脚本',
					})
					fetchScripts()
				}catch(err){
					ctx.$message.error("加载脚本失败：" + err.checkData())
				}
				files[index].loading = false
			}
			async function downloadFile(index) {
				const response = await ctx.$api.get("/files/" + files[index].name + "/file")
				Downloader.downloadText(response.data, files[index].name)
			}
			async function onFileNameChange(index, key, name) {
				const originName = this.files[index].name
				try{
					const response = ctx.$api.put("/files/" + originName + "/name", {name})
					ctx.$message.success("重命名成功")
					fetchFiles()
				}catch(err){
					ctx.$message.error("重命名失败：" + err.checkData())
					files[index].name = originName
				}
			}
			async function uploadFileStatusChange(info) {
				if (info.file.status == 'uploading') {
					uploadingFile.value = true
					return
				}
				uploadingFile.value = false
				if (info.file.status === 'done') {
					ctx.$message.success(`${info.file.name} 上传成功`);
				} else if (info.file.status === 'error') {
					ctx.$message.error(`${info.file.name} 上传失败`);
				}
				fetchFiles()
			}
			return {
				scripts,files,loadingScripts,loadingFiles,uploadAction,activeTab,showCreateFile,
				uploadingFile,uploadHeaders,fetchFiles,fetchScripts,removeRunningScript,editRunningScript,
				reloadRunningScript,createFile,downloadRunningScript,removeFile,editFile,loadFile,
				downloadFile,onFileNameChange,uploadFileStatusChange
			}
		},
		onMounted() {
			this.uploadAction = this.$api.baseURL + '/files'
			this.uploadHeaders = {'Authorization':localStorage.authorization}
			this.fetchFiles()
			this.fetchScripts()
		}
	}
</script>

<style>
	.margin-bottom {
		margin-bottom: 10px;
	}
</style>