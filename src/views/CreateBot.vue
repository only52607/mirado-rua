<template>
	<a-page-header title="创建Bot" sub-title="Create Bot" backIcon=false>
		<a-row type="flex" justify="center" align="top">
			<a-col :span="16">
				<a-card title="登录信息" :bordered="false" style="width: 100%">
					<a-space direction="vertical" size="middle">
						<InputAccount placeholder="Account" v-model:value="id" />
						<InputPassword placeholder="Password" v-model:value="password" />
						<span>
							登录协议：
							<SelectProtocols v-model:value="protocol" />
						</span>
						<a-button type="primary" @click="create" :loading="creating"> 创建Bot </a-button>
					</a-space>
				</a-card>
			</a-col>
		</a-row>
	</a-page-header>
</template>

<script>
	import InputAccount from '@/components/inputs/InputAccount.vue'
	import InputPassword from '@/components/inputs/InputPassword.vue'
	import SelectProtocols from '@/components/selects/SelectProtocols.vue'
	
	export default {
		name: "CreateBot",
		data() {
			return {
				id: "",
				password: "",
				protocol: "ANDROID_PHONE",
				creating: false
			}
		},
		methods: {
			create() {
				let v = this
				v.creating = true
				api.post("/bots", {
					id:v.id,
					password:v.password
				}).then(response => {
					v.creating = false
					v.username = ""
					v.password = ""
					v.$notification.success({
						message: '操作成功',
						description: '成功创建了一个bot!',
					})
				}).catch(err => {
					v.creating = false
					v.$notification.error({
						message: '创建失败！',
						description: "",
					})
				})
			},
		},
		components: {
			InputAccount,
			InputPassword,
			SelectProtocols
		},
	};
</script>

<style>
</style>
