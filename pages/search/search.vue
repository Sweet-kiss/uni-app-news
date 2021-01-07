<template>
	<view>
		<navBar @changeSearchText="changeText"></navBar>
		<!-- 搜索历史 -->
		<view v-if="isHistory" class="search_history">
			<view class="search_title_clear">
				<text class="search_history_text">搜索历史</text>
				<text class="clear_btn">清空</text>
			</view>
			<view  v-if="historyLists.length>0" class="tab_list">
				<text class="tablists" v-for="item in historyLists">{{item.name}}</text>
			</view>
			<!-- 搜索内容 -->
			<view v-else class="no-data">
				没有更多数据
			</view>
			<!-- <button type="default" @click="addTest">点击添加</button> -->
		</view>
		<view v-else class="search_listcards">
			<list-scroll class="list-scroll">
			  <list-card :mode = "item.mode" :item="item" v-for="(item, index) in articleLists"></list-card>
			</list-scroll>
		</view>	
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				isHistory: true,
				articleLists: []
			}
		},
		computed: {
			...mapState(['historyLists'])
		},
		onLoad () {
		  //this.getLists()
		},
		methods: {
			changeText(value) {
				if(!value) {
					this.isHistory = true
					clearTimeout(this.timer)
					this.mark = false
					this.getSearch(value)
					return
				}
							
				if(!this.mark){
					this.mark = true
					this.timer = setTimeout(()=> {
						this.mark = false
						this.getSearch(value)
					}, 1000)
				}
				console.log("接收的搜索内容",value)
				
			},
			addTest () {
				this.$store.dispatch('set_historLists',{name:"test"})
			},
			//获取文章列表
			getSearch(value) {
				if(!value) {
					this.articleLists = []
					return
				}
				this.$api.get_search({
					value
				}).then((res)=>{
					this.isHistory = false
					const { data } = res
					console.log(data,"jjjj")
                    this.articleLists = data
				})
			}
		}
	}
</script>

<style lang="scss">
page {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #C8C7CC;
}
.search_history {
	background-color: #fff;
	.search_title_clear {
		padding: 20px 8px;
		font-size: 14px;
		display: flex;
		justify-content: space-between;
		border-bottom: #C8C7CC solid 1px;
		.search_history_text {
			color: #f74610;
		}
		.clear_btn {
			color: #4CD964;
		}
	}
	.tab_list {
		padding: 20px 8px;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		.tablists {
			font-size: 13px;
			padding: 3px 20px;
			border: #666 solid 1px;
			border-radius: 5px;
			margin-right: 10px;
			margin-bottom: 10px;
		}
	}
	.no-data {
		display: flex;
		height: 300px;
		background-color: #fff;
		font-size: 14px;
		justify-content: center;
		align-items: center;
	}
}

</style>
