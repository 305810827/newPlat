(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-dd5a1f36"],{"5f22":function(a,s,t){},"655a":function(a,s,t){"use strict";var i=t("5f22"),e=t.n(i);e.a},7803:function(a,s,t){"use strict";t.r(s);var i=function(){var a=this,s=a.$createElement,t=a._self._c||s;return t("div",[t("div",{staticClass:"main"},[t("div",{staticClass:"head"},[t("span",{staticClass:"iconfont icon-back abso",on:{click:a.back}}),t("span",[a._v("注册")])]),t("div",{staticClass:"container"},[t("input",{directives:[{name:"model",rawName:"v-model",value:a.username,expression:"username"}],staticClass:"input",attrs:{name:"username",type:"text",placeholder:"用户名"},domProps:{value:a.username},on:{focus:function(s){a.isTip=!1},input:function(s){s.target.composing||(a.username=s.target.value)}}}),t("input",{directives:[{name:"model",rawName:"v-model",value:a.password1,expression:"password1"}],staticClass:"input",attrs:{name:"password1",type:"password",placeholder:"密码"},domProps:{value:a.password1},on:{focus:function(s){a.isTip=!1},input:function(s){s.target.composing||(a.password1=s.target.value)}}}),t("input",{directives:[{name:"model",rawName:"v-model",value:a.password2,expression:"password2"}],staticClass:"input",attrs:{name:"password2",type:"password",placeholder:"重复密码"},domProps:{value:a.password2},on:{focus:function(s){a.isTip=!1},input:function(s){s.target.composing||(a.password2=s.target.value)}}}),a.isTip?t("span",{staticClass:"tip"},[a._v(a._s(a.tip))]):a._e(),t("div",{staticClass:"upload"},[t("div",[t("span",[a._v("添加头像")]),t("div",{staticClass:"addUpload",on:{click:a.beforeUpload}},[t("span",{staticClass:"iconfont icon-jia1"})]),t("input",{ref:"avatarInput",staticStyle:{display:"none"},attrs:{type:"file",name:"avatar",accept:"image/gif,image/jpeg,image/jpg,image/png"},on:{change:function(s){return a.changeImage(s)}}})]),t("div",{directives:[{name:"show",rawName:"v-show",value:a.visible,expression:"visible"}]},[t("img",{staticClass:"uploadImage",attrs:{src:a.avatar}})])]),t("input",{staticClass:"btn",attrs:{type:"button",value:"注 册"},on:{click:a.register}}),t("br"),t("span",{staticClass:"loginBtn",on:{click:a.toLogin}},[a._v("登录")])])])])},e=[],n=(t("b0c0"),{data:function(){return{visible:!1,avatar:"",file:null,username:"",password1:"",password2:"",isTip:!1,tip:""}},methods:{back:function(){this.$router.go(-1)},beforeUpload:function(){this.$refs.avatarInput.click()},changeImage:function(a){var s=a.target.files[0];this.file=s;var t=new FileReader,i=this;t.readAsDataURL(s),t.onload=function(a){i.avatar=this.result,i.visible=!0}},toLogin:function(){this.$router.push({name:"login"})},register:function(){var a=this;if(this.username)if(this.password1)if(this.password1!==this.password2)this.isTip=!0,this.tip="两次密码不一致";else{var s=new FormData;s.append("username",this.username),s.append("password",this.password1),s.append("avatar",this.file,this.file.name),console.log(s.get("avatar"));this.$axios.post("/reg",s).then((function(s){console.log(s);var t=s.data.code;1==t?(a.isTip=!0,a.tip="账号已注册"):3==t&&a.toLogin()})).catch((function(a){console.log(a)}))}else this.isTip=!0,this.tip="密码不能为空";else this.isTip=!0,this.tip="用户名不能为空"}}}),o=n,r=(t("655a"),t("2877")),c=Object(r["a"])(o,i,e,!1,null,"b30a6a1c",null);s["default"]=c.exports},b0c0:function(a,s,t){var i=t("83ab"),e=t("9bf2").f,n=Function.prototype,o=n.toString,r=/^\s*function ([^ (]*)/,c="name";!i||c in n||e(n,c,{configurable:!0,get:function(){try{return o.call(this).match(r)[1]}catch(a){return""}}})}}]);
//# sourceMappingURL=chunk-dd5a1f36.718fd280.js.map