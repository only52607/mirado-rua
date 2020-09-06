<template>
	
	<a-page-header title="控制台" sub-title="Console" backIcon=false>
		<template v-slot:extra>
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
				
				<template v-for="bot in bots" key = "bs">
					<a-select-option :value="bot.nick">
						{{bot.nick}}
					</a-select-option>
				</template>
				
				
			</a-select>

			<a-button @click="clearConsole">
				<template v-slot:icon>
					<DeleteOutlined />
				</template>
				清空日志
			</a-button>

			<a-button type="primary" @click="sendCommand">
				<template v-slot:icon>
					<SendOutlined />
				</template>
				发送命令
			</a-button>
			
			<a-modal v-model:visible="sendCommandVisible" title="发送命令" @ok="sendCommandOk">
			      <div style="margin-bottom: 16px">
			            <a-input addon-before=">>" v-model:value="command" />
			       </div>
			</a-modal>
			
		</template>

		<a-list item-layout="horizontal" :data-source="logs" class="console-content" size="small">
			<template v-slot:renderItem="{ item, index }">
				<a-list-item>
					{{ item.echo }}
				</a-list-item>
			</template>
		</a-list>
	</a-page-header>

</template>

<script>
	import {
		DeleteOutlined,
		SendOutlined
	} from '@ant-design/icons-vue';

	export default {
		data() {
			return {
				showNetLog: true,
				showBotLog: true,
				botFilter: "全部",
				sendCommandVisible:false,
				command:"echo 'Hello'",
				logs:[]
			};
		},
		components: {
			DeleteOutlined,
			SendOutlined
		},
		props:{
			bots:Object
		},
		methods: {
			filterChange() {

			},
			clearConsole(){
				this.logs.length = 0
			},
			sendCommand(){
				this.sendCommandVisible = true
			},
			sendCommandOk(e){
				this.logs.unshift({ echo :">> " + this.command})
				this.sendCommandVisible = false
			}
			
		}
	};
</script>

<style>
	.console-content {
		height: 500px;
		overflow-y: scroll;
	}
</style>
