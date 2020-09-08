<template>
	<a-table :columns="columns" split="false">
		<template v-slot:action="{ text, record, index }">
			<span>
				<a-popconfirm title="确定删除此文件?" ok-text="确定" cancel-text="取消" @confirm="$emit('remove',index)">
					<a>
						<DeleteOutlined />删除</a>
				</a-popconfirm>
				<a-divider type="vertical" />
				<a @click="$emit('edit',index)">
					<EditOutlined />编辑</a>
				<a-divider type="vertical" />
				<a @click="$emit('download',index)">
					<CloudDownloadOutlined />下载</a>
				<a-divider type="vertical" />

				<a-popconfirm title="确定加载此文件?" :loading="record.loading" ok-text="确定" cancel-text="取消" @confirm="$emit('load',index)">
					<a-button type="primary">
						<ThunderboltOutlined v-slot:icon />加载
					</a-button>
				</a-popconfirm>
			</span>
		</template>
	</a-table>
</template>

<script>
	import {
		DeleteOutlined,
		EditOutlined,
		CloudDownloadOutlined,
		ThunderboltOutlined
	} from '@ant-design/icons-vue';

	const columns = [{
			title: '文件名',
			dataIndex: 'name',
			fixed: 'left',
		},
		{
			title: '大小',
			dataIndex: 'size'
		},
		{
			title: '操作',
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
		components: {
			DeleteOutlined,
			EditOutlined,
			CloudDownloadOutlined,
			ThunderboltOutlined
		},
		props:{
			
		}
	}
</script>

<style>
</style>
