<template>
	<div class="body">
		<a-row type="flex" justify="center" align="top" :bordered="false" class="center">
			<a-col :xs="24" :sm="20" :md="12" :lg="8" :xl="6">
				<a-card title="验证 MIRAODO-RUA" style="width: 100%">
					<a-form :model="formAuth" :rules="rules" :wrapperCol="{span: 24}">
						<a-form-item name="username">
							<InputAccount  placeholder="用户名" v-model:value="formAuth.username" />
						</a-form-item>
						<a-form-item name="password">
							<InputPassword  placeholder="密码" v-model:value="formAuth.password" />
						</a-form-item>
						<a-button type="primary" @click="authenticate" :loading="isAuthenticating"> 确定 </a-button>
					</a-form>
				</a-card>
			</a-col>
		</a-row>
	</div>
	<a-layout-footer class="footer">
		MIRAIDO - RUA ©2020
	</a-layout-footer>
</template>
<script>

	import InputAccount from '@/components/inputs/InputAccount.vue'
	import InputPassword from '@/components/inputs/InputPassword.vue'
	import { getCurrentInstance,reactive,ref } from 'vue'
	export default {
		name: "Auth",
		setup(){
			const {ctx} = getCurrentInstance()
			const formAuth = reactive({
				username:"",
				password:""
			})
			const isAuthenticating = ref(false)
			const rules = reactive({
				
			})
			async function authenticate() {
				isAuthenticating.value = true
				try{
					let result = await ctx.$api.post('/auth', formAuth)
					ctx.$message.success('验证通过', 2)
					ctx.$router.replace("/")
				}catch(err){
					ctx.$error({title: '验证失败',content: err.checkData()})
				}
				isAuthenticating.value = false
			}
			return {
				formAuth,
				isAuthenticating,
				rules,
				authenticate,
			}
		},
		components: {
			InputAccount,
			InputPassword,
		},
	}
</script>

<style>
	.center {
		/* vertical-align:middle;
		display:inline-block */
		margin-top: 10%;
	}

	.body {
		background: #ECECEC;
		padding: 30px;
		height: 90%;
	}

	.footer {
		background: #ECECEC;
		height: 10%;
		textAlign: 'center';
	}
</style>
