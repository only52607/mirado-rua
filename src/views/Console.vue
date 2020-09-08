<template>

	<a-page-header title="控制台" sub-title="Console" backIcon=false>
		<template v-slot:extra>
			<a-space align = "start">
				<a-checkbox v-model:checked="showNetLog" @change="filterChange">
					网络日志
				</a-checkbox>
				<a-checkbox v-model:checked="showBotLog" @change="filterChange">
					Bot日志
				</a-checkbox>
				<a-select v-model:value="botFilter" style="width: 120px">
					<a-select-option value="全部">
						全部
					</a-select-option>
					<template v-for="bot in bots" key="bs">
						<a-select-option :value="bot.nick">
							{{bot.nick}}
						</a-select-option>
					</template>
				</a-select>
				
				<ButtonDelete  @click="clearConsole" text="清空日志" />
				<ButtonSend  type="primary" @click="sendCommandVisible=true" text="发送命令" />
				
			</a-space>
			<SendCommandModal :show=sendCommandVisible @send="sendCommandVisible = false; sendCommand($event)" />
		</template>
		<ConsoleList :data-source="logs"></ConsoleList>

	</a-page-header>

</template>

<script>
	import ConsoleList from '@/components/ConsoleList.vue'
	import SendCommandModal from '@/components/SendCommandModal.vue'
	
	import ButtonDelete from '@/components/buttons/ButtonDelete.vue'
	import ButtonSend from '@/components/buttons/ButtonSend.vue'

	export default {
		data() {
			return {
				showNetLog: true,
				showBotLog: true,
				botFilter: "全部",
				sendCommandVisible: false,
				command: "echo 'Hello'",
				logs: []
			};
		},
		components: {
			ConsoleList,
			SendCommandModal,
			ButtonDelete,
			ButtonSend
		},
		props: {
			bots: Object
		},
		methods: {
			filterChange() {

			},
			clearConsole() {
				this.logs.length = 0
			},
			sendCommand(e) {
				this.logs.unshift({
					message: ">> " + e.content
				})
			}
		}
	};
</script>

<style>

</style>
