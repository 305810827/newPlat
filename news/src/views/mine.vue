<template>
	<div>
		<div class="main">
			<div class="head">
				<div class="avatar"><img :src="code===200 ? avatar : imgUrl"></div>
				<div class="user-name">{{username}}</div>
			</div>
			<div class="person-list">
				<div class="person-collect" v-if="code===200" @click="toCollectList()">我的收藏</div>
			</div>
			<div class="logout">
				<button v-if="code===200" @click="logout">退出登录</button>
				<button v-else @click="toLogin">登录</button>
			</div>
			<div class="foot">
				<div class="fL"  @click.stop="toHome">
					<span class="iconfont icon-shouye" ></span>
					<span>首页</span>
				</div>
				<div class="fR select">
					<span class="iconfont icon-wode"></span>
					<span>我的</span>
				</div>
			</div>
		</div>
	</div>
 
</template>

<script>

export default {
  name: 'mine',
  data(){
	  return{
		  code:-1,
		  imgUrl:require('../assets/images/noLogin.png'),
		  username:'未登录',
		  avatar:'',
	  }
  },
  methods:{
	  toHome(){
		  this.$router.push({name:'home'})
	  },
	  toCollectList(){
		  this.$router.push({name:'myCollect'})
	  },
	  toLogin(){
		  this.$router.push({name:'login'})
	  },
	  logout(){
		  this.$axios.post('/logout',{token:JSON.parse(localStorage.getItem('token'))}).then(res=>{
		  	console.log(res);
			if(res.data.code == 200){
				localStorage.removeItem('token');
				this.toLogin();
			}
		  	
		  }).catch(err=>{
		  	console.log(err);
		  })
	  }
  },
  mounted() {
	  let token = JSON.parse(localStorage.getItem('token'))
	  if(token){
		  this.$axios.post('/login/status',{token:token}).then(res=>{
		  	console.log(res);
		  	this.code = res.data.code;
		  	if(this.code === 200){
		  		this.username = res.data.data.username;
				this.avatar = 'http://localhost:9999/upload/' + res.data.data.imgname;
		  	}else if(this.code === -1){
		  		localStorage.removeItem('token');
		  	}
		  }).catch(err=>{
		  	console.log(err);
		  })
	  }
  }
}
</script>

<style scoped>
	
	.head{
			  width: 100%;
			  height: 180px;
			  background: #dd3635;
			  display: flex;
			  flex-direction: column;
			  justify-content: center;
			  align-items: center;
	}
	.avatar img{
			  width:80px;
			  height:80px;
			  border-radius: 50%;
	}
	.user-name{
			  font-size: 22px;
			  color: white;
	}
	.person-collect{
			  padding: 0px 30px;
			  width: 100%;
			  height: 45px;
			  background: #DDDDDD;
			  line-height: 45px;
			  font-size: 20px;
			  color: white;
			  margin-top: 30px;
			  box-sizing: border-box;
	}
	.logout{
			  width:100%;
			  margin-top: 100px;
			  text-align: center;
	}
	.logout button{
			  width:200px;
			  height: 30px;
			  border-radius: 3px;
			  background: #dd3635;
			  outline: 0;
			  border: 0;
			  color: white;
	}
	 
	.foot {
		width: 100%;
		height: 45px;
		position: fixed;
		z-index: 99px;
		bottom: 0;
		background-color: #ffffff;
		border-top: 1px solid #ddd;
		display: flex;
		margin: 0 auto;
	}
	
	.foot .fL,
	.foot .fR {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 14px;
	}
	
	.foot .fL span:first-child,
	.foot .fR span:first-child {
		font-size: 22px;
	}
	
	.select {
		color: red;
	}
</style>