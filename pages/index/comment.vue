<template>
	<view class="page">
		<navbar title="商品评论" :backcolorType='2' :whiteback='2' :showKongPanel="true"></navbar>
		<view class="tab_view">
			<view class="tab">全部(100)</view>
			<view class="tab"><span class='iconfont icon-good'></span>(50)</view>
			<view class="tab"><span class='iconfont icon-good icon-good1'></span>(50)</view>
		</view>
	</view>
</template>

<script>
	import navbar from "@/components/navbar/navbar.vue"
	export default {
		components: {
			navbar
		},
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
	}

	.tab {
		width: 33.3%;
		text-align: center;
		line-height: 1;
		padding: 32upx 0;
		font-size: 32upx;
	}

	.icon-good {
		color: #FFBA59;
		font-size: 32upx
	}

	.icon-good1 {
		font-size: 32upx;
		color: #333333;
		display: inline-block;
		transform: rotateX(180deg);
	}
</style>
