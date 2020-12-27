<template>
<swiper class="list_swiper"  @change="change" :current="tabCurrentIndex">
	<swiper-item class="swiper_box" v-for="(item, index) in listlength" :key="index">
	   <list-item :articleLists = "listCatchData[index]"></list-item>
	</swiper-item>		
</swiper>
</template>

<script>
	import listItem from './list-item.vue'
	export default {
		props:{
			listlength: {
				type: Number,
				default: 0
			},
			tabCurrentIndex: {
				type: Number,
				default: 0
			},
			tab:{
				type: Array,
				default() {
					return []
				}
			}
		},
		watch: {
			tab (newVal) {
			  console.log(newVal,"ccc")
			  if(newVal.length === 0) return 
			  this.getLists(this.tabCurrentIndex)
			}
		},
		created() {
			
		},
		data() {
			return {
				articleLists: [],
				listCatchData:{}
			};
		},
		components:{
			listItem
		},
		methods:{
			change(e){				
				const {
					current
				} = e.detail
				//console.log(current,"当前swiper")
				this.$emit('change', current)
	            //不重复请求是listCatchData的当前数据为空或者不存在的事后 调用请求 ,否则不发送请求
				// setTimeout(()=>{
				// 	console.log(this.listCatchData[current],"当前的这一页的数据")
				// },3000)				
				if(!this.listCatchData[current]||this.listCatchData[current].length===0) {
					this.getLists(current)
				}				
			},
			//获取文章列表
			getLists(current) {
				//console.log(this.tab,"///")
				this.$api.get_list({
					classify: this.tab[current].name,
					page: 1,
					pageSize: 5
				}).then((res)=>{
					console.log(res, "文章列表")
					const { data } = res
					//this.listCatchData[current] = data
					this.$set(this.listCatchData, current, data)
				})
			}
		}
	}
</script>

<style lang="scss">	
.list_swiper{
	height: 100%;
	box-sizing: border-box;
	.swiper_box {
		height: 100%;
		box-sizing: border-box;
		.list-scroll {
			height: 100%;
	    }
    }	
}

</style>
