<template>
	<view class="page">
		<navbar title="000" :backcolorType='2' :showKongPanel="true" :downType="true" :dateType="true"></navbar>
		
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
			query.select('.scroll').boundingClientRect(data => {
				console.log("1111", data);
				uni.getSystemInfo({
					success: function(res) {
						console.log(res)
						that.scrollHeight = res.windowHeight - data.top
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
	}
	
</script>

<style>
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
