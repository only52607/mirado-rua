import {
	reactive,
	ref,
} from 'vue'
import api from "@/utils/Api.js"

const bots = ref([])
const recentBotId = ref(0)

async function updateBots() {
	let response = await api.get("/bots")
	bots.value = response.data
}

export default {
	bots,
	updateBots,
	recentBotId
}
