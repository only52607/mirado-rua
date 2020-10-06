import { createApp,ref } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import Antd from 'ant-design-vue'
import api from "@/utils/Api.js"
import 'ant-design-vue/dist/antd.css'

import "@/utils/ErrorUtil.js"
import EventBus from "@/utils/EventBus.js"
import BotStore from "@/utils/BotStore.js"
import LogStore from "@/utils/LogStore.js"

window.__proto__.api = api
const app = createApp(App)

app.config.globalProperties.$api = api
app.config.globalProperties.$eventBus = EventBus
app.config.globalProperties.$botStore = BotStore
app.config.globalProperties.$logStore = LogStore


app.use(router)
app.use(Antd)
app.provide(BotStore.botsSymbol,ref([]))
app.provide(LogStore.logsSymbol,LogStore.logs)
app.mount('#app')