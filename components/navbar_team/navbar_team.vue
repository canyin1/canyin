<template>
	<view style="z-index: 9999;" class="bignav">
		<view class='status_bar' :class="{'alpabackgroud':backcolorType==0,'whitebackgroud':backcolorType==1,'graybackgroud':backcolorType==2}"
		 :style="{'padding-top':pddTitleTop+'px','height':pddTitleHeight+'px'}">
			<view v-if="pagetype==1" class="teamdiv teamdiv1">
				<view class="normal" :class="{selectcss:selectType==0}" @click="changeType(0)">
					直邀
				</view>
				<view class="normal" :class="{selectcss:selectType==1}" @click="changeType(1)">
					其他
				</view>
				<view class="normal" :class="{selectcss:selectType==2}" @click="changeType(2)">
					联运
				</view>
			</view>

			<view v-if="pagetype==2" class="teamdiv teamdiv2">
				<view class="normal normal2" :class="{selectcss:selectType==0}" @click="changeType(0)">
					我的订单
				</view>
				<view class="normal normal2" :class="{selectcss:selectType==1}" @click="changeType(1)">
					团队订单
				</view>
			</view>
			<view v-if="pagetype==3" class="teamdiv teamdiv3">
				<view class="normal normal3" :class="{selectcss:selectType==0}" @click="changeType(0)">
					新人上手
				</view>
				<view class="normal normal3" :class="{selectcss:selectType==1}" @click="changeType(1)">
					进阶学习
				</view>
				<view class="normal normal3" :class="{selectcss:selectType==2}" @click="changeType(2)">
					常见问题
				</view>
				<view class="normal normal3" :class="{selectcss:selectType==3}" @click="changeType(3)">
					邀请海报
				</view>
			</view>
		</view>
		<!-- #ifndef H5 -->
		<view class="KongPanel" :style="{height:kongHeight+'px'}">

		</view>
		<!-- #endif -->
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
				selectType: 0
			}
		},
		props: {
			// pddTitleTop: {
			// 	type: Number,
			// 	default: null
			// },
			pagetype: {
				type: String,
				default: "1"
			},
			title: {
				type: String,
				default: ""
			},
			whiteback: { //后退按钮的颜色 1黑色 其他白色
				type: String,
				default: "1"
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

		name: 'navbar_team',
		created: function(e) {
			this.pddTitleTop = this.$store.state.pddTitleTop;
			this.pddTitleHeight = this.$store.state.pddTitleHeight;
			this.kongHeight = this.$store.state.kongHeight;
			//console.log("自定义组件--------------------------------",getCurrentPages());
			let pages = getCurrentPages();
			//console.log('navbar的created' + (new Date()).getTime());
			let a = pages.length <= 1 && pages[0].route != "pages/tabBar/activity/activity";
			let b = pages.length > 1;
			let c = pages[0].route == "pages/tabBar/news/yanxuan"
			if ((a || b) && !c) {
				this.showBack = true;
			} else {
				this.showBack = false;
				this.pddTitleTop = "0"
				this.kongHeight = this.$store.state.kongHeight - this.$store.state.pddTitleTop;
			}

			// if (a) {
			// 	setTimeout(() => {
			// 		this.pddTitleTop = this.$store.state.pddTitleTop;
			// 		this.pddTitleHeight = this.$store.state.pddTitleHeight;
			// 		this.kongHeight = this.$store.state.kongHeight;
			// 	}, 500)

			// }
		},
		methods: {
			changeType: function(type) {
				this.selectType = type;
				this.$emit("pChangeType", type)
			},
			refreshPddTitleTop() {
				let pages = getCurrentPages();
				let c = pages[0].route == "pages/tabBar/news/yanxuan"
				this.pddTitleTop = c ? "0":this.$store.state.pddTitleTop;
				this.pddTitleHeight = this.$store.state.pddTitleHeight;
				this.kongHeight = c ? this.$store.state.kongHeight - this.$store.state.pddTitleTop:this.$store.state.kongHeight;
			},
			navBack(e) {
				var pages1 = getCurrentPages();
				if (pages1.length <= 1) {
					uni.switchTab({
						url: '/pages/tabBar/main/main'
					})
				} else
					uni.navigateBack();
			},
		}
	}
</script>

<style>
	.teamdiv {
		display: flex;
		justify-content: center;
		margin-left: 0upx;
		align-items: center;
		background-color: #F5F5F5;
		border-radius: 24upx;
		overflow: hidden;
	}
	.teamdiv1{
		width: 350upx;
	}
	.teamdiv2 {
		width: 300upx;
	}

	.teamdiv3 {
		width: 680upx !important;
		height: 58upx;
		border-radius: 29upx !important;
	}

	.bigteam {
		background-color: #ffffff;
		width: 750upx;
		display: flex;
		align-items: center;
	}

	.normal {
		text-align: center;
		width: 116upx;
		height: 48upx;
		line-height: 48upx;
		background: #F5F5F5;
	}

	.normal2 {
		width: 150upx;
		font-size: 26upx;
		font-family: PingFang SC;
		font-weight: 500;

	}
	.bignav{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.normal3{
		width: 150upx;
		font-size: 26upx;
		font-family: PingFang SC;
		font-weight: 500;
		height: 58upx;
		line-height: 58upx;
		border-radius: 29upx !important;
	}
	.selectcss {
		background: rgba(255, 186, 89, 1);
		border-radius: 24upx;
		color: #FFFFFF;
	}

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
		background-color: #F5F5F5;
	}

	.status_bar {
		height: 32px;
		line-height: 32px;
		/* #ifdef APP-PLUS */
		/* padding-top: var(--status-bar-height); */
		/* #endif */
		margin-top: 10upx;
		padding-bottom: 5px;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 20000;
		/* 		background-color: #F5F5F5;
 */
		width: 100%;
		overflow: hidden;
		display: flex;
		flex-direction: row;
		justify-content: center;
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
		position: absolute;
		left: 20upx;

		font-size: 13px;
		display: flex;
		align-items: center;
		line-height: 1;
		color: #fff;
	}

	/* 自定义导航 下*/
</style>
