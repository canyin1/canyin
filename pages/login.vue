<template>
	<view class="page">
		<navbar title="学生信息登记" :backcolorType='2' :whiteback='2' :showKongPanel="true"></navbar>
		<form @submit="submitComfire" @reset="submitCancel">
			<input class="input input1" type="text" value="" placeholder="姓名" name="name" placeholder-class="placeholder" />
			<input class="input input1" type="text" value="" placeholder="班级" name="classId" placeholder-class="placeholder" />
			<input class="input input1" type="text" value="" placeholder="学校" name="schoolId" placeholder-class="placeholder" />
			<input class="input input1" type="text" value="" placeholder="学号" name="studentNumber" placeholder-class="placeholder" />
			<button form-type="submit">提交</button>
			<button form-type="reset">重置</button>
		</form>
	</view>
</template>

<script>
	import navbar from "@/components/navbar/navbar.vue"
	export default{
		components: {
			navbar
		},
		data(){
			return{
				type:''
			}
		},
		onLoad(options) {
			if(options.type==1){
				this.type = options.type
			}
		},
		methods:{
			submitComfire(e){
				console.log(e.detail.value)
				let params = e.detail.value
				this.httpUtil.post2('/api/school/parent/bindStudent',params,(obj)=>{
					console.log(obj)
					if(this.type==1){
						uni.navigateBack({
							
						})
						return false
					}
					uni.switchTab({
						url:'tabbar/index'
					})
				})
			},
		}
	}
</script>

<style>
	page{
		background: #FFFFFF;
	}
	.input{
		width: 70%;
		font-size: 34upx;
		color: #333333;
		border: 1upx solid #999;
		background: #F5F5F5;
		margin: 40upx 60upx;
	}
	.input1{
		position: relative;
		overflow: visible;
	}
	.input1::before{
		position: absolute;
		content: "*";
		left: -30upx;
		font-size: 26upx;
		color: #FF374E;
		top: 50%;
		margin-top: -13upx;
		line-height: 1;
	}
	.placeholder{
		color: #999999;
	}
</style>
