<template>
	<view class="navBar">
		<view class="navBar_fixed">	
			<view v-if="isSearch" class="search_backarrow_icon" @click="back" >
				<uni-icons type="back" size="26" color="#fff"></uni-icons>
			</view>
			<view  class="navBar_input" :class="{activeSearch: isSearch}" @click.stop="openSearch">				
				<view v-if="!isSearch"  class="navBar_search_input">
					<view  class="navBar_search_icon">
						<uni-icons type="search" size="16" color="#999"></uni-icons>
					</view>
					<input 					  
					   class="navBar_search_input_text" 
					   type="text" 
					   value="" 
					   placeholder="请输入您要搜索的内容"/>
				</view>
				
				<view v-else class="search_input">
					<input
					   @input = "changeSearchText"
					   class="navBar_search_input_text" 
					   type="text" 
					   v-model="search_text"
					   placeholder="请输入您要搜索的内容"/>
				</view>
			</view>	
					

					
		</view>
		<view style="height: 45px;"></view>
	</view>
</template>

<script>
	export default {
		props:{
			isSearch: {
				type: Boolean,
				default:true
			}		
		},
		data() {
			return {
               search_text:""
			};
		},
		methods: {
			back () {
				uni.switchTab({
					url: '/pages/tabBar/index/index'
				})
			},
			openSearch () {
				if(this.isSearch) return
				uni.navigateTo({
					url: "/pages/search/search"
				})
			},
			changeSearchText (e) {
			  const { value } = e.detail
			  //console.log(value, "搜索内容")
			  this.$emit("changeSearchText", value)
			}
		}
	}
</script>

<style lang="scss">
.navBar {
	.navBar_fixed {
		position: fixed;
		top:0;
		left: 0;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #f70e0e;
		padding: 0 15px;
		height: 45px;
		box-sizing: border-box;
		z-index: 99;
		.navBar_input {
			display: flex;
			background-color: #fff;
			width: 100%;
			padding: 5px 10px;
			height: 30px;
			box-sizing: border-box;
			border-radius: 30px;
			.navBar_search_icon {
				width: 20px;
				height: 20px;
				margin-right: 10px;
			}
			.navBar_search_input {
				width: 100%;
				.navBar_search_input_text {
					width: 100%;
					color: #333;
					font-size: 14px;
				}
			}
			&.activeSearch {
				border-radius: 5px;
				.search_input {
					width: 100%;
					.navBar_search_input_text {
						color: #333;
						font-size: 14px;
					}
				}
			}
		}		
	}

}
</style>
