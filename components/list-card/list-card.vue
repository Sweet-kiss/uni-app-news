<template>
	<view>
		<!-- 基础卡片 -->
		<view v-if="mode === 'base'" class="list_card">
			<view class="list_card_image_box">
				<image class="list_card_image" :src="item.cover[0]" mode=""></image>
			</view>
			<view class="list_card_content">
				<view class="list_card_text">
					<text>{{item.title}}</text>
				</view>
				<view class="list_card_classifyaddsee">
					<view class="list_card_classify">{{item.classify}}</view>
					<view class="list_card_see">{{item.browse_count}}浏览</view>
				</view>
			</view>
		</view>	
			
		<!-- 多图卡片 -->
		<view v-if="mode === 'column'" class="list_card mode_column">
			<view class="list_card_content">
				<view class="list_card_text">
					<text>{{item.title}}</text>
				</view>
				<view class="list_card_image_box">
					<view v-if="index < 3" class="list_card_image_lists" v-for="(item, index) in item.cover">
						<image class="list_card_image" :src="item" mode=""></image>
					</view>		
				</view>
				<view class="list_card_classifyaddsee">
					<view class="list_card_classify">{{item.classify}}</view>
					<view class="list_card_see">{{item.browse_count}}浏览</view>
				</view>
			</view>
		</view>			

		<!-- 大图卡片 -->
		<view v-if="mode === 'image'" class="list_card mode_large">
			<view class="list_card_content">
				<view class="list_card_text">
					<text>{{item.title}}</text>
				</view>
				<view class="list_card_image_box">
					<view class="list_card_image_lists">
						<image class="list_card_image" :src="item.cover[0]" mode=""></image>
					</view>		
				</view>
				<view class="list_card_classifyaddsee">
					<view class="list_card_classify">{{item.classify}}</view>
					<view class="list_card_see">{{item.browse_count}}浏览</view>
				</view>
			</view>
		</view>							
	</view>
</template>

<script>
	export default {
		props:{
			mode: {
				type: String,
				default: "base"
			},
			item: {
				type: Object,
				default(){
					return {}
				}
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
page {
	background-color: #fbfafa;
}
.list_card {
	display: flex;
	box-sizing: border-box;
	align-items: center;
	padding: 10px 5px;
	border: #f5f5f5 solid 1px;
	margin-bottom: 3px;
	background-color: #fff;
	.list_card_image_box {
		width: 70px;
		height: 70px;
		padding: 0 3px;
		overflow: hidden;
		.list_card_image {
			width: 100%;
			height: 100%;
		}
	}
	.list_card_content {
		flex: 1;
		display: flex;
		flex-direction: column;
		.list_card_text {
			width: 100%;
			overflow: hidden;
			font-size: 14px;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			margin-bottom: 5px;
	    }
		.list_card_text {
			width: 100%;
			overflow: hidden;
			font-size: 14px;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			margin-bottom: 5px;
		}
		.list_card_classifyaddsee {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 5px;
			.list_card_classify {
				border: #f70e0e solid 1px;
				color: #f70e0e;
				padding: 2px 5px;
				text-align: center;
				font-size: 13px;
				border-radius: 8px;				
			}
			.list_card_see {
				font-size: 12px;
				color: #787676;
			}
		}
	}
	&.mode_column {
		width: 100%;
		.list_card_content {
			.list_card_text {
				width: 100%;
				overflow: hidden;
				font-size: 16px;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
				margin-bottom: 5px;
			}
			.list_card_image_box {
				padding: 5px 0;
				width: 100%;
				justify-content: center;
				display: flex;
				.list_card_image_lists {
					flex: 1;
					padding: 0 3px;
				}				
			}			
		}		
	}
	&.mode_large {
		width: 100%;
		.list_card_content {
			.list_card_text {
				width: 100%;
				overflow: hidden;
				font-size: 16px;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
				margin-bottom: 5px;
			}
			.list_card_image_box {
				width: 100%;
				height: 100px;
				padding: 5px 0;
				.list_card_image_lists {
					width: 100%;
					height: 100%;
					.list_card_image{
						width: 100%;
						height: 100%;
					}
				}				
			}			
		}		
	}
}
</style>
