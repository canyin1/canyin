<template>
	<view class="page">
		<navbar title="评论" :backcolorType='2' :whiteback='2' :showKongPanel="true"></navbar>
		<view class="big_view">
			<view class="top_view">
				<view class="pingfen">
					<text>总分：</text>
					<level :levels="levels" :fontSizeType='1'></level>
				</view>
				<checkbox-group>
					<label @click='checkClick'>
						<checkbox style="transform:scale(0.5)" color="#007aff" /><text>匿名</text>
					</label>
				</checkbox-group>
			</view>
			<view class="evaluate_view">
				<view class="evaluate">
					<text>味道</text>
					<span class="iconfont icon-weixiao" :class="{'icon-weixiao-':params.taste>=index+1}" v-for='(item,index) in tasteArr'
					 :key='index' @click.stop="evaluateClick('taste',index)"></span>
				</view>
				<view class="evaluate">
					<text>卫生</text>
					<span class="iconfont icon-weixiao" :class="{'icon-weixiao-':params.health>=index+1}" v-for='(item,index) in healthArr'
					 :key='index' @click.stop="evaluateClick('health',index)"></span>
				</view>
				<view class="evaluate">
					<text>份量</text>
					<span class="iconfont icon-weixiao" :class="{'icon-weixiao-':params.weight>=index+1}" v-for='(item,index) in weightArr'
					 :key='index' @click.stop="evaluateClick('weight',index)"></span>
				</view>
			</view>
			<view class="input_view">
				<textarea @input="inputClick" type="text" value="" maxlength="200" />
				
			</view>
			<view class="img_view">
				<image v-for="(item,index1) in img" :src="item" mode="aspectFill" v-if="img.length>0" :key="index1" @click="imageClick(index1)"></image>
				<span class="iconfont icon-jiahao1" @click='addImg' v-if="img.length<3"></span>
			</view>
			<view class="comfire_btn" @click="comfireClick">立即评论</view>
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
				levels: 0,
				value:'',
				'tasteArr': ['', '', '', '', ''],
				'healthArr': ['', '', '', '', ''],
				'weightArr': ['', '', '', '', ''],
				params: {
					taste: 0,
					health: 0,
					weight: 0,
				},
				img:[],
				id:'',
				anonymous:false
			}
		},
		onLoad(options) {
			if(options.id){
				this.id = options.id
			}
		},
		methods: {
			imageClick(index){
				let img = this.img[index]
				let that = this
				uni.showActionSheet({
					itemList:['查看图片','删除','全部清空'],
					itemColor:'#333333',
					success(res) {
						console.log(res)
						if(res.tapIndex==0){
							uni.previewImage({
								current:img,
								urls:that.img
							})
						}
						if(res.tapIndex==1){
							that.img.splice(index,1)
						}
						if(res.tapIndex==2){
							that.img = []
						}
					},
				})
			},
			checkClick(){
				this.anonymous = !this.anonymous
			},
			inputClick(e){
				this.value = e.detail.value
			},
			evaluateClick(type, index) {
				this.params[type] = index + 1
				this.allLevels()
			},
			allLevels(){
				let levels = this.params.taste + this.params.health + this.params.weight
				console.log(levels)
				if(levels<=3){
					this.levels = 1
				}
				if(levels>3&&levels<=6){
					this.levels = 2
				}
				if(levels>6&&levels<=9){
					this.levels = 3
				}
				if(levels>9&&levels<=12){
					this.levels = 4
				}
				if(levels>12){
					this.levels = 5
				}
			},
			addImg(){
				let that = this
				uni.chooseImage({
					count:3,
					success(res) {
						console.log(res.tempFilePaths)
						
						// that.uploadImg(res.tempFilePaths)
						let teamparr = res.tempFilePaths
						function uploadimg(){
							while(teamparr.length > 0){
								let item = teamparr.pop()
								
								uni.uploadFile({
								    url: 'http://h5.food-edu.net/api/common/upload', //仅为示例，非真实的接口地址
								    filePath: item,
									header:{
										'Authorization':  "Bearer" + ' ' + uni.getStorageSync("token")
									},
								    name: 'file',
								    success: (uploadFileRes) => {
								        let data = JSON.parse(uploadFileRes.data)
										console.log(data)
										that.img.push(data.url)
										if(teamparr.length>0){
											uploadimg()
										}else{
										}
										
								    }
								});
							}
						}
						uploadimg()
					}
				})
			},
			comfireClick(){
				if(this.params.taste==0||this.params.health==0||this.params.weight==0){
					uni.showToast({
						title:'请先点击笑脸评论',
						icon:'none',
						duration:2000
					})
					return false
				}
				if(this.value==''){
					uni.showToast({
						title:'请写评论语',
						icon:'none',
						duration:2000
					})
					return false
				}
				let params= this.params
				params.orderId = this.id
				params.content = this.value
				params.anonymous = this.anonymous
				if(this.img.length!=0){
					params.images = JSON.stringify(this.img)
				}
				this.httpUtil.post2("/api/school/comment",params,(obj)=>{
					uni.switchTab({
						url:'../../tabbar/myOrder'
					})
				})
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
		padding: 32upx 0;
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
	.icon-jiahao1{
		font-size: 120upx;
		color: #999999;
		margin-top: 5upx;
	}
	.input_view{
		width: 710upx;
		background-color: #F5F5F5;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		border-radius: 24upx;
		margin: 20upx auto;
		padding: 32upx 24upx;
		box-sizing: border-box;
	}
	.img_view{
		display: flex;
		flex-direction: row;
		align-items: center;
		padding-left: 24upx;
	}
	.img_view image{
		width: 120upx;
		height: 120upx;
		margin-right: 10upx;
		
	}
	textarea{
		font-size: 32upx;
		height: 200upx;
		color: #333333;
	}
	.comfire_btn{
		width: 680upx;
		height: 88upx;
		line-height: 88upx;
		margin: 20upx auto 0;
		color: #FFFFFF;
		font-size: 32upx;
		text-align: center;
		border-radius: 44upx;
		background: linear-gradient(270deg, rgba(249, 128, 80, 1) 1%, rgba(255, 186, 89, 1) 100%);
	}
	checkbox-group{
		font-size: 28upx;
	}
	.top_view{
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		justify-content: space-between;
		padding: 0 24upx;
		box-sizing: border-box;
	}
</style>
