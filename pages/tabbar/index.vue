<template>
	<view class="page">
		<view class="welcome">{{welcome}}</view>
		<view class="address_view">
			<span class="icon iconfont icon-ic_tomap"></span>
			<view class="address">(第五中学)智能饭堂</view>
		</view>
		<swiper class="swiper" :indicator-dots="false" :autoplay="false" :interval="3000" :duration="1000"
		 display-multiple-items='7'>
			<swiper-item v-for="(item,index) in week" :key="index">
				<view class="swiper-item" :class="index==indexs?'active':''" @click="indexClick(index)">
					<view class="week">{{item.week}}</view>
					<view class="date">{{item.date}}</view>
				</view>
			</swiper-item>
		</swiper>
		<view id="line"></view>
		<view class="scroll" :style="{height:scrollHeight +'px'}">
			<scroll-view scroll-y="true" class="scrollY"  :style="{height:scrollHeight +'px'}">
				<view v-for="(item,index1) in week" :key="index1" class="scroll1" :class="index1==indexs1?'active':''" @click="indexClick1(index1)">{{item.week}}</view>
			</scroll-view>
			<scroll-view scroll-y="true" class="scrollX" :style="{height:scrollHeight +'px'}">
				<view class="scroll2" v-for="(item,index2) in week" :key='index2' @click="bugClick">{{item.date}}</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import navbar from "@/components/navbar/navbar.vue"
	export default {
		components: {
			navbar
		},
		onReady() {
			let that = this
			var query = uni.createSelectorQuery().in(this);
			query.select('#line').boundingClientRect(data => {
				console.log("1111", data);
				uni.getSystemInfo({
					success: function(res) {
						console.log(res)
						that.scrollHeight = res.windowHeight - data.top - 5
					}
				})
				// this.scrollHeight = this.$store.state.
			}).exec();
		},
		data() {
			return {
				welcome: "欢迎来到(第五中学)智能食堂",
				scrollHeight: 0,
				week: [{
					'week': '周日',
					'date': '8'
				}, {
					'week': '周一',
					'date': '9'
				}, {
					'week': '周二',
					'date': '10'
				}, {
					'week': '周三',
					'date': '11'
				}, {
					'week': '周四',
					'date': '12'
				}, {
					'week': '周五',
					'date': '13'
				}, {
					'week': '周六',
					'date': '14'
				}],
				indexs: 0,
				indexs1: 0,
			}
		},
		onLoad() {

		},
		methods: {
			indexClick(index) {
				this.indexs = index
			},
			indexClick1(index){
				this.indexs1 = index
			},
			bugClick(){
				uni.navigateTo({
					url:"../index/choose"
				})
			},
		}
	}
</script>

<style>
	.welcome {
		width: 100%;
		text-align: center;
		font-size: 32upx;
		padding-top: 10upx;
	}

	.address_view {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		padding: 20upx 24upx;
		box-sizing: border-box;
	}

	.icon-ic_tomap {
		font-size: 28upx;
		color: #777;
	}

	.address {
		font-size: 32upx;
		line-height: 1;
		color: #777;
		padding-left: 10upx;
	}

	.swiper {
		width: 100%;
		border-top: 2upx solid #F5F5F5;
		height: 90upx;
	}

	.week {
		font-size: 28upx;
		color: #333;
		line-height: 1;
		opacity: 0.3;
	}

	.date {
		font-size: 30upx;
		line-height: 1;
		color: #333333;
		padding-top: 10upx;
	}

	.swiper-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 10upx 0;
	}

	.active {
		background: #ffba59 !important;
	}

	#line {
		width: 100%;
		height: 10upx;
		background: #F5F5F5;
	}

	.scroll {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
	}

	.scrollY {
		width: 23%;
	}

	.scroll1 {
		height: 100upx;
		line-height: 100upx;
		text-align: center;
		background: #F1F1F1;
		font-size: 28upx;
	}

	.scrollX {
		width: 77%;
		background: #F5F5F5;
	}

	.scroll2 {
		width: 100%;
		background-color: #FFFFFF;
		height: 240upx;
		border-bottom: 20upx solid #F5F5F5;
	}
	.scroll2:last-of-type{
		border: none;
	}
</style>
