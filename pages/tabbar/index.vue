<template>
	<view class="page">
		<!-- <navbar title="订餐" :backcolorType='2' :showKongPanel="true" :whiteback='2'></navbar> -->
		<view class="address_view">
			<image class="index_img" src="/static/index_bg.png" mode="aspectFill"></image>
			<view class="address">
				<view class="address_left">
					<view class="address_name">{{welcome}}</view>
					<!-- <view class="address_location" @click="addressClick">
						<span class="icon iconfont icon-ic_tomap"></span>
						<view class="address_location1">(第五中学)智能饭堂</view>
					</view> -->
					<view class="address_location">
						<span class="icon iconfont icon-shouji01"></span>
						<view class="address_phone">13670000000</view>
					</view>
				</view>
				<view class="scroll1_img_view"><image class="address_img" src='/static/微信图片_20200318092008.jpg' mode="aspectFill"></image></view>
			</view>
		</view>
		<!-- <swiper class="swiper" :indicator-dots="false" :autoplay="false" :interval="3000" :duration="1000"
		 display-multiple-items='7'>
			<swiper-item v-for="(item,index) in week" :key="index">
				<view class="swiper-item" :class="index==indexs?'active':''" @click="indexClick(index)">
					<view class="week">{{item.week}}</view>
					<view class="date">{{item.date}}</view>
				</view>
			</swiper-item>
		</swiper> -->
		<view id="line">
			<span class="iconfont icon-tongzhi"></span><text>告师生信</text>
		</view>
		<!-- <view class="btn"  @click="bugClick">智能点单</view> -->
		<view class="scroll" :style="{height:scrollHeight +'px'}">
			<scroll-view scroll-y="true" class="scrollY" :style="{height:scrollHeight +'px'}">
				<view v-for="(item,index1) in week" :key="index1" class="scroll1" :class="index1==indexs1?'active':''" @click="indexClick1(index1)">{{item.week}}</view>
			</scroll-view>
			<scroll-view scroll-y="true" class="scrollX" :style="{height:scrollHeight +'px'}">
				<view class="titles"></view>
				<indexBox v-for="(item,index2) in week" :key='index2'></indexBox>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import navbar from "@/components/navbar/navbar.vue"
	import indexBox from "@/components/indexBox/indexBox.vue"
	export default {
		components: {
			navbar,
			indexBox
		},
		onReady() {
			let that = this
			var query = uni.createSelectorQuery().in(this);
			query.select('#line').boundingClientRect(data => {
				console.log("1111", data);
				uni.getSystemInfo({
					success: function(res) {
						console.log(res)
						that.scrollHeight = res.windowHeight - data.top - 25
					}
				})
				// this.scrollHeight = this.$store.state.
			}).exec();
		},
		data() {
			return {
				welcome: "第五中学智能食堂",
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
			this.loginL()
			// this.foodsList()
		},
		methods: {
			loginL(){
				uni.removeStorage({
					key:'token',
					success(res) {
						
					}
				})
				let params = {
					code:1,
					schoolId:1
				}
				this.httpUtil.post2("/api/parentLogin",params,(obj)=>{
					console.log(obj)
					
					uni.setStorage({
						key: 'token',
						data:obj.token
					})
					this.foodsList()
				})
			},
			foodsList(){
				let params = {
					mealTime:'lunch'
				}
				this.httpUtil.get('/api/school/food/list',params,(obj)=>{
					console.log(123,obj)
				})
			},
			indexClick(index) {
				this.indexs = index
			},
			indexClick1(index) {
				this.indexs1 = index
			},
			bugClick(){
				
			},
		}
	}
</script>

<style>
	.address_name {
		width: 100%;
		text-align: center;
		font-size: 32upx;
	}

	.address_view {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		position: relative;
		height: 233upx;
		
	}
	.index_img{
		width: 100%;
		height: 233upx;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 1;
	}
	.address{
		width: 100%;
		height: 233upx;
		display: flex;
		flex-direction: row;
		align-items: center;
		position: absolute;
		z-index: 2;
		left: 0;
		top: 0;
		justify-content: space-between;
		color: #FFFFFF;
		font-size: 24upx;
		padding: 20upx 60upx;
		box-sizing: border-box;
	}
	.address_left{
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}
	.address_img{
		width: 160upx;
		height: 160upx;
		border-radius: 50%;
	}
	.address_location{
		display: flex;
		flex-direction: row;
		align-items: center;
		padding-top: 10upx;
	}
	.icon-ic_tomap {
		font-size: 20upx;
		
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
		background: #FFBA59 !important;
	}
	#line {
		width: 100%;
		height: 50upx;
		background: #FFFFFF;
		padding: 0 32upx;
		color: #FF374E;
		font-size: 26upx;
		display: flex;
		flex-direction: row;
		align-items: center;
		box-sizing: border-box;
	}
	#line text{
		text-decoration: underline;
	}
	.icon-tongzhi{
		padding-right: 20upx;
		
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
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 12upx 0;
		font-size: 26upx;
		height: 68upx;
		line-height: 68upx;
		border-bottom: 4upx solid #F5F5F5;
	}

	.scroll1_img_view {
		font-size: 0;
	}

	.scroll1_img {
		width: 88upx;
		height: 88upx;
		border-radius: 50%;
	}

	.scroll1 text {
		font-size: 24upx;
		line-height: 1;
		padding-top: 16upx;
	}

	.scrollX {
		width: 77%;
		background: #F5F5F5;
	}

	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}
	.btn{
		width: 200upx;
		height: 78upx;
		line-height: 78upx;
		border-radius: 34upx;
		background: #FFBA59;
		color: #FFFFFF;
		margin: 120upx auto 0;
		text-align: center;
		font-size: 34upx;
	}
</style>
