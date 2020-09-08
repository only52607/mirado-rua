import {
	createApp
} from 'vue'
import App from '@/App.vue'
import router from '@/router'
import Antd from 'ant-design-vue'
import api from "@/api.js"

import 'ant-design-vue/dist/antd.css'
import VueCodeMirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'


window.__proto__.api = api

createApp(App).use(router).use(Antd).use(VueCodeMirror).mount('#app')
