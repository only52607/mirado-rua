<template>
	<a-table :columns="columns" split="false">
		<template v-slot:version="{ text }">
			<span>
				<a-tag :key="text" color="green">
					{{text}}
				</a-tag>
			</span>
		</template>
		
		<template #expandedRowRender="{ record }">
		      <p style="margin: 0">
		        {{ record.description }}
		      </p>
		</template>
		
		<template v-slot:action="{ text, record, index }">
			<span>
				<a-dropdown>
					<a class="ant-dropdown-link"> 更多
						<DownOutlined /> </a>
					<template v-slot:overlay>
						<a-menu>
							<a-menu-item>
								<span @click="removeConfirm(index)">
									<DeleteOutlined />移除</span>
							</a-menu-item>
							<a-menu-item>
								<span @click="$emit('edit',index)">
									<EditOutlined />编辑</span>
							</a-menu-item>
							<a-menu-item>
								<span @click="reloadConfirm(index)">
									<ReloadOutlined />重载</span>
							</a-menu-item>
							<a-menu-item>
								<span @click="$emit('download',index)">
									<CloudDownloadOutlined />下载</span>
							</a-menu-item>
						</a-menu>
					</template>
				</a-dropdown>
			</span>
		</template>
	</a-table>
</template>

<script>
	import {
		DownOutlined,
		DeleteOutlined,
		EditOutlined,
		ReloadOutlined,
		CloudDownloadOutlined,
		ExclamationCircleOutlined
	} from '@ant-design/icons-vue'
	
	import { createVNode } from 'vue'
	
	const columns = [{
			title: '名称',
			dataIndex: 'name',
			fixed: 'left',
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
			fixed: 'right',
			slots: {
				customRender: 'action'
			},
		},
	]

	export default {
		data() {
			return {
				columns,
			}
		},
		props: {},
		components: {
			DownOutlined,
			DeleteOutlined,
			EditOutlined,
			ReloadOutlined,
			CloudDownloadOutlined,
			ExclamationCircleOutlined,
			createVNode
		},
		methods: {
			removeConfirm(index) {
				let v = this
				this.$confirm({
					title: '确定移除此脚本?',
					icon: createVNode(ExclamationCircleOutlined),
					content: '源文件不会删除',
					okText: '确定',
					okType: 'danger',
					cancelText: '取消',
					onOk() {
						v.$emit("remove",index)
					}
				})
			},
			reloadConfirm(index) {
				let v = this
				this.$confirm({
					title: '确定重载此脚本?',
					icon: createVNode(ExclamationCircleOutlined),
					content: '代码将会重新运行',
					okText: '确定',
					cancelText: '取消',
					onOk() {
						v.$emit("reload",index)
					}
				})
			}	
		},
		
	}
</script>

<style>
</style>
