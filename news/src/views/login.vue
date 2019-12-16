<template>
	<div>
		<div class="head">
				<span>登录</span>
		</div>
		<div class="main">
			<span class="iconfont icon-shouye" @click="toHome"></span>
			<div class="container">
				<input class="input" type="text" placeholder="用户名" v-model="username" @focus="isTip = false">
				<input class="input" type="password" placeholder="密码" v-model="password" @focus="isTip = false">
				<span class="tip" v-if="isTip">{{tip}}</span>
				<input class="btn" type="button" value="登 录" @click="login">
				<br>
				<span class="resBtn" @click="toRegister">注册</span>
			</div>
		</div>
	</div>
  
</template>

<script>


export default {
  name: 'login',
  data(){
	  return{
		  username:'',
		  password:'',
		  tip:'',
		  isTip:false,
	  }
  },
  methods:{
	  toHome(){
		  this.$router.push({name:'home'})
	  },
	  toRegister(){
		  this.$router.push({name:'register'})
	  },
	  login(){
	  	if(!this.username){
	  		this.isTip = true;
	  		this.tip = '用户名不能为空';
	  	}else if(!this.password){
	  		this.isTip = true;
	  		this.tip = '密码不能为空';
	  	}else{
	  		this.$axios.post('/login',{
	  			username:this.username,
	  			password:this.password,
	  		}).then(res=>{
	  			console.log(res);
	  			let status = res.data.code;
	  			if(status == 1){
	  				this.isTip = true;
	  				this.tip = res.data.msg;
	  			}else if(status == 2){
	  				this.isTip = true;
	  				this.tip = res.data.msg;
	  			}else if(status == 4){
					localStorage.setItem('token',JSON.stringify(res.data.token))
	  				this.$router.push({name:'home'})
	  			}
	  		}).catch(err=>{
	  			console.log(err);
	  		})
	  	}
	  }
  }
}
</script>

<style scoped>
	.head{
		  height:40px;
		  display: flex;
		  justify-content: center;
		  align-items: center;
		  font-size: 20px;
		  font-weight: bold;
	}
	.icon-shouye{
		font-size: 35px;
		margin-left: 10px;
	}
	a{
		color:black;
	}
	input{
	  border: none;
	  border-radius: 8px;
	  width: 100%;
	  height: 38px;
	  margin: 20px auto;
	  background-color:transparent;
	  font-size: 14px;
	  text-indent: 12px;
	}
	
	.input{
	  border: 1.2px solid #DE3232;
	}
	.input:focus{
	  outline:none;
	}
	.input::placeholder{
	  color: #A5A5A5;
	  font-size: 16px;
	}
	.btn{
	  background-color: #DE3232;
	  color: #fff;
	  font-size: 16px;
	}
	.container .tip{
		color: red;
		font-size: 18px;
	}
	.container .resBtn{
	  float: right;
	  margin-right: 10px;
	  font-size: 18px;
	}
</style>