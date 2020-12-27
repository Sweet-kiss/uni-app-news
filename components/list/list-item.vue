<template>
	<list-scroll class="list-scroll" @loadmore="loadmore">
	  <list-card 
	    :item="item"
	    :mode = "item.mode" 
		v-for="(item, index) in articleLists">
	  </list-card>
	  <uni-load-more v-if="articleLists.length > 5" :status="load.loading" iconType="circle"></uni-load-more>
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
			},
			load: {
				type: Object,
				default () {
					return {
						loading: "loading"
					}
				}
			}
		},
		created(){
			//console.log(this.load,"load")
		},
		methods:{
			loadmore () {
			   this.$emit("loadmore")
			}
		}
	}
</script>

<style lang="scss">
	.list-scroll {
		height: 100%;
	}
</style>
