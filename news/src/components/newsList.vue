<template>
		<ul>
			<li class="list" v-for="(item,index) in news" :key="index" @click="toContent(item._id)">
				
				<div class="box">
					<div class="lLf">
						<div class="lTitle">
							{{item.title}}
						</div>
						<div class="time-box">
							<span class="lFrom">{{item.source}}-{{item.className}}</span>&nbsp;&nbsp;
							<span class="lTime">{{formatTime(Number(item.postTime)) === formatTime(Date.now()) ? toDayTime(Number(item.postTime)) : formatTime(Number(item.postTime))}}</span>
						</div>
					</div>
					<div class="lRt">
						<img :src="item.img ? item.img : defaultImg" :onerror="errorUserPhoto">
					</div>
				</div>
				
			</li>
		</ul>
</template>

<script>
	export default {
		name: 'newsList',
		props:{
			news:{
				type:Array,
				default:[]
			}
		},
		data(){
			return{
				defaultImg:require('../assets/images/demo1.png'),
				errorUserPhoto:'this.src="' + require('../assets/images/demo1.png') + '"',
			}
		},
		methods:{
			formatTime(value){
				return this.$moment(value).format('YYYY-MM-DD')
			},
			toDayTime(value){				
				return this.$moment(value).calendar();			
			},
			toContent(newid){
				this.$router.push({name:'newContent',params:{
					newId : newid
				}});
			}
		}
		
	}
</script>

<style scoped>
	
	.list{
	  width: 92%;
	  height: 85px;
	  margin: 15px auto;
	  border-bottom: 1px solid #F3F3F3;
	  display: flex;
	}
	.box{
		width: 100%;
		display: flex;
		/* align-items: center; */
		overflow: hidden;
		justify-content: space-between;
	}
	.list .lLf{
	  width: 100%;
	  flex: 3;
	  height: 85px;
	}
	.list .lLf .lTitle{
	  /* --------------- */
	  overflow: hidden;
	  display: -webkit-box;
	  -webkit-box-orient: vertical;
	  -webkit-line-clamp: 2;
	  /* --------------- */
	  line-height: 22px;
	  height: 44px;
	  width: 90%;
	}
	.time-box{
		overflow: hidden;
	
	}
	.list .lLf .lTime,
	.list .lLf .lFrom{
	  margin-top: 8px;
	  font-size: 12px;
	  letter-spacing: 1px;
	  line-height: 22px;
	  color: #a5a5a5;
	}
	.list .lLf .lFrom{
		float: left;
	}
	
	.list .lLf .lTime{
		float: right;
		margin-right: 10px;
	}
	.list .lRt{
	  width: 100%;
	  flex: 1;
	}
	.list .lRt img{
	  width: 114px;
	  height: 70px;
	}
	
	@media (max-width: 320px) {
		.list .lLf .lTime {
			margin-right: 0px;
			
		}
	}
	
</style>
