<template>
	<a-affix :offset-top=0>
		<a-layout-header>
			<Logo />
			<div style="float: right;height: 100%;" class="more">
				<a-button @click="$emit('more')" type="link" style="width: 50%;height: 50%;" ghost>
					<MenuOutlined v-slot:icon />
				</a-button>
			</div>
		</a-layout-header>
	</a-affix>
</template>

<script>
	import Logo from '@/components/Logo.vue'
	import {
		MenuOutlined
	} from '@ant-design/icons-vue'
	export default {
		components: {
			Logo,
			MenuOutlined
		},
		data() {
			return {
				showMore: false
			}
		},
		mounted() {
		},
		methods:{
		}
	}
</script>

<style>
	@media screen and (max-width: 960px) {
	    .more {
	        visibility:visible
	    }
	}
	@media screen and (min-width: 960px) {
	    .more {
	        visibility:hidden
	    }
	}
</style>
