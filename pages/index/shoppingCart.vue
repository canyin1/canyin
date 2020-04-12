<template>
	<view class="page">
		<navbar title="购物车" :backcolorType='2' :whiteback='2' :showKongPanel="true"></navbar>
		<view class="bottom_view">
			<view class="money_view">
				<span class='iconfont icon-gouwuche'></span>
				<view class="money">￥100.00</view>
			</view>
			<view class="buy_btn" @click="payClick">去结算</view>
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
			payClick(){
				uni.navigateTo({
					url:'pay'
				})
			},
		}
	}
</script>

<style>
	.bottom_view {
		background: #F1F1F1;
		height: 100upx;
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 0 12upx;
		box-sizing: border-box;
		box-shadow: 0 -10upx 20upx rgba(0, 0, 0, 0.1);
	}
	
	.money_view {
		display: flex;
		align-items: center;
		color: #FFBA59;
	}
	
	.icon-gouwuche {
		font-size: 60upx;
	}
	
	.money {
		font-size: 32upx;
		padding-left: 10upx;
	}
	
	.buy_btn {
		width: 148upx;
		height: 68upx;
		color: #333;
		font-size: 26upx;
		line-height: 68upx;
		background: #FFBA59;
		border-radius: 44upx;
		text-align: center;
	}
</style>
