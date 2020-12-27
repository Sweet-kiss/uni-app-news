<template>
    <scroll-view class="list-scroll" scroll-y @scrolltolower="loadmore">
	    <view class="list-scroll_box">
			<slot></slot>
	    </view>			
    </scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			loadmore(){
				this.$emit("loadmore")
			}
		}
	}
</script>

<style lang="scss">
	.list-scroll {
		height: 100%;
		box-sizing: border-box;
		.list-scroll_box {
			height: 100%;
			box-sizing: border-box;		
		}
	}
</style>
