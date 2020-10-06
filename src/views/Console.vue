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
					<template v-for="bot in bots" key="bs">
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
	
	import { getCurrentInstance,reactive,ref,watchEffect,computed } from 'vue'
	
	export default {
		components: {
			ConsoleList,
			InputModal,
			ButtonDelete,
			ButtonSend
		},
		setup(){
			const {ctx} = getCurrentInstance()
			const showNetLog = ref(true)
			const showBotLog = ref(true)
			const botFilter = ref("all")
			const showInputCommand = ref(false)
			const command = ref("echo 'Hello'")
			const injectLogs = ctx.$logStore.injectLogs()
			const logs = computed(()=>{
				return injectLogs.filter(log=>{
					if (botFilter != "all" && botFilter != log.from) return false
					if (log.type == "net" && !showNetLog) return false
					if (log.type == "bot" && !showBotLog) return false
					return true
				})
			})
			const bots = ctx.$botStore.injectBots()
			function clearConsole() {
				ctx.$logStore.clearLogs()
			}
			return {
				showNetLog,
				showBotLog,
				botFilter,
				showInputCommand,
				command,
				logs,
				bots,
				clearConsole
			}
		}
	}
</script>

<style>

</style>
