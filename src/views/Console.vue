<template>

	<a-page-header title="控制台" sub-title="Console" backIcon=false>
		<template v-slot:extra>
			<a-space align="start">
				<a-checkbox v-model:checked="showNetLog" @change="updateLogs">
					网络日志
				</a-checkbox>
				<a-checkbox v-model:checked="showBotLog" @change="updateLogs">
					Bot日志
				</a-checkbox>
				<a-select v-model:value="botFilter" style="width: 120px">
					<a-select-option value="all">
						全部
					</a-select-option>
					<template v-for="bot in _bots" key="bs">
						<a-select-option :value="bot.id">
							{{bot.nick}}
						</a-select-option>
					</template>
				</a-select>
				<ButtonDelete @click="clearConsole" text="清空日志" />
				<!-- <ButtonSend type="primary"  @click="showInputCommand=true" text="发送命令" /> -->
			</a-space>
			<InputModal title="发送命令" before=">>" v-model:visible="showInputCommand" @finish="sendCommand" />
		</template>
		<ConsoleList :data-source="logs"></ConsoleList>
	</a-page-header>

</template>

<script>
	import ConsoleList from '@/components/ConsoleList.vue'
	import InputModal from '@/components/InputModal.vue'

	import ButtonDelete from '@/components/buttons/ButtonDelete.vue'
	import ButtonSend from '@/components/buttons/ButtonSend.vue'

	import {
		bots,
		updateBots
	} from '@/utils/bots.js'

	import {
		logStore
	} from '@/utils/logStore.js'

	export default {
		data() {
			return {
				showNetLog: true,
				showBotLog: true,
				botFilter: "all",
				showInputCommand: false,
				command: "echo 'Hello'",
				logs: [],
				_bots: []
			};
		},
		components: {
			ConsoleList,
			InputModal,
			ButtonDelete,
			ButtonSend
		},
		watch: {
			botFilter() {
				this.updateLogs()
			}
		},
		methods: {
			clearConsole() {
				logStore.clearLog()
				this.logs.splice(0)
			},
			// sendCommand(content) {
			// 	this.logs.unshift({
			// 		message: ">> " + content
			// 	})
			// 	this.showInputCommand = false
			// },
			updateLogs() {
				this.logs.splice(0)
				logStore.register((log) => {
						if (this.botFilter != "all" && this.botFilter != log.from) return false
						if (log.type == "net" && !this.showNetLog) return false
						if (log.type == "bot" && !this.showBotLog) return false
						return true
					},(log) => {
						this.logs.push(log)
					})
			}
		},
		mounted() {
			updateBots().then(b => {
				this._bots.splice(0)
				b.forEach((item, index) => {
					this._bots.push(item)
				})
			})
			this.updateLogs()
		},

	}
</script>

<style>

</style>
