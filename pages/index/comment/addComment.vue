<template>
	<view class="page">
		<navbar title="评论" :backcolorType='2' :whiteback='2' :showKongPanel="true"></navbar>
		<view class="big_view">
			<view class="pingfen">
				<text>总分：</text>
				<level :levels="levels" :fontSizeType='1'></level>
			</view>
			<view class="evaluate_view">
				<view class="evaluate">
					<text>味道</text>
					<span class="iconfont icon-weixiao" :class="{'icon-weixiao-':params.tasteType>=index+1}" v-for='(item,index) in params.taste'
					 :key='index' @click.stop="evaluateClick('tasteType',index)"></span>
				</view>
				<view class="evaluate">
					<text>卫生</text>
					<span class="iconfont icon-weixiao" :class="{'icon-weixiao-':params.hygieneType>=index+1}" v-for='(item,index) in params.hygiene'
					 :key='index' @click.stop="evaluateClick('hygieneType',index)"></span>
				</view>
				<view class="evaluate">
					<text>份量</text>
					<span class="iconfont icon-weixiao" :class="{'icon-weixiao-':params.weightType>=index+1}" v-for='(item,index) in params.weight'
					 :key='index' @click.stop="evaluateClick('weightType',index)"></span>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import navbar from "@/components/navbar/navbar.vue"
	import level from '@/components/level/level.vue'
	export default {
		components: {
			navbar,
			level
		},
		data() {
			return {
				levels: '3.5',
				params: {
					'taste': ['', '', '', '', ''],
					'hygiene': ['', ''],
					'weight': ['', '', ''],
					tasteType: 0,
					hygieneType: 0,
					weightType: 0,
				}
			}
		},
		onLoad() {

		},
		methods: {
			evaluateClick(type, index) {
				this.params[type] = index + 1
			},
		}
	}
</script>

<style>
	page {
		background: #FFFFFF;
	}

	.pingfen {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 32upx 24upx;
	}

	.pingfen text {
		font-size: 32upx;
		color: #333333;
	}

	.icon-weixiao- {
		color: #FFBA59 !important;
	}
	.evaluate_view{
		padding: 32upx 24upx;
		border-top: 2upx solid #F5F5F5;
		border-bottom: 2upx solid #F5F5F5;
	}
	.evaluate{
		display: flex;
		flex-direction: row;
		align-items: center;
		padding-bottom: 20upx;
	}
	.evaluate:last-of-type{
		padding-bottom: 0;
	}
	.evaluate text{
		font-size: 32upx;
		line-height: 1;
		padding-right: 20upx;
		color: #333333;
	}
	.icon-weixiao{
		font-size: 46upx;
		padding-right: 10upx;
		color: #999999;
	}
</style>
