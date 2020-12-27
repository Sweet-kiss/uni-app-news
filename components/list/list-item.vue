<template>
	<list-scroll class="list-scroll">
	  <list-card 
	    :item="item"
	    :mode = "item.mode" 
		v-for="(item, index) in articleLists">
	  </list-card>
	  <uni-load-more status="loading" iconType="circle"></uni-load-more>
	</list-scroll>
</template>

<script>
	export default {
		props:{
			articleLists: {
				type: Array,
				default () {
					return []
				}
			}
		}
	}
</script>

<style lang="scss">
	.list-scroll {
		height: 100%;
	}
</style>
