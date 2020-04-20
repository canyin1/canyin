<template>
	<view style="z-index: 997;">
		<view class='status_bar' :class="{'alpabackgroud':backcolorType==0,'whitebackgroud':backcolorType==1,'graybackgroud':backcolorType==2}"
		 :style="{'padding-top':pddTitleTop+'px','height':pddTitleHeight+'px'}">
			<view class="customtitlediv" :class="{'fontwhite':whiteback==2,'fontblack':whiteback!=2}" @click="chooseClick">{{title=='000'?food:title}} <span v-if="downType" class='iconfont icon-jiantou1'></span></view>
			<view v-if="showBack" class="navback1" @click='navBack'>
				<image v-if="whiteback==1" src="/static/back.png" mode='aspectFit' class="back1"></image>
				<image v-else src="/static/back1.png" mode='aspectFit' class="back1"></image>
			</view>
			<view class="date_view" v-if="dateType">
				
				<picker mode="date" @change="pickerClick" @cancel="cancelClick">
					<view>{{date}} </view>
				</picker><span class='iconfont icon-jiantou1'></span>
			</view>
		</view>
		<view v-if="showKongPanel" class="KongPanel" :style="{height:kongHeight+'px'}">

		</view>
		
	</view>


</template>

<script>
	//var statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px'
	export default {
		data() {
			return {
				//statusBarHeight: statusBarHeight,
				showBack: true,
				pddTitleHeight: 32,
				pddTitleTop: 25,
				kongHeight: 68,
				foodType:['早餐','午餐','晚餐','夜宵'],
				range:[],
				typeList:[],
				ranges:'1',
				index:1
			}
		},
		props: {
			// pddTitleTop: {
			// 	type: Number,
			// 	default: null
			// },
			title: {
				type: String,
				default: ""
			},
			food: {
				type: String,
				default: ""
			},
			date: {
				type: String,
				default: ""
			},
			whiteback: { //后退按钮的颜色 1黑色 其他白色
				type: Number,
				default: 0
			},
			typeListArr:{
				type: String,
				default: ""
			},
			downType:{
				type: [Boolean, String],
				default: false
			},
			dateType:{
				type: [Boolean, String],
				default: false
			},
			backcolorType: { //顶部导航的背景颜色 0 透明 1白色，2灰色
				type: Number,
				default: 0
			},

			bgcw: {
				type: [Boolean, String],
				default: false
			},
			showKongPanel: {
				type: [Boolean, String],
				default: false
			},
		},

		name: 'navbar',
		created: function(e) {
			//console.log("自定义组件--------------------------------",getCurrentPages());
			let pages = getCurrentPages();
			//console.log('navbar的created' + (new Date()).getTime());
			let b = pages.length > 1;
			if (b) {
				this.showBack = true;
			} else {
				this.showBack = false;
			}
			this.pddTitleTop = this.$store.state.pddTitleTop;
			this.pddTitleHeight = this.$store.state.pddTitleHeight;
			this.kongHeight = this.$store.state.kongHeight;
			
			// if (a) {
			// 	setTimeout(() => {
			// 		this.pddTitleTop = this.$store.state.pddTitleTop;
			// 		this.pddTitleHeight = this.$store.state.pddTitleHeight;
			// 		this.kongHeight = this.$store.state.kongHeight;
			// 	}, 500)
			// }
		},
		methods: {
			cancelClick(e){
				console.log(555,e)
			},
			pickerClick(e){
				console.log(e)
				var arr="日一二三四五六".split("") 
				this.weeks = arr[new Date(e.detail.value).getDay()]
				console.log(999,this.weeks)
				let date = e.detail.value + ' ' + '周' + this.weeks
				this.$emit("weeks", date,)
			},
			chooseClick(){
				if(this.downType==0){
					return false
				}
				let that = this
				uni.showActionSheet({
					itemList: this.typeList,
					success(res) {
						
						that.$emit("food", that.typeList[res.tapIndex])
					},
				})
			},
			refreshPddTitleTop() {
				this.pddTitleTop = this.$store.state.pddTitleTop;
				this.pddTitleHeight = this.$store.state.pddTitleHeight;
				this.kongHeight = this.$store.state.kongHeight;
			},
			navBack(e) {
				var pages1 = getCurrentPages();
				let first = pages1[0];
				if (pages1.length > 1 ) {
					uni.navigateBack();
				} else {
					uni.switchTab({
						url: '/pages/tabbar/index'
					})
				}
			},
		}
	}
</script>

<style>
	/* 自定义导航 上*/
	.fontwhite {
		color: #fff;
	}

	.fontblack {
		color: #000;
	}

	.whitebackgroud {
		background-color: #ffffff;
	}

	.alpabackgroud {}

	.graybackgroud {
		background-color: #FFBA59;
	}

	.status_bar {
		height: 32px;
		line-height: 32px;
		padding-top: var(--status-bar-height);
		padding-bottom: 5px;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 997;
		/* 		background-color: #F5F5F5;
 */
		width: 100%;
		overflow: hidden;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		text-align: center;
		font-weight: Medium;
		font-size: 36upx;
	}


	.back1 {
		width: 25px;
		height: 25px;
	}

	.customtitlediv {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 200px;
		margin-left: calc(50% - 100px);
		position: absolute;
		font-size: 18px;
		text-align: center;
		font-family: PingFang-SC-Medium;
	}

	.navback1 {
		margin-left: 20upx;
		font-size: 13px;
		display: flex;
		align-items: center;
		line-height: 1;
		color: #fff;
	}
	.icon-jiantou1{
		font-size: 28upx;
		color: #FFFFFF;
		padding-left: 10upx;
	}
	.date_view{
		font-size: 25upx;
		color: #FFFFFF;
		display: flex;
		flex-direction: row;
		padding-right: 10upx;
	}
	/* 自定义导航 下*/
</style>
