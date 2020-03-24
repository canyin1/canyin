<template>
	<view class="page">
		<navbar title="商品评论" :backcolorType='2' :whiteback='2' :showKongPanel="true"></navbar>
		<!-- <view class="tab_view" :style="{top:kongHeight+'px'}">
			<view class="tab" :class="type==0?'tab_avtive':''" @click="tabClick(0)">全部<view>(100)</view>
			</view>
			<view class="tab" :class="type==1?'tab_avtive':''" @click="tabClick(1)">
				
			</view>
			<view class="tab" :class="type==2?'tab_avtive':''" @click="tabClick(2)">
				<view>(50)</view>
			</view>
		</view> -->
		<view class="tab_view" :style='{top:heights +"px"}'>
			<view class="tab_box">
				<view class="tab" :class="{active:type==0}" @click="tabClick(0)">全部<view>(100)</view></view>
				<view class="tab" :class="{active:type==1}" @click="tabClick(1)"><span class='iconfont icon-good' :class='{active:type==1}'></span><view>(50)</view></view>
				<view class="tab" :class="{active:type==2}" @click="tabClick(2)"><span class='iconfont icon-good icon-good1' :class='{active:type==2}'></span><view>(50)</view></view>
			</view>
		</view>
		<view class="kongHeights"></view>
		<view class="commentDetail_view">
			<commentDetail v-for='(item,index) in comment' :key='index' ></commentDetail>
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
		onReady() {
			this.heights = this.$store.state.kongHeight
		},
		created: function(e) {
			this.kongHeight = this.$store.state.kongHeight;
		
		},
		data() {
			return {
				heights:'',
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
		}
	}
</script>

<style>
	page {
		background: #F5F5F5;
	}
.tab_view {
		height: 68upx;
		width: 100%;
		background: #FFFFFF;
		position: fixed;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 9999999;
	}
	.tab_box{
		height: 48upx;
		border-radius: 64upx;
		background: #F5F5F5;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.tab{
		width: 200upx;
		font-size: 28upx;
		color: #333333;
		text-align: center;
		line-height: 48upx;
		height: 48upx;
		border-radius: 64upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.tab view{
		padding-left: 10upx;
	}
	.active{
		background: #FFBA59 !important;
		color: #FFFFFF !important;
	}
	.kongHeights{
		height: 68upx;
		width: 100%;
		opacity: 0;
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
		position: relative;
		z-index: 1;
		padding-bottom: 40upx;
	}
</style>
