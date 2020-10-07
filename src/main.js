import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import Antd from 'ant-design-vue'
import api from "@/utils/Api.js"
import 'ant-design-vue/dist/antd.css'

import "@/utils/ErrorUtil.js"
import EventBus from "@/utils/EventBus.js"
import BotStore from "@/utils/BotStore.js"
import LogStore from "@/utils/LogStore.js"

const app = createApp(App)
app.config.globalProperties.$api = api
app.config.globalProperties.$eventBus = EventBus
app.config.globalProperties.$botStore = BotStore
app.config.globalProperties.$logStore = LogStore
// console.log(app.config)
app.use(router)
app.use(Antd)
app.mount('#app')