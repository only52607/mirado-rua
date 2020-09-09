<template>
	<a-modal ref="md" @ok="ok">
	      <div style="margin-bottom: 16px">
	            <a-input :addon-before="before" v-model:value="value" />
	       </div>
	</a-modal>
</template>

<script>
	export default{
		data(){
			return {
				value:""
			}
		},
		methods:{
			ok(){
				this.$emit("finish",this.value)
			}
		},
		props:{
			before:String
		}
	}
</script>

<style>
</style>
