<template>
	<view class="page">
		<navbar title="我的订单" :backcolorType='2' :showKongPanel="true" :whiteback='2'></navbar>
		<view class="order_view">
			<orderItem></orderItem>
		</view>
	</view>
</template>

<script>
	import navbar from "@/components/navbar/navbar.vue"
	import orderItem from "@/components/orderItem/orderItem.vue"
	export default {
		components: {
			navbar,
			orderItem
		},
		}
</script>

<style>
	page{
		background: #F5F5F5;
	}
	
</style>
