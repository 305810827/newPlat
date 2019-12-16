<template>
	<div>
		<div class="main">
			<div class="head">
				<span class="iconfont icon-back abso" @click="back"></span>
				<span>注册</span>
			</div>
			<div class="container">
				
					<input class="input" name="username" type="text" placeholder="用户名" v-model="username" @focus="isTip = false">
					<input class="input" name="password1" type="password" placeholder="密码" v-model="password1" @focus="isTip = false">
					<input class="input" name="password2" type="password" placeholder="重复密码" v-model="password2" @focus="isTip = false">
					<span class="tip" v-if="isTip">{{tip}}</span>
					<div class="upload">
						<div>
							<span>添加头像</span>
							<div class="addUpload" @click="beforeUpload">
								<span class="iconfont icon-jia1"></span>
							</div>
							<input type="file" name="avatar" accept="image/gif,image/jpeg,image/jpg,image/png" style="display:none" @change="changeImage($event)"
							 ref="avatarInput">
						</div>
						<div v-show="visible">
							<img :src="avatar" class="uploadImage">
						</div>
					</div>
					<input class="btn" type="button" @click="register" value="注 册"><br>
					<span class="loginBtn" @click="toLogin">登录</span>
				
			</div>
		</div>
	</div>

</template>

<script>
	
export default{
	data(){
		return{
			visible: false,
			avatar:'',
			file: null,
			username:'',
			password1:'',
			password2:'',
			isTip:false,
			tip:'',
		}
	},
	methods:{
		back(){
			this.$router.go(-1);
		},
		beforeUpload () {
		  this.$refs.avatarInput.click()
		},
		changeImage (e) {
		  var file = e.target.files[0]
		  this.file = file
		  var reader = new FileReader()
		  var that = this
		  reader.readAsDataURL(file)
		  reader.onload = function (e) {
			that.avatar = this.result
			that.visible = true
		  }
		},
		toLogin(){
			this.$router.push({name:'login'})
		},
		register(){
			if(!this.username){
				this.isTip = true;
				this.tip = '用户名不能为空';
			}else if(!this.password1){
				this.isTip = true;
				this.tip = '密码不能为空';
			}else if(this.password1 !== this.password2){
				this.isTip = true;
				this.tip = '两次密码不一致';
			}else{
				
				let formData = new FormData();
				formData.append('username', this.username);
				formData.append('password', this.password1);
				formData.append('avatar', this.file,this.file.name);
				console.log(formData.get('avatar'))
				let config = {
				              headers: {
				                'Content-Type': 'multipart/form-data'
				              }
							  // transformRequest: [function (data) {
							  //    return data
							  // }]
				            }
				this.$axios.post('/reg',formData).then(res=>{
					console.log(res);
					let status = res.data.code;
					if(status == 1){
						this.isTip = true;
						this.tip = '账号已注册';
					}else if(status == 3){
						this.toLogin();
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
	.head {
		height: 40px;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.container .tip{
		color: red;
		font-size: 18px;
	}
	.head img {
		position: absolute;
		top: 10px;
		left: 10px;
	}

	.head span {
		font-size: 20px;
		font-weight: bold;
	}
	.abso{
		position: absolute;
		top: 10px;
		left: 10px;
	}
	input {
		border: none;
		border-radius: 8px;
		width: 100%;
		height: 38px;
		margin: 10px auto;
		background-color: transparent;
		font-size: 14px;
		text-indent: 12px;
	}

	.input {
		border: 1.2px solid #DE3232;
	}

	.input:focus {
		outline: none;
	}

	.input::placeholder {
		color: #A5A5A5;
		font-size: 16px;
	}

	.btn {
		background-color: #DE3232;
		color: #fff;
		font-size: 16px;
	}

	.container .loginBtn {
		float: right;
		margin-right: 10px;
		font-size: 18px;
	}

	.container .upload{
	  margin: 10px;
	  display: flex;
	  align-items: center;
	}
	.upload>div>span {
		display: inline-block;
		color: #A5A5A5;
		margin-bottom: 10px;
	}
	.addUpload>span{
		font-size: 30px;
		
	}
	.addUpload {
		width: 68px;
		height: 68px;
		line-height: 68px;
		border: 1px dashed #ccc;
		text-align: center;
		
	}

	.addUpload:hover {
		border: 1px dashed #0000CD;
	}

	.uploadImage {
		width: 90px;
		height: 90px;
		
		margin-left: 50px;
	}
</style>
