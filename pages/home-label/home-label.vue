<template>
	<view class="label">
	    <view class="label-box">
	    	<view class="label-header">
	    		<view class="label-title">我的标签</view>
				<view class="label-edit" @click="changeClose">{{isShowClose?"完成":"编辑"}}</view>
	    	</view>
			<uni-load-more v-if="loading" status="loading" iconType="snow"></uni-load-more>
			<view v-if="!loading" class="label-content">				
				<view class="label-content__item" v-for="(item, index) in mylabelList">
					{{item.name}}
					<uni-icons 
					  v-if="isShowClose" 
					  class="icons-close" 
					  type="clear" size="20" 
					  color="red"
					  @click="addlabel(index)"
					  >
					</uni-icons>
				</view>				
			</view>
			<view v-if="mylabelList.length===0&&!loading" class="no-data">
				没有数据
			</view>
			
		<view class="label-header">
			<view class="label-title">标签推荐</view>
		</view>
		<uni-load-more v-if="loading" status="loading" iconType="snow"></uni-load-more>
		<view  v-if="!loading" class="label-content">
			<view class="label-content__item" v-for="(item,index) in referlabelList" @click="addMylabel(index)">
				{{item.name}}
			</view>
		</view>	
		<view v-if="referlabelList.length===0&&!loading" class="no-data">
			没有数据
		</view>
	    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShowClose: false,
				mylabelList: [],
				referlabelList: [],
				loading: true
			}
		},
		onLoad() {
			this.getLabel()
		},
		methods: {
			changeClose() {
				if(this.isShowClose) {					
					const newMylabel = []
					this.mylabelList.forEach(item=>{
						newMylabel.push(item._id)
					})
					console.log(newMylabel)
					uni.showLoading()
					this.$api.update_label({
						label: newMylabel
					}).then((res)=> {
						console.log(res)
						uni.hideLoading()
						uni.showToast({
							title:"更新成功",
							icon: 'none'
						})
						//更新完成后向首页发送事件 通知它进行更新页面
						uni.$emit('updatemyLabel')
					})
				}
				this.isShowClose = !this.isShowClose
			},
			addlabel(index) {
				this.referlabelList.push(this.mylabelList[index])
				this.mylabelList.splice(index, 1)
			},
			addMylabel(index) {
				if(!this.isShowClose) return 
				this.mylabelList.push(this.referlabelList[index])
				this.referlabelList.splice(index, 1)
			},
			getLabel () {
				this.loading = true
				 this.$api.get_label().then((res)=>{
					 console.log(res)
					 const { data } = res
					 this.mylabelList = data.filter(item => item.current)
					 this.referlabelList = data.filter(item => !item.current)
					 this.loading = false
				 })
			}
		}
	}
</script>

<style lang="scss">
page {
	background-color: #f5f5f5;
}
.label {
	.label-box {
		background-color: #fff;
		margin-bottom: 10px;
		.label-header {
			display: flex;
			justify-content: space-between;
			padding: 10px 15px;
			font-size: 14px;
			color: #666;
			border-bottom: 1px #f5f5f5 solid;
			.label-edit {
				color: #30b33a;
				font-weight: bold;
			}
		}
		.label-content {
			display: flex;
			flex-wrap: wrap;
			padding: 15px;
			padding-top: 0;
			.label-content__item {
				position: relative;
				padding: 2px 5px;
				margin-top: 12px;
				margin-right: 10px;
				border-radius: 5px;
				border: 1px #666 solid;
				font-size: 14px;
				color: #666;
				.icons-close {
					position: absolute;
					top: -10px;
					right: -10px;
				}
			}
		}
	}
}
.no-data {
	width: 100%;
	text-align: center;
	height: 100px;
	line-height: 100px;
	color: #ccc;
	font-size: 14px;
}
</style>
