<template>
	<a-page-header title="控制台" sub-title="" backIcon=false>
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
				<a-select-option value="lucy">
					Lucy
				</a-select-option>
				<a-select-option value="disabled" disabled>
					Disabled
				</a-select-option>
				<a-select-option value="Yiminghe">
					yiminghe
				</a-select-option>
			</a-select>

			<a-button>
				<template v-slot:icon @click="clearConsole">
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

		<a-list item-layout="horizontal" :data-source="data" class="console-content">
			<template v-slot:renderItem="{ item, index }">
				<a-list-item>
					<a-list-item-meta description="">
						<template v-slot:title>
							<span>{{ item.title }}</span>
						</template>
					</a-list-item-meta>
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
				command:"echo 'Hello'"
			};
		},
		components: {
			DeleteOutlined,
			SendOutlined
		},
		props: {
			data: Object
		},
		methods: {
			filterChange() {

			},
			clearConsole(){
				
			},
			sendCommand(){
				this.sendCommandVisible = true
			},
			sendCommandOk(e){
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
