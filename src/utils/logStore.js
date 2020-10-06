import {reactive,ref,inject} from 'vue'
const logsSymbol = Symbol('logs')
const logs = reactive([])
function injectLogs(){
	return inject(logsSymbol)
}
function pushLog(){
	logs.push(getJsonLog(log))
}
function clearLogs(){
	logs.splice(0)
}
function getJsonLog(log) {
	if (typeof(log) == "string") {
		return JSON.parse(log)
	}
	return log
}
export default{
	logsSymbol,
	logs,
	injectLogs,
	pushLog,
	clearLogs
}
// export default {
// 	logs: [],
// 	logCallback: () => {},
// 	logFilter: (log) => {
// 		return false
// 	},
// 	pushLog(log) {
// 		let jsonLog = this.getJsonLog(log)
// 		this.logs.push(jsonLog)
// 		if (this.logFilter(jsonLog)) {
// 			this.logCallback(jsonLog)
// 		}
// 	},
// 	clearLog() {
// 		this.logs.splice(0)
// 	},
// 	register(filter, callback) {
// 		this.logCallback = callback
// 		this.logFilter = filter
// 		this.logs.filter(filter).forEach(callback)
// 	},
// 	getJsonLog(log) {
// 		if (typeof(log) == "string") {
// 			return JSON.parse(log)
// 		}
// 		return log
// 	}
// }
