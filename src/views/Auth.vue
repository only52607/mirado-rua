<template>
	<div class="body">
		<a-row type="flex" justify="center" align="top" :bordered="false" class="center">
			<a-col :span="8">
				<a-card title="验证 MIRAODO-RUA" style="width: 100%">
					<a-space direction="vertical" size="middle">
						<a-input placeholder="用户名" v-model:value="username" ref="userNameInput">
							<template v-slot:prefix>
								<user-outlined type="user" />
							</template>
						</a-input>
						<a-input-password v-model:value="password" placeholder="密码">
							<template v-slot:prefix>
								<KeyOutlined />
							</template>
						</a-input-password>
						<a-button type="primary" @click="auth"> 确定 </a-button>
					</a-space>
				</a-card>
			</a-col>
		</a-row>
	</div>
	<a-layout-footer class="footer">
	      MIRAIDO - RUA ©2020
	</a-layout-footer>
</template>
<script>
	import {
		UserOutlined,
		KeyOutlined
	} from '@ant-design/icons-vue'
	import {
		h
	} from 'vue'
	export default {
		name: "Auth",
		data() {
			return {
				username: "",
				password: ""
			}
		},
		methods: {
			auth() {
				let hide = this.$message.loading('验证中', 0)
				setTimeout(hide, 1000)
				if (this.username != this.password) {
					this.$error({
						title: '验证失败',
						content: '用户名或密码错误！',
					});
					return
				}
				this.$message.success(
					'验证通过',
					2,
				)
				this.$router.replace("/")
			}
		},
		components: {
			UserOutlined,
			KeyOutlined
		},
	};
</script>

<style>
	.center {
		/* vertical-align:middle;
		display:inline-block */
		margin-top: 10%;
	}
	.body{
		background:#ECECEC; 
		padding:30px; 
		height: 90%;
		
	}
	.footer{
		background:#ECECEC; 
		height: 10%;
		textAlign: 'center';
	}
</style>
