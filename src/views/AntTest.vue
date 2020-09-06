<template>
	<a-button type="primary" @click="info">
		提示
	</a-button>
	<a-button @click="showalert"> （默认）对话框 </a-button>
	<a-popover title="Title">
		<template v-slot:content>
			<p>Content</p>
			<p>Content</p>
		</template>
		<a-button type="dashed">
			气泡
		</a-button>
	</a-popover>

	<a-button type="danger">
		Danger
	</a-button>
	<a-config-provider :auto-insert-space-in-button="false">
		<a-button type="primary">
			按钮
		</a-button>
	</a-config-provider>
	<a-button type="primary">
		按钮
	</a-button>
	<a-button type="link">
		Link
	</a-button>


	<a-alert message="Warning Text Warning Text Warning TextW arning Text Warning Text Warning TextWarning Text" type="warning"
	 closable @close="onClose" />
	<a-alert message="Error Text" description="Error Description Error Description Error Description Error Description Error Description Error Description"
	 type="error" closable @close="onClose" />

</template>


<script>
	import {
		h
	} from 'vue'
	export default {
		methods: {
			onClose(e) {
				console.log(e, 'I was closed.');
			},
			info(e) {
				this.$message.info("提示！")
			},
			showalert(e) {
				this.$info({
					title: 'This is a notification message',
					content: h('div', {}, [
						h('p', 'some messages...some messages...'),
						h('p', 'some messages...some messages...'),
					]),
					onOk() {},
				})
			}
		},
	};
</script>

<style>
</style>
