<template>
	<div style="height: 100%;">
		<div class="main">
			<div class="head">
				<div class="back" @click="back">
					<span class="iconfont icon-back"></span>
					<span>返回</span>
				</div>
			</div>
		</div>

			<div class="search-box">
				<div class="search">
					<input type="text" placeholder="输入关键字" v-model="searchContent" @input="search">
					<span class="iconfont icon--search1" @click="search"></span>
				</div>
			</div>
		<div class="container">
			
			
			
			<newsList :news="news" v-if="news.length!==0"></newsList>
			<div class="noContent" v-else><p>没有搜索到任何相关信息！！</p></div>
		</div>

	</div>

</template>

<script>
	// @ is an alias to /src
	import newsList from '@/components/newsList.vue'

	export default {
		name: 'searchPage',
		components: {
			newsList
		},
		data() {
			return {
				news:[],
				searchContent:'',
				
			}
		},
		methods: {
			back() {
				this.$router.go(-1);
			},
			search(){
				if(this.searchContent){
					this.$axios.post('/search',{key:this.searchContent})
					.then(res=>{
						this.news = res.data.data
					}).catch(err=>{
						console.log(err);
					})
				}else{
					this.news=[];
				}
			}
		}
	}
</script>

<style scoped>
	.head {
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

	.back span {
		color: white;
		margin-left: 10px;
		vertical-align: middle;
	}

	.back span:first-child {
		font-size: 20px;
	}

	.back span:last-child {

		font-size: 16px;
	}
	.search-box{
		position: fixed;
		width: 100%;
		margin-top: 57px;
		z-index: 100;
	}
	.search {
		position: relative;
		/* margin-top: 15px; */
		text-align: center;
	}

	.search input {
		width: 90%;
		height: 35px;
		border-radius: 5px;
		margin: 0 auto;
		outline: 0;
		border: 1px solid #888888;
		padding-left: 10px;
		box-sizing: border-box;
		
	}

	.search span {
		position: absolute;
		top: 5px;
		right: 10px;
		font-size: 20px;
		color: #888888;
		margin-right: 15px;
	}

	.container:before{
		content: '';
		display: block;
		width: 100%;
		height:88px;
	}
	.container:after {
		content: '';
		display: block;
		width: 100%;
		height: 42px;
	}

	.container {
		border-top: 1.4px solid #F7F7F7;
		width: 100%;
		position: relative;
		margin: 0 auto;
		height:100%
	}
	.noContent{
		height: 60%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
</style>
