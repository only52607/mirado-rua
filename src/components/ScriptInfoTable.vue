<template>
	<a-table :columns="columns">
		<template v-slot:version="{ text }">
			<span>
				<a-tag :key="text" color="green">
					{{text}}
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
								<span @click="$emit('remove',index)">
									<DeleteOutlined />移除</span>
							</a-menu-item>
							<a-menu-item>
								<span @click="$emit('edit',index)">
									<EditOutlined />编辑</span>
							</a-menu-item>
							<a-menu-item>
								<span @click="$emit('reload',index)">
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
		CloudDownloadOutlined
	} from '@ant-design/icons-vue';
	
	const columns = [{
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
		props: {
		},
		components:{
			DownOutlined,
			DeleteOutlined,
			EditOutlined,
			ReloadOutlined,
			CloudDownloadOutlined
		}
	}
</script>

<style>
</style>
