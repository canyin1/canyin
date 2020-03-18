<template>
	<view class="page">
		<navbar title="商品评论" :backcolorType='2' :whiteback='2' :showKongPanel="true"></navbar>
		<view class="tab_view" :style="{top:kongHeight+'px'}">
			<view class="tab" :class="type==0?'tab_avtive':''" @click="tabClick(0)">全部<view>(100)</view>
			</view>
			<view class="tab" :class="type==1?'tab_avtive':''" @click="tabClick(1)"><span class='iconfont icon-good'></span>
				<view>(50)</view>
			</view>
			<view class="tab" :class="type==2?'tab_avtive':''" @click="tabClick(2)"><span class='iconfont icon-good icon-good1'></span>
				<view>(50)</view>
			</view>
		</view>
		<view class="commentDetail_view">
			<commentDetail v-for='(item,index) in comment' :key='index' @click='addComment'></commentDetail>
		</view>
		
	</view>
</template>

<script>
	import navbar from "@/components/navbar/navbar.vue"
	import commentDetail from "@/components/commentDetail/commentDetail.vue"
	export default {
		components: {
			navbar,
			commentDetail
		},
		created: function(e) {
			this.kongHeight = this.$store.state.kongHeight;
		
		},
		data() {
			return {
				type: 0,
				level: 1.5,
				comment:['1','2','3','4','5'],
				kongHeight:''
			}
		},
		methods: {
			tabClick(type) {
				this.type = type
			},
			addComment(){
				uni.navigateTo({
					url:'addComment'
				})
			},
		}
	}
</script>

<style>
	page {
		background: #F5F5F5;
	}

	.tab_view {
		width: 100%;
		display: flex;
		flex-direction: row;
		background: #FFFFFF;
		position: fixed;
		left: 0;
		z-index: 999999;
	}

	.tab {
		width: 33.3%;
		text-align: center;
		height: 46upx;
		line-height: 46upx;
		padding: 22upx 0;
		font-size: 32upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tab view {
		padding-left: 10upx;
		color: #333333;
	}

	.tab_avtive {
		position: relative;
	}

	.tab_avtive::after {
		content: '';
		width: 100upx;
		position: absolute;
		left: calc(50%-50upx);
		bottom: 0;
		height: 4upx;
		border-radius: 4upx;
		background: #FFBA59;
	}

	.icon-good {
		color: #FFBA59;
		font-size: 32upx
	}

	.icon-good1 {
		font-size: 32upx;
		color: #999;
		display: inline-block;
		transform: rotateX(180deg);
	}
	.commentDetail_view{
		padding-top: 90upx;
		position: relative;
		z-index: 1;
		padding-bottom: 40upx;
	}
</style>
