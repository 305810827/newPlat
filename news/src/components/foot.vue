<template>
	<div class="foot">
		<div class="fL" :class="[flag ? 'select':'']"  @click.stop="switchBtn(1)">
			<span class="iconfont icon-shouye"></span>
			<span>首页</span>
		</div>
		<div class="fR" :class="[flag ? '':'select']" @click.stop="switchBtn(1)">
			<span class="iconfont icon-wode"></span>
			<span>我的</span>
		</div>
	</div>
</template>

<script>
	export default {
	  name: 'foot',
	  props:{
	  	flag:{
	  		type:Boolean,
	  		default:false
	  	},
		// isSelect2:{
		// 	type:Boolean,
		// 	default:false
		// }
	  },
	  data(){
		  return{
			  isclick:true,
			  // isSelect:false
		  }
	  },
	  methods:{
		  switchBtn(flag){
			  console.log(flag)
			  if(flag){
				  this.$router.push({name:'mine'})
			  }else{
				  this.$router.push({name:'home'})
			  }
		  },
		  // mine(){
			 //  if(this.isclick){
				//   this.isclick = false;
				//   this.$router.push({name:'mine'})
				//   setTimeout(function() {
				//   	this.isclick = true
				//   }, 500);
			 //  }
			 
		  // }
	  }
	}
</script>

<style>
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
	
	.select{
		color: red;
	}
</style>
