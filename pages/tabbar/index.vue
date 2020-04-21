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
					<!-- <view class="address_location" @click="studentClick">
						<view class="student">当前学生：</view>
						<view class="address_phone">{{nowStudent}}</view>
						<span class="iconfont icon-jiantou"></span>
					</view> -->
				</view>
				<view class="scroll1_img_view">
					<image class="address_img" src='/static/微信图片_20200318092008.jpg' mode="aspectFill"></image>
				</view>
			</view>
		</view>
		<swiper class="swiper" :indicator-dots="false" :autoplay="false" :interval="3000" :duration="1000"
		 display-multiple-items='7'>
			<swiper-item v-for="(item,index) in week" :key="index">
				<view class="swiper-item" :class="index==indexs?'active':''" @click="indexClick(index)">
					<view class="week">{{item.week}}</view>
					<view class="date">{{item.day}}</view>
				</view>
			</swiper-item>
		</swiper>
		<view id="line">
			<view class="address_location" @click="studentClick">
				<view class="student">当前学生：</view>
				<view class="address_phone">{{nowStudent}}</view>
				<span class="iconfont icon-jiantou"></span>
			</view>
		</view>
		<!-- <view class="btn"  @click="bugClick">智能点单</view> -->
		<view class="scroll" :style="{height:scrollHeight +'px'}">
			<!-- <scroll-view scroll-y="true" class="scrollY" :style="{height:scrollHeight +'px'}">
				<view v-for="(item,index1) in typeList" :key="index1" class="scroll1" :class="index1==indexs1?'active':''" @click="indexClick1(index1)">{{item.name}}</view>
			</scroll-view> -->
			<scroll-view scroll-y="true" class="scrollX" :style="{height:scrollHeight +'px'}">

				<indexBox :nowStudent='nowStudent' :nowSchoolId='nowSchoolId' :nowStudentId='nowStudentId' :week='week' :indexs='indexs'
				 :index='index' :item='item' v-for='(item,index) in indexList' :key='index'></indexBox>
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
						that.scrollHeight = res.windowHeight - data.top - 50
					}
				})
				// this.scrollHeight = this.$store.state.
			}).exec();
		},
		data() {
			return {
				welcome: "第五中学智能食堂",
				scrollHeight: 0,
				typeList: [],
				typeSubList: [],
				indexs: 0,
				indexs1: 0,
				cleanType:false,
				week: [{
					'week': '周日',
					'day': '',
					'date': ''
				}, {
					'week': '周一',
					'day': '',
					'date': ''
				}, {
					'week': '周二',
					'day': '',
					'date': ''
				}, {
					'week': '周三',
					'day': '',
					'date': ''
				}, {
					'week': '周四',
					'day': '',
					'date': ''
				}, {
					'week': '周五',
					'day': '',
					'date': ''
				}, {
					'week': '周六',
					'day': '',
					'date': ''
				}],
				indexList: [],
				student: [],
				nowStudent: '未选中',
				nowStudentId: '',
				nowSchoolId: ''

			}
		},
		onLoad(options) {
			// let test = true
			let test = false
			if(test){
				this.loginL1()
				return false
			}
			var url = window.location.href
			var i = url.split('?')
			if(i[1]){
				var j = i[1].split('&')
				var x = j[0].split('=')
				if(x[1]){
					this.loginL(x[1])
				}else{
					window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx24d9b21c348d1ed9&redirect_uri=http%3A%2F%2Fh5.food-edu.net&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
				}
			}else{
				window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx24d9b21c348d1ed9&redirect_uri=http%3A%2F%2Fh5.food-edu.net&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
			}
			
			
		},
		onShow() {
			if(this.cleanType==true){
				this.nextT()
			}
		},
		methods: {
			getCode() { // 非静默授权，第一次有弹框
				this.code = ''
				var local = window.location.href // 获取页面url
				this.code = this.getUrlCode().code // 截取code
				if (this.code == null || this.code === '') { // 如果没有code，则去请求
					window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx24d9b21c348d1ed9&redirect_uri=http%3A%2F%2Fh5.food-edu.net&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
				} else {
					this.loginL()
					uni.setStorageSync('code',this.code)
				}
			},

			studentClick() {
				let stu = []
				let that = this
				for (let i = 0; i < this.student.length; i++) {
					stu.push(this.student[i].name)
				}
				uni.showActionSheet({
					itemList: stu,
					itemColor: '#333333',
					success(res) {

						that.nowStudent = that.student[res.tapIndex].name
						that.nowStudentId = that.student[res.tapIndex].id
						that.nowSchoolId = that.student[res.tapIndex].schoolId
						that.$forceUpdate()
					},
				})
			},
			getStudentList() {
				let params = {

				}
				this.httpUtil.get('/api/school/parent/children', params, (obj) => {
					if (obj.total == 0) {
						uni.navigateTo({
							url: "../login"
						})
					this.cleanType = true
					} else {
						this.student = obj.rows
						this.nowStudentId = obj.rows[0].id,
							this.nowStudent = obj.rows[0].name
						this.nowSchoolId = obj.rows[0].schoolId
						this.timeList()
						this.getTypeSubList()
					}

				})
			},
			// bugClick(type) {
			// 	uni.navigateTo({
			// 		url: '../index/choose?date=' + this.week[this.indexs].date + '&week=' + this.week[this.indexs].week + '&studentId=' + 1
			// 	})
			// },
			timeList() {
				let week = new Date().getDay()
				var now = new Date(); //当前日期 
				var nowDayOfWeek = now.getDay(); //今天本周的第几天 
				var nowDay = now.getDate(); //当前日 
				var nowMonth = now.getMonth(); //当前月 
				var nowYear = now.getYear(); //当前年 
				var weekStartDate = new Date(nowYear + 1900, nowMonth, nowDay - nowDayOfWeek);
				let weekStarttime = Date.parse(weekStartDate)
				let weekStartDay = this.formatDate(weekStartDate)
				// console.log(weekStartDay)
				let i = weekStartDay.split('-')
				this.week[0].day = i[2]
				this.week[0].date = weekStartDay
				// this.week[nowDayOfWeek].date = nowYear + ((nowMonth>9)?nowMonth:nowMonth + 1) + nowDay
				// this.week[nowDayOfWeek].day = nowDay
				for (let x = 1; x < 7; x++) {
					var time = x * 86400000 + weekStarttime
					var date = this.toolUtil.getTimeStrOnlyDate(time)
					let y = date.split('-')
					this.week[x].day = y[2]
					this.week[x].date = date
				}

				this.indexs = nowDayOfWeek
				this.getTypeList()
			},
			formatDate(date) {
				var myyear = date.getFullYear();
				var mymonth = date.getMonth() + 1;
				var myweekday = date.getDate();

				if (mymonth < 10) {
					mymonth = "0" + mymonth;
				}
				if (myweekday < 10) {
					myweekday = "0" + myweekday;
				}
				return (myyear + "-" + mymonth + "-" + myweekday);
			},
			nextT() {
				this.getStudentList()

			},
			loginL(code) {
				if(uni.getStorageSync('token')){
					this.nextT()
					return
				}
				let params = {
					code: code,
					schoolId: 1
				}
				this.httpUtil.post3("/api/parentLogin", params, (obj) => {
					if(obj.code==200){
						uni.setStorageSync('token',obj.token)
						this.nextT()
					}
					if(obj.code==401){
						window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx24d9b21c348d1ed9&redirect_uri=http%3A%2F%2Fh5.food-edu.net&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
					}
				})
			},
			loginL1(code) {
				if(uni.getStorageSync('token')){
					this.nextT()
					return
				}
				let params = {
					code: '061Flund1XPvUw0LLgnd1K5qnd1FlunV',
					schoolId: 1
				}
				this.httpUtil.post3("/api/parentLogin", params, (obj) => {
					if(obj.code==200){
						uni.setStorageSync('token',obj.token)
						this.nextT()
					}
					if(obj.code==401){
						window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx24d9b21c348d1ed9&redirect_uri=http%3A%2F%2Fh5.food-edu.net&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
					}
				})
			},
			getTypeList() {
				let params = {
					studentId: 1,
					mealDate: this.week[this.indexs].date
				}
				this.httpUtil.get('/api/school/book/info', params, (obj) => {
					console.log(123, obj)
					this.indexList = obj.data
				})
			},
			getTypeSubList() {
				let params = {

				}
				this.httpUtil.get('/api/school/foodSubType/list', params, (obj) => {
					console.log(123, obj)
					this.typeSubList = obj.rows
					this.cleanType = true
				})
			},
			indexClick(index) {
				this.indexs = index
				this.getTypeList()
			},
			// indexClick1(index) {
			// 	this.indexs1 = index
			// },
		}
	}
</script>

<style>
	.address_name {
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

	.index_img {
		width: 100%;
		height: 233upx;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 1;
	}

	.address {
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

	.address_left {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.address_img {
		width: 160upx;
		height: 160upx;
		border-radius: 50%;
	}

	.address_location {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding-top: 10upx;
		font-size: 28upx;
		padding: 10upx 40upx;
		background: linear-gradient(270deg, rgba(249, 128, 80, 1) 1%, rgba(255, 186, 89, 1) 100%);
		color: #FFFFFF;
		height: 30upx;
		border-radius: 34upx;
	}

	.icon-ic_tomap {
		font-size: 20upx;

	}

	.swiper {
		width: 100%;
		border-top: 2upx solid #F5F5F5;
		height: 90upx;
		color: #333333;
	}

	.week {
		font-size: 20upx;
		line-height: 1;
	}

	.date {
		font-size: 32upx;
		line-height: 1;
		padding-top: 20upx;
	}

	.swiper-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 10upx 0;
	}

	.active {
		color: #e07235 !important;
	}

	#line {
		width: 100%;
		height: 100upx;
		background: #FFFFFF;
		color: #333;
		font-size: 26upx;
		display: flex;
		flex-direction: row;
		align-items: center;
		box-sizing: border-box;
		justify-content: center;
	}


	.icon-tongzhi {
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
		width: 100%;
		background: #F5F5F5;
	}

	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}

	.btn {
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

	.icon-jiantou {
		font-size: 28upx;
		margin-top: 6upx;
		margin-left: 10upx;
	}
</style>
