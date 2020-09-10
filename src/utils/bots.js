
var bots = []
function updateBots(){
	return new Promise((resolve,reject)=>{
		api.get("/bots").then(response => {
			bots.splice(0)
			response.data.forEach((item,index)=>{
				bots.push(item)
			})
			resolve(bots)
		}).catch(err => {
			bots.splice(0)
			reject(err)
		})
	})
}
export {
	bots,
	updateBots
}