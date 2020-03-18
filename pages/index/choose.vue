<template>
	<view class="page">
		<navbar title="000" :backcolorType='2' :showKongPanel="true" :downType="true" :dateType="true"></navbar>
		
		<view class="scroll" :style="{height:scrollHeight +'px'}">
			<scroll-view scroll-y="true" class="scrollY"  :style="{height:scrollHeight +'px'}">
				<view v-for="(item,index1) in week" :key="index1" class="scroll1" :class="index1==indexs1?'active':''" @click="indexClick1(index1)">{{item.week}}</view>
			</scroll-view>
			<scroll-view scroll-y="true" class="scrollX" :style="{height:scrollHeight +'px'}">
				<view class="scroll2" v-for="(item,index2) in week" :key='index2' @click="foodClick">{{item.date}}</view>
			</scroll-view>
		</view>
		<view class="bottom_view">
			<view class="money_view">
				<span class='iconfont icon-gouwuche'></span>
				<view class="money">￥100.00</view>
			</view>
			<view class="buy_btn">去结算</view>
		</view>
	</view>
</template>

<script>
	import navbar from "@/components/navbar/navbar.vue"
	import popup from "@/components/uni-popup/uni-popup.vue"
	export default {
		components: {
			navbar,
			popup
		},
		onReady() {
			let that = this
			var query = uni.createSelectorQuery().in(this);
			query.select('.scroll').boundingClientRect(data => {
				console.log("1111", data);
				uni.getSystemInfo({
					success: function(res) {
						console.log(res)
						that.scrollHeight = res.windowHeight - data.top -50
					}
				})
				// this.scrollHeight = this.$store.state.
			}).exec();
		},
		data(){
			return{
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
				scrollHeight:0,
				indexs1:'',
				indexs2:''
			}
		},
		methods:{
			indexClick(index) {
				this.indexs = index
			},
			indexClick1(index){
				this.indexs1 = index
			},
			foodClick(){
				uni.navigateTo({
					url:'foodDetail'
				})
			},
		}
	}
	
</script>

<style>
	.active {
		background: #ffba59 !important;
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
	.bottom_view{
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
		box-shadow: 0 -10upx 20upx rgba(0,0,0,0.1);
	}
	.money_view{
		display: flex;
		align-items: center;
		color: #FFBA59;
	}
	.icon-gouwuche{
		font-size: 60upx;
	}
	.money{
		font-size: 32upx;
		padding-left: 10upx;
	}
	.buy_btn{
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
