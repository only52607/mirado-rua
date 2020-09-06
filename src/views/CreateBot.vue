<template>
	<a-page-header title="创建Bot" sub-title="" backIcon=false>
		<a-row type="flex" justify="center" align="top">
			<a-col :span="10">
				<a-card title="登录信息" :bordered="false" style="width: 100%">
					<a-space direction="vertical" size="middle">
						<a-input placeholder="Account" v-model:value="username" style="width:10px">
							<template v-slot:prefix>
								<user-outlined type="user" />
							</template>
						</a-input>

						<a-input-password v-model:value="password" placeholder="Password">
							<template v-slot:prefix>
								<KeyOutlined />
							</template>
						</a-input-password>

						<span>
							登录协议： <a-select v-model:value="protocol" @change="protocolChange" style="width:150px">
								<template v-slot:suffixIcon>
									<smile-outlined />
								</template>
								<a-select-option value="ANDROID_PHONE"> Android Phone </a-select-option>
								<a-select-option value="ANDROID_PAD"> Android Pad </a-select-option>
								<a-select-option value="ANDROID_WATCH"> Android Watch </a-select-option>
							</a-select>
						</span>
						<a-button type="primary" @click="create"> 创建Bot </a-button>
					</a-space>
				</a-card>
			</a-col>
		</a-row>
	</a-page-header>
</template>

<script>
	import {
		UserOutlined,
		KeyOutlined,
		SmileOutlined
	} from '@ant-design/icons-vue'

	import {
		h
	} from 'vue'

	export default {
		name: "CreateBot",
		data() {
			return {
				username: "",
				password: "",
				protocol: "ANDROID_PHONE"
			}
		},
		methods: {
			create() {
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
				this.$router.replace("/nav")
			},
			protocolChange() {

			}
		},
		components: {
			UserOutlined,
			KeyOutlined,
			SmileOutlined
		},
	};
</script>

<style>
</style>
