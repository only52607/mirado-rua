<template>
	<a-list item-layout="horizontal" class="console-content" size="small">
		<template v-slot:renderItem="{ item, index }">
			<a-list-item class="console-list-item">
				<a-tag color="cyan">
				    {{item.type}}
				</a-tag>
				<a-tag color="blue">
				    {{item.from}}
				</a-tag>
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
		min-width: 0 !important;
		overflow-y: scroll;
	}
	.console-list-item{
		text-align: left;
	}
</style>
