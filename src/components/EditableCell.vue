<template>
	<div class="editable-cell">
		<div v-if="editable" class="editable-cell-input-wrapper">
			<a-input v-model:value="value" @pressEnter="check" />
			<CheckOutlined class="editable-cell-icon-check" @click="check" />
		</div>
		<div v-else class="editable-cell-text-wrapper">
			{{value || ' '}}
			<EditOutlined class="editable-cell-icon" @click="edit" />
		</div>
	</div>
</template>

<script>
	import {
		CheckOutlined,
		EditOutlined
	} from '@ant-design/icons-vue'
	export default {
		components: {
			CheckOutlined,
			EditOutlined,
		},
		props: {
			text: String,
			onChange: Function,
		},
		data() {
			return {
				value: this.text,
				editable: false,
			};
		},
		methods: {
			handleChange(e) {
				const value = e.target.value;
				this.value = value;
			},
			check() {
				this.editable = false;
				this.$emit('change', this.value);
			},
			edit() {
				this.editable = true;
			},
		},
	}
</script>

<style lang="less">
	.editable-cell {
		position: relative;

		.editable-cell-input-wrapper,
		.editable-cell-text-wrapper {
			padding-right: 24px;
		}

		.editable-cell-text-wrapper {
			padding: 5px 24px 5px 5px;
		}

		.editable-cell-icon,
		.editable-cell-icon-check {
			position: absolute;
			right: 0;
			width: 20px;
			cursor: pointer;
		}

		.editable-cell-icon {
			line-height: 18px;
			display: none;
		}

		.editable-cell-icon-check {
			line-height: 28px;
		}

		.editable-cell-icon:hover,
		.editable-cell-icon-check:hover {
			color: #108ee9;
		}

		.editable-add-btn {
			margin-bottom: 8px;
		}
	}

	.editable-cell:hover .editable-cell-icon {
		display: inline-block;
	}
</style>
