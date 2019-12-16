<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
	export default {
		data(){
			return{
				
			}
		},
		methods:{
			
		},
		mounted() {
			let token = JSON.parse(localStorage.getItem('token'))
			if(token){
				//请求查询登录状态
				this.$axios.get('/login/status',{token:token}).then(res => {
					console.log(res);
				}).catch(err => {
					console.log(err);
					localStorage.removeItem('token');
					this.$router.push({
						name: 'login'
					});
				})
			}
		}
	}
</script>
<style>
	*{
		  margin: 0;
		  padding: 0;
	}
	html{
		height: 100%;
	}
	body{
	  min-width: 320px;
	  max-width: 640px;
	  width: 100%;
	  margin: 0 auto;
	  height: 100%;
	}
	a{
	  text-decoration: none;
	  color:white;
	}
	#app{
		width: 100%;
		height: 100%;
	}
	.main{
	  width: 100%;
	  /* border: 1px solid salmon; */
	}
	.container{
	  width: 94%;
	  margin: 50px auto;
	 
	}
	
	@media (max-width: 320px) {
		.foot,.head {
			width: 320px!important;
			
		}
	}
	
	@media (min-width: 640px) {
		.foot,.head {
			width: 640px!important;
		}
	}
</style>
