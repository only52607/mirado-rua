import {reactive,ref} from 'vue'

const logs = reactive([])
function pushLog(log){
	logs.push(getJsonLog(log))
}
function clearLogs(){
	logs.splice(0)
}
function getJsonLog(log) {
	if (typeof(log) == "string") return JSON.parse(log)
	return log
}
export default{
	logs,
	pushLog,
	clearLogs
}
