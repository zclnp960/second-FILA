require(["require.config"], function() {
	require(["jquery", "header", "footer","tools"], function($, header, footer,tools) {
	
		class Yanzheng {
	
			constructor(){
//				this.user=$("username");
//				this.pwd=$("password");
				this.lalword();
			}
			lalword() {
				var str="abcdefghijklmnopqrstuvwxyz";
				
				let _this = this;
				$(".yz").on("click",function(){
					var num="";
					for(var i = 0; i < 4; i++){
					num += str.charAt(parseInt(Math.random()*str.length));
					$(".yz").html(num);
				}
				})
			}
		}
	    new Yanzheng();		     
		var userInput = document.querySelector("#username");
		var pwdInput = document.querySelector("#password");
	
		document.querySelector("#btn").onclick = function() {
			var username = userInput.value;
			var password = pwdInput.value;
			var obj={
				"username":userInput.value,
				"password":pwdInput.value
			}
			// ---发送服务器验证注册成功---
			tools.ajaxGet("http://localhost/php/zcphp.php",obj,function(res){
				console.log(res)
			if(res.res_code === 1){
					// 存cookie
				var registerObj = {
					"username": username,
					"password": password
				};
			/*tools.cookie("register", JSON.stringify(registerObj), {
				path: "/"
			});*/
			localStorage.setItem("registerObj",JSON.stringify(registerObj));
	          if(confirm("跳转到登录页吗？")){
	          	location.href = "/html/logo-in.html";
	
	          }
				}else{
					alert("用户名已存在");
				}
			})
			
			// 跳转登录页面
			
			//location.href = "dl.html";
	
			// 阻止默认提交
			return false;
		}			
	})
})