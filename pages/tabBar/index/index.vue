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
				//当前tab 的值
				tabCurrentIndex: 0
			}
		},
		onLoad() {
		  uni.$on('updatemyLabel', (res)=>{
			  console.log("我知道了")
			  this.tabCurrentIndex = 0
			  this.swiperIndex = 0
			  this.getLabel()
		  })
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
				this.tabCurrentIndex  = current
			},
            getLabel() {
			    var _that = this
			    this.$api.get_label().then((res)=>{
				   console.log(res,"获取的数据")
				   const { data } = res	
				  let oldData = []
				    data.forEach(item=> {
						if(item.current===true) {
							oldData.push(item)
						}
					})
				   oldData.unshift({
					   name: "全部"
				   })
				   this.tablist = oldData
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
	width: 100%;
	flex-direction: column;
	.list {
		flex: 1;
		height: 100%;
		overflow: hidden;
		box-sizing: border-box;
	}
}
</style>
