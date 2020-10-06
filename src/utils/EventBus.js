import api from "@/utils/Api.js"
const eventBus = new EventBus(api.serverUrl + "/eb")
export default eventBus