<template>
	<a-page-header title="创建Bot" sub-title="Create Bot" backIcon=false>
		<a-row type="flex" justify="center" align="top" :bordered="false" class="center">
			<a-col :xs="24" :sm="22" :md="18" :lg="12" :xl="10">

				<a-form :model="formCreateBot" :rules="rules" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
					<a-form-item label="QQ账号:" name="id">
						<InputAccount placeholder="" v-model:value="formCreateBot.id" />
					</a-form-item>
					<a-form-item label="QQ密码:" name="password">
						<InputPassword placeholder="" v-model:value="formCreateBot.password" />
					</a-form-item>
					<a-form-item label="登录协议:" name="protocol">
						<a-radio-group v-model:value="formCreateBot.protocol">
							<a-radio value="ANDROID_PHONE">
								<!-- <MobileOutlined /> -->
								Android 手机
							</a-radio>
							<a-radio value="ANDROID_PAD">
								Android 平板
							</a-radio>
							<a-radio value="ANDROID_WATCH">
								Android 手表
							</a-radio>
						</a-radio-group>
					</a-form-item>

					<a-form-item :wrapper-col="{ span: 14, offset: 4 }">
						<a-button type="primary" @click="create" :loading="isCreating">
							提交创建
						</a-button>
					</a-form-item>

				</a-form>
			</a-col>
		</a-row>

	</a-page-header>
</template>

<script>
	import InputAccount from '@/components/inputs/InputAccount.vue'
	import InputPassword from '@/components/inputs/InputPassword.vue'
	import SelectProtocols from '@/components/selects/SelectProtocols.vue'
	// import {MobileOutlined} from '@ant-design/icons-vue'
	import {getCurrentInstance,reactive,ref,watchEffect,computed} from 'vue'

	export default {
		name: "CreateBot",
		components: {
			InputAccount,
			InputPassword,
			SelectProtocols,
			// MobileOutlined
		},
		setup() {
			const {ctx} = getCurrentInstance()
			const formCreateBot = reactive({
				id: "",
				password: "",
				protocol: "ANDROID_PHONE",
			})
			const isCreating = ref(false)
			const rules = reactive({
				id: [{
						required: true,
						message: '请输入账号！',
						trigger: 'blur'
					},
					{
						min: 5,
						max: 11,
						message: '账号长度不符合要求！',
						trigger: 'blur'
					},
				],
				password: [{
					required: true,
					message: '请输入密码！',
					trigger: 'blur'
				}],
			})
			async function create() {
				isCreating.value = true
				ctx.$botStore.recentBotId.value = formCreateBot.id
				try {
					await ctx.$api.post("/bots", formCreateBot, {timeout: 30000})
					ctx.$message.success('成功创建Bot ' + formCreateBot.id, 2)
					ctx.$botStore.updateBots()
				} catch (err) {
					ctx.$error({title: '创建失败',content: err.checkData()})
				}
				isCreating.value = false
			}
			return {
				formCreateBot,
				isCreating,
				rules,
				create
			}
		},
	};
</script>

<style>
</style>
