Error.prototype.checkData = function(){
	if(this.response){
		return this.response.data
	}else{
		return "连接服务器失败！"
	}
}