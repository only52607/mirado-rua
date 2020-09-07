<template>
	<a-list item-layout="horizontal" class="console-content" size="small">
		<template v-slot:renderItem="{ item, index }">
			<a-list-item>
				{{ item.message }}
			</a-list-item>
		</template>
	</a-list>
</template>


<script>

</script>

<style>
	.console-content {
		height: 500px;
		overflow-y: scroll;
	}
</style>
