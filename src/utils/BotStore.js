 import {reactive,ref,inject} from 'vue'
 const botsSymbol = Symbol('bots')
 async function getBots(){
	 let result = await api.get("/bots")
	 return result
 }
 async function updateBots(){
	 let bots = inject(botsSymbol)
	 bots.value = await getBots()
 }
function injectBots(){
	return inject(botsSymbol)
}
const recentBotId = ref(0)
export default {
	botsSymbol,
	getBots,
	updateBots,
	injectBots,
	recentBotId
}