<template>

	<a-page-header title="控制台" sub-title="Console" backIcon=false>
		<template v-slot:extra>
			<a-space align="start">
				<a-checkbox v-model:checked="showNetLog">
					网络日志
				</a-checkbox>
				<a-checkbox v-model:checked="showBotLog"><!-- @change="updateLogs" -->
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
				<ButtonDelete @click="$logStore.clearLogs()" text="清空日志" />
				<!-- <ButtonSend type="primary"  @click="showInputCommand=true" text="发送命令" /> -->
			</a-space>
			<!-- <InputModal title="发送命令" before=">>" v-model:visible="showInputCommand" @finish="sendCommand" /> -->
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
			const allLogs = ctx.$logStore.logs
			const logs = computed(()=>{
				return allLogs.filter(log=>{
					if (botFilter.value != "all" && botFilter.value != log.from) return false
					if (log.type == "net" && !showNetLog.value) return false
					if (log.type == "bot" && !showBotLog.value) return false
					return true
				})
			})
			return {
				showNetLog,
				showBotLog,
				botFilter,
				logs,
				bots:ctx.$botStore.bots
			}
		}
	}
</script>

<style>
</style>