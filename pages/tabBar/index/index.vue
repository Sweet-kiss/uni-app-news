<template>
	<view class="home">
		<!-- 我是自定义导航栏 -->
	   <navBar></navBar>
	   <tab :tab="tablist" :swiperIndex = "swiperIndex" @changeTab="changeTab"></tab>
	   <view class="list">
		  <list 
		    :listlength = "tablist.length" 
			@change = "change" 
			:tabCurrentIndex = "tabCurrentIndex"
			:tab="tablist"
			>
		  </list>
	   </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tablist: [],
				swiperIndex: 0,
				tabCurrentIndex: 0
			}
		},
		onLoad() {
          this.getLabel()
		},
		methods: {
			//接收tab组件发送的changeTab，并获取当前swiper下标
			changeTab (tapIndex) {
				console.log('当前点击tap的值：', tapIndex);
				this.tabCurrentIndex = tapIndex
			},
			//接收list组件发送的changeswiper，并获取当前swiper下标
			change (current) {
				//console.log('当前swiper的值：',current);
				this.swiperIndex = current
			},
            getLabel() {
			    var _that = this
			    this.$api.get_label().then((res)=>{
				   //console.log(res,"获取的数据")
				   const { data } = res				   
				   _that.tablist = data.data
				   console.log(_that.tablist,"hhxxxas")
				   _that.tablist.unshift({
					   name: "全部"
				   })
			    })
		    }
		}
	}
</script>

<style lang="scss">
page {
	height: 100%;
	display: flex;
}
.home {
	display: flex;
	flex-direction: column;
	.list {
		flex: 1;
		height: 100%;
		overflow: hidden;
		box-sizing: border-box;
	}
}
</style>
