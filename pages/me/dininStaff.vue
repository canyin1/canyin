<template>
	<view class="page">
		<navbar title="学生列表" :backcolorType='2' :whiteback='2' showKongPanel="true"></navbar>
		<view class="student_view">
			<view class="title_view">
				<view class="name">姓名</view>
				<view class="class">班级</view>
				<view class="id">学号</view>
				<view class="btn">操作</view>
			</view>
			<view class="title_view" v-for="(item,index) in student" :key="index">
				<view class="name">{{item.name}}</view>
				<view class="class">{{item.class}}</view>
				<view class="id">{{item.studentId}}</view>
				<view class="btn btn1" @click="untyingClick(item.id)">解绑</view>
			</view>
		</view>
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
				student:[
					{
						id:1,
						name:'小明',
						'class':'102',
						studentId:'123456'
					},
					{
						id:1,
						name:'小明',
						'class':'102',
						studentId:'123456'
					},
					{
						id:1,
						name:'小明',
						'class':'102',
						studentId:'123456'
					},
					{
						id:1,
						name:'小明',
						'class':'102',
						studentId:'123456'
					}
				]
			}
		},
		onLoad() {
			
		},
		methods:{
			untyingClick(id){
				console.log(id)
			},
		}
	}
</script>

<style>
	page{
		background: #F5F5F5;
		font-size: 26upx;
	}
	.student_view{
		width: 710upx;
		background: #FFFFFF;
		border-radius: 14upx;
		margin: 20upx auto 0;
		overflow: hidden;
		box-shadow: 10upx 10upx 20upx rgba(0,0,0,.1);
	}
	.title_view{
		display: flex;
		width: 100%;
		text-align: center;
		border-bottom: 1upx solid #F5F5F5;
	}
	.title_view:last-of-type{
		border: none;
	}
	.title_view:nth-of-type(1){
		background: #F3EDED;
	}
	.name{
		width: 20%;
		border-right: 1upx solid #F5F5F5;
		padding: 20upx 0;
	}
	.class{
		width: 20%;
		border-right: 1upx solid #F5F5F5;
		padding: 20upx 0;
	}
	.id{
		width: 45%;
		padding: 20upx 0;
		border-right: 1upx solid #F5F5F5;
	}
	.btn{
		width: 15%;
		padding: 20upx 0;
	}
	.btn1{
		text-decoration: underline;
		color: #FFBA59;
	}
</style>
