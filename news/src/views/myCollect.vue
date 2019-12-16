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

		<div class="container" v-if="news.length!==0">
			<newsList :news="news"></newsList>
		</div>
		<div class="noContent" v-else>
			<p>暂无收藏!!!</p>
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
		data() {
			return {
				news: []
			}
		},
		methods: {
			back() {
				this.$router.go(-1);
			},
		},
		mounted() {
			this.$axios.post('/collectList', {
					token: JSON.parse(localStorage.getItem('token'))
				})
				.then(res => {
					for(let i = 0; i < res.data.data.length; i++){
						this.news.push(res.data.data[i].newId)
					}
					console.log(res.data.data);
				}).catch(err => {
					console.log(err);
				})
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
		margin: 0 auto;
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
		height: 100%;
		position: relative;
		margin: 0 auto;
	}
	.noContent{
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
