<template>
	<view class="page">
		<navbar title="我的收藏" :backcolorType='2' :whiteback='2' :showKongPanel="true"></navbar>
		<view class="goods_view">
			<view class="goods">
				<view class="goods_img_view"><image class="goods_img" src="/static/微信图片_20200318092008.jpg"></image></view>
				<view class="goods_name_view">
					<view class="goods_name">什么菜</view>
					<view class="goods_intro">介绍一下</view>
					<view class="cash_view">
						<view class="cash">￥10.00</view>
						<view class="num">月售20</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import navbar from "@/components/navbar/navbar.vue"
	export default{
		components: {
			navbar
		},
		data(){
			return{
				
			}
		},
		onLoad() {
			
		},
		methods:{
			
		}
	}
</script>

<style>
	page{
		background: #F5F5F5;
	}
	.goods{
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 12upx 24upx;
		background: #FFFFFF;
		box-sizing: border-box;
		border-bottom: 2upx solid #F5F5F5;
	}
	.goods_img_view{
		font-size: 0;
	}
	.goods_img{
		width: 240upx;
		height: 240upx;
		border-radius: 10upx;
	}
	.goods_name_view{
		width: calc(100% - 240upx);
		height: 240upx;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-between;
		padding: 24upx 0;
		padding-left: 20upx;
		box-sizing: border-box;
	}
	.goods_name{
		font-size: 28upx;
		color: #333333;
		font-weight: 500;
	}
	.goods_intro{
		font-size: 24upx;
		color: #999999;
	}
	.cash_view{
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		justify-content: space-between;
		width: 100%;
	}
	.cash{
		font-size: 40upx;
		line-height: 1;
		color: #FF374E;
	}
	.num{
		font-size: 24upx;
		color: #999999;
	}
</style>
