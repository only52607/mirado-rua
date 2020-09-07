<template>
	<a-modal v-model:visible="show" title="发送命令" @ok="ok">
	      <div style="margin-bottom: 16px">
	            <a-input addon-before=">>" v-model:value="v" />
	       </div>
	</a-modal>
</template>

<script>
	export default{
		data(){
			return {
				v:"echo 'hello'"
			}
		},
		methods:{
			ok(){
				this.$emit("send",{
						content : this.v
					}
				)
			}
		},
		props:{
			show:Boolean
		}
	}
</script>

<style>
</style>
