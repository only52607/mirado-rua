<template>
	    <transition name="fade">
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
	<CreateBot />
    <HelloWorld msg="Welcome to Your Vue.js App"/>
	
  </div>
  </transition>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import CreateBot from '@/views/CreateBot.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
	CreateBot
  }
}
</script>
