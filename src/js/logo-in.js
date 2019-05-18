require(["require.config"], function() {
	require(["jquery", "header", "footer"], function($, header, footer) {
	var userInput = document.querySelector("#user");
	var pwdInput = document.querySelector("#paw");
	var btn = document.querySelector("#btn");
	
	document.querySelector("#btn").onclick = function(e) {
		e.preventDefault();
		var username = userInput.value;
		var password = pwdInput.value;
		var obj = {
			"username":userInput.value,
			"password":pwdInput.value
		}
		/*username.value=obj.username;
		console.log(username.innerHTML)
		password.value=obj.password;*/
		//console.log(obj);
		$.ajax({
			   type: "POST",
			   url: "http://localhost/php/dl.php",
			   data: "username="+obj.username+"&password="+obj.password,
			   success: function(msg){
			    
			     msg = JSON.parse(msg);
			      //console.log(msg);
			     if(msg.res_code === 1){
				// 存cookie
				var loginObj = {
					"username": username,
					"password": password
				    }
				console.log(loginObj)
						localStorage.setItem("loginObj",JSON.stringify(loginObj));
			            //userInput.value
			            if(confirm(msg.res_message+"跳转到首页吗？")){
			        	    location.href = "/index.html";	
			            }			      	
		    	}else{
						   confirm(msg.res_message);
				}
			    
	     		   }
			});		
	}			
	})
})