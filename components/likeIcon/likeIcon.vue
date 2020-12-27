<template>
	<view class="like_icons" @click.stop="Collection">
		<uni-icons :type="isLike?'heart-filled':'heart'" size="20" color="#f3200a"></uni-icons>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		data() {
			return {
				isLike: false
			};
		},
		watch: {
			item (newVal) {
			   conaole.log(newVal,"jjjddgddgdgg")
			   this.isLike = newVal.is_like
			}
		},
		created () {				
			console.log(this.item, "kkkkkk")
			this.isLike = this.item.is_like
		},
		methods: {
			Collection () {
				this.isLike = !this.isLike
				console.log("收藏成功")
				this.updateLiskes ()
			},
			updateLiskes () {
				this.$api.update_like({				
					article_id: this.item._id
				}).then((res)=>{
					console.log(res,"nnn")
				})
			}
		}
	}
</script>

<style lang="scss">
	.like_icons {
		position: absolute;
		right: 5px;
		top:0;
	}
</style>
