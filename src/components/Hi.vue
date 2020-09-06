<template>
	<h1>
		{{pre}} {{name}}!
	</h1>
	<h1> to upper case: {{content.toUpperCase()}} </h1>
	<input v-model = "content" />
	<button v-on:click = "clickbutton" > change pre</button>
	<button v-on:click = "switchrouter" > switch to index</button>
</template>

<script>
	export default{
		name : "Hi",
		props:{
			name:String
		},
		data:()=>{
			return {
				content:"",
				pre:"Hi"
			}
		},
		methods:{
			clickbutton:function(){
				if(this.pre=="Hi"){
					this.pre = "Hello"
				}else{
					this.pre = "Hi"
				}
			},
			switchrouter:function(){
				this.$router.replace("/")
			}
		}
	}
</script>

<style>
</style>
