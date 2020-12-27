<template>
	<view class="tab">
		<scroll-view class="tab_scroll" scroll-x>
			<view class="tab_scroll_box">
				<view 
				  :class="{active:currentIndex===index}" 
				   class="tab_scroll_item" 
				   v-for="(item, index) in tab"
				   @click="clickTab(index)"
				   :key="item.id"
				   >{{item.name}}
				</view>
			</view>	
		</scroll-view>
		<view class="tab_setUp_icon_box">
			<uni-icons type="gear" size="25" color="#666"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			tab: {
				type: Array,
				default() {
					return []
				}
			},
			swiperIndex: {
				type: Number,
				default: 0
			}			
		},		
		data() {
			return {
                currentIndex: 0
			};
		},
		watch: {
			swiperIndex(newVal) {
				console.log(newVal,"lll")
				this.currentIndex = newVal			
			}
		},
		created() {
			// setTimeout(()=>{ 
			// 	console.log(this.tab,"接收")
			// }, 3000);
			
		},
		methods:{
			clickTab(index){
				//console.log(index, "当前tabIndex")
				this.currentIndex = index
				this.$emit('changeTab', index)
			}	
	    }
	}
</script>

<style lang="scss">
.tab {
	width: 100%;
	display: flex;
	box-sizing: border-box;
	border-bottom: #f5f5f5 solid 1px;
	background-color: #fff;
	.tab_scroll {
		flex: 1;
	    overflow: hidden;
		box-sizing: border-box;
		.tab_scroll_box {
			display: flex;
			align-items: center;
			height: 45px;
			flex-wrap: nowrap;
			box-sizing: border-box;
			.tab_scroll_item {
				flex-shrink: 0;
				padding: 0 10px;
				&.active {
					color: red;
				}
			}
		}
	}
	.tab_setUp_icon_box {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 45px;		
		&::after {
			content: '';
			position: absolute;
			top: 12px;
			bottom: 12px;
			left: 0;
			width:1px;
			background-color: #ddd;
		}
	}
}
</style>
