
let Downloader = {
	downloadText(text,filename){
		let blob = new Blob([text],{type:"text/plain;charset=utf-8"})
		let url = window.URL.createObjectURL(blob)
		let dom = document.createElement('a')
		dom.href = url
		dom.download = decodeURI(filename)
		dom.style.display = 'none'
		dom.click()
		dom.parentNode.removeChild(dom)
		window.URL.revokeObjectURL(url)
	}
}

export {Downloader}