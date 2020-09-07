<template>
	<a-table :columns="columns">
		<template v-slot:action="{ text, record, index }">
			<span>
				<a @click="$emit('remove',index)">
					<DeleteOutlined />删除</a>
				<a-divider type="vertical" />
				<a @click="$emit('edit',index)">
					<EditOutlined />编辑</a>
				<a-divider type="vertical" />
				<a @click="$emit('download',index)">
					<CloudDownloadOutlined />下载</a>
				<a-divider type="vertical" />
				<a-button type="primary" @click="$emit('load',index)">
					<template v-slot:icon>
						<ThunderboltOutlined />
					</template>
					加载
				</a-button>
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
	]

	export default {
		data() {
			return {
				columns
			}
		},
		components: {
			DeleteOutlined,
			EditOutlined,
			CloudDownloadOutlined,
			ThunderboltOutlined
		}
	}
</script>

<style>
</style>
