<template>
	
	<div >
		<div class="main">
			<div class="head">
				<ul class="hList">
					<li :class="[index === 0 ? 'current' : '']" v-for="(item,index) in tabList" :key="index" @click.stop="switchTab($event,item)">{{item}}</li>
				</ul>
				<div class="search" @click="searchPage">
					<span class="iconfont icon--search1"></span>
				</div>
			</div>
		</div>
		<div class="container">
			<newsList :news="news"></newsList>
		</div>
		<div class="foot">
			<div class="fL select">
				<span class="iconfont icon-shouye"></span>
				<span>首页</span>
			</div>
			<div class="fR" @click.stop="toMine">
				<span class="iconfont icon-wode"></span>
				<span>我的</span>
			</div>
		</div>
	</div>


</template>

<script>
	// @ is an alias to /src
	import newsList from '@/components/newsList.vue'

	// import qs from 'qs';
	export default {
		name: 'home',
		components: {
			newsList,
			
		},
		data() {
			return {
				news: [],
				tabList: ['财经', '科技', '体育', '军事', '旅游'],
				isShow:true,
			}
		},
		methods: {
			searchPage() {
				this.$router.push({
					name: 'searchPage'
				});
			},
			removeClass() {
				document.querySelectorAll('.hList li').forEach(function(item, index) {
					item.classList.remove('current')
				})
			},
			switchTab(event, item) {
				let isclick = true;
				if (isclick) {
					isclick = false;
					//顶部导航样式切换
					this.removeClass();
					event.target.classList.add('current');
					//分类新闻列表的获取
					this.getNewList(item);
					//定时器
					setTimeout(function() {
						isclick = true;
					}, 500);
				}
			},
			//分类新闻列表的获取
			getNewList(item) {

				this.$axios.post('/list', {
					type: item
				}).then(res => {
					this.news = res.data.data;

				}).catch(err => {
					console.log(err);
				})
			},
			toMine() {
				this.$router.push({name:'mine'})
			},
		},
		mounted() {
			this.getNewList(this.tabList[0]);
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
		background-color: #DD3635;
		justify-content: space-between;
		align-items: center;
		margin: 0 auto
	}

	.current {
		font-size: 20px;
		color: white !important;
	}

	.hList li {
		margin-left: 20px;
		display: inline-block;
		color: #DDDDDD;
	}

	.head .search span {
		font-size: 20px;
		color: white;
		margin-right: 15px;
	}

	.container:before,
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
