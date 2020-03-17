<template>
	<view class="page">
		<view class="welcome">{{welcome}}</view>
		<view class="address_view">
			<span class="icon iconfont icon-aixin"></span>
		</view>
	</view>
</template>	

<script>
	import navbar from "@/components/navbar/navbar.vue"
	export default {
		components: {
			navbar
		},
		data(){
			return{
				welcome:"欢迎来到(第五中学)智能食堂"
			}
		},
		onLoad() {
			
		},
		methods:{
			
		}
	}
</script>

<style>
	.welcome{
		width: 100%;
		text-align: center;
		font-size: 32upx;
		padding-top: 10upx;
	}
</style>
