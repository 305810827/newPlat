<template>
	<div>
		<div class="main">
		  <div class="head">
			<div class="back" @click="back">
			  <span class="iconfont icon-back"></span>
			  <span>返回</span>
			</div>
		  </div>
		</div>
		
		<div class="container">
			<div class="title">
				<h2>{{news.title}}</h2>
			</div>
			<div class="dec">
				<span class='source'>来源: {{news.source}}</span>
				<span class='postTime'>{{formatTime(Number(news.postTime)) === formatTime(Date.now()) ? toDayTime(Number(news.postTime)) : formatTime(Number(news.postTime))}}</span>
			</div>
			<div class="content" id="content" v-html="news.content">
				<!-- {{formatContent(news.content)}} -->
			</div>
		</div>
		<div class="foot">
			<div class="collected" @click="collected" :class="[isCollect ? 'red' : '']" v-if="token">
				<div v-if="this.isCollect" >
					<span class="iconfont icon-shoucang"></span>
					<span>取消收藏</span>
				</div>
				<div v-else >
					<span class="iconfont icon-wuxiaoxing-kong"></span>
					<span>收藏</span>
				</div>
			</div>
			<div class="noContent" v-else @click="toLogin">
				<p>登录后才能进行收藏</p>
			</div>
			
		</div>
	</div>

</template>

<script>
// @ is an alias to /src
import newsList from '@/components/newsList.vue'

export default {
  name: 'home',
  components: {
    newsList
  },
  data(){
	  return{
		  news:{},
		  isCollect:false,
		  token:localStorage.getItem('token')
	  }
  },
  methods:{
	  back(){
		  this.$router.go(-1);
	  },
	  toLogin(){
	  	this.$router.push({name:'login'})
	  },
	  formatTime(value){
	  	return this.$moment(value).format('YYYY-MM-DD')
	  },
	  toDayTime(value){				
	  	return this.$moment(value).calendar();			
	  },
	  collected(){
		  this.$axios.post('/collected',{newId:this.news._id,token:JSON.parse(localStorage.getItem('token')),type:2}).then(res=>{
		  		  this.isCollect = res.data.data.isCollect
		  	
		  }).catch(err=>{
		  		   console.log(err);
		  })
	  },
	  formatContent(content){
		  if(content){
			  //替换所有的换行符
			  content = content.replace(/\n/g,"<br>")
			  //替换所有的空格（中文空格、英文空格都会被替换）
			  content = content.replace(/\s/g,"&nbsp;");
			  return content;
		  }
	  }
  },
  mounted(){
	  let newId = this.$route.params.newId;
	  this.$axios.post('/news',{newId:newId}).then(res=>{
		  this.news = res.data.data
		  console.log(res);
	  }).catch(err=>{
		   console.log(err);
	  })
	  this.$axios.post('/collected',{newId:newId,token:JSON.parse(localStorage.getItem('token')),type:1}).then(res=>{
	  		  this.isCollect = res.data.data.isCollect
	  }).catch(err=>{
	  		   console.log(err);
	  })
  }
}
</script>

<style scoped>
	.head{
	  position: fixed;
	  display: flex;
	  width: 100%;
	  height: 45px;
	  z-index: 99;
	  top: 0;
		margin: 0px auto;
	  background-color: #DD3635;
		justify-content: space-between;
		align-items: center;
	}
	.back span{
		color: white;
		margin-left: 10px;
		vertical-align: middle;
	}
	.back span:first-child{
		font-size: 20px;
	}
	.back span:last-child{
	
		font-size: 16px;
	}
	.container:before,.container:after{
		  content: '';
		  display: block;
		  width:100%;
		  height:42px;
	}
	.container{
	  border-top: 1.4px solid #F7F7F7;
	  width: 100%;
	  position: relative;
	  margin: 0 auto;
		padding: 10px 10px;
		box-sizing: border-box;
	}
	.dec{
		 margin: 10px 0;
	}
	.dec .postTime{
		  font-size: 14px;
		  color:#a5a5a5;
		  margin-left: 10px;
	}
	.foot{
	  width: 100%;
	  height: 45px;
	  position: fixed;
	  z-index: 99px;
	  bottom: 0;
	  margin: 0px auto;
	  background-color: #ffffff;
	  border-top: 1px solid #ddd;
		display: flex;
	}
	
	.foot{
	   display:flex;
		justify-content: flex-end;
	   align-items: center;
	 
	}
	.foot .collected{
		 margin-right: 20px;
	}
	.foot .collected span{
		font-size: 24px;
	}
	.foot .collected span:last-child{
		font-size:18px;
		margin-left: 5px;
	}
	.red{
		color: red;
	}
	>>>img{
		width: 95%;
		height: auto;  
		margin:5px 0
	}
	.noContent{
		margin-right:50px;
		color: red;
	}
</style>