<template>
	<transition name="fade">
  <div class="about">
    <h1>This is an about page</h1>
	<Hi name = "OOOOONLY" />
  </div>
  </transition>
</template>

<script>
	import Hi from "@/components/Hi.vue"
	export default{
		name :"About",
		components:{
			Hi
		}
	}
</script>