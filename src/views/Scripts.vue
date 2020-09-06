<template>
	<a-page-header title="脚本" sub-title="Script" backIcon=false>
		<a-tabs>
			<a-tab-pane key="runningScripts" tab="正在运行的脚本" force-render>
					<a-button class="button-op"> 
						<template v-slot:icon>
					      <FileAddOutlined />
					    </template>
						从已上传文件添加 
					</a-button>
					<a-table :columns="columnsScripts" :data-source="scripts" :loading="loadingScripts">
						<template v-slot:version="{ text: version }">
							<span>
								<a-tag :key="version" color="green">
									{{version}}
								</a-tag>
							</span>
						</template>
						<template v-slot:action="{ text, record, index }">
							<span>
								<a-dropdown>
									<a class="ant-dropdown-link"> 更多
										<DownOutlined /> </a>
									<template v-slot:overlay>
										<a-menu>
											<a-menu-item>
												<span @click="removeRunningScript(index)">
													<DeleteOutlined />移除</span>
											</a-menu-item>
											<a-menu-item>
												<span @click="editRunningScript(index)">
													<EditOutlined />编辑</span>
											</a-menu-item>
											<a-menu-item>
												<span @click="reloadRunningScript(index)">
													<ReloadOutlined />重载</span>
											</a-menu-item>
											<a-menu-item>
												<span @click="downloadRunningScript(index)">
													<CloudDownloadOutlined />下载</span>
											</a-menu-item>
										</a-menu>
									</template>
								</a-dropdown>
							</span>
						</template>
					</a-table>
				
			</a-tab-pane>
			<a-tab-pane key="localScripts" tab="已上传文件" force-render>
				<a-upload
				    v-model:fileList="fileList"
				    name="file"
				    :multiple="true"
				    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
				    :headers="headers"
				    @change="handleChange"
					class="button-op"
				  >
				    <a-button style="z-index: 20;">
				    <template v-slot:icon>
				          <UploadOutlined />
				        </template>
				    	上传文件
				    </a-button>
				  </a-upload>
				
				
				
				<a-table :columns="columnsFiles" :data-source="files" :loading="loadingFiles">
					<template v-slot:action="{ text, record, index }">
						<span>
							<a @click="removeFile(index)">
								<DeleteOutlined />删除</a>
							<a-divider type="vertical" />
							<a @click="editFile(index)">
								<EditOutlined />编辑</a>
							<a-divider type="vertical" />
							<a @click="downloadFile(index)">
								<CloudDownloadOutlined />下载</a>
							<a-divider type="vertical" />
								<a-button type="primary"  @click="loadFile(index)">
								<template v-slot:icon>
								      <ThunderboltOutlined />
								    </template>
									加载
								</a-button>
						</span>
					</template>
				</a-table>
			</a-tab-pane>
			<a-tab-pane key="remoteScripts" tab="云脚本中心" force-render>
				云脚本中心
			</a-tab-pane>
		</a-tabs>
	</a-page-header>
</template>


<script>
	import {
		DownOutlined,
		DeleteOutlined,
		EditOutlined,
		ReloadOutlined,
		CloudDownloadOutlined,
		FileAddOutlined,
		UploadOutlined,
		ThunderboltOutlined
	} from '@ant-design/icons-vue';

	const columnsScripts = [{
			dataIndex: 'name',
			title: '名称',
		},
		{
			title: '作者',
			dataIndex: 'author'
		},
		{
			title: '描述',
			dataIndex: 'description'
		},
		{
			title: '版本',
			dataIndex: 'version',
			slots: {
				customRender: 'version'
			},
		},
		{
			title: '源文件',
			dataIndex: 'file'
		},
		{
			title: '更多',
			key: 'action',
			slots: {
				customRender: 'action' //注册一个名称为action的slot，并将值赋予customRender
			},
		},
	];

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


	const columnsFiles = [{
			dataIndex: 'name',
			title: '文件名',
		},
		{
			title: '大小',
			dataIndex: 'size'
		},
		{
			title: '操作',
			key: 'action',
			slots: {
				customRender: 'action' //注册一个名称为action的slot，并将值赋予customRender
			},
		},
	];

	const files = [{
		key: 0,
		name: 'aaa.lua',
		size: 566
	}]


	export default {
		components: {
			DownOutlined,
			DeleteOutlined,
			EditOutlined,
			ReloadOutlined,
			CloudDownloadOutlined,
			FileAddOutlined,
			UploadOutlined,
			ThunderboltOutlined
		},
		data() {
			return {
				scripts,
				files,
				columnsScripts,
				columnsFiles,
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
			},
			reloadRunningScript(index) {
				console.log("reload" + index)
			},
			downloadRunningScript(index) {

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
	.button-op{
		float: left; 
		margin-bottom: 10px;
		z-index: 10;
	}
</style>
