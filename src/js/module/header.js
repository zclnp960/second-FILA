define(["jquery"], function ($) {
	class Header {
		constructor () {
			this.init().then(() => {;
			this.textfield = $("#textfield");
			this.searchContainer = $("#search_result_search_fm");
			this.search();
			this.denglu();
			this.carnum();
			})
		}
		init () {
			return new Promise((resolve, reject) => {
				$("#header-container").load("/html/module/header.html",  () => {
					// 回调函数，指的是load加载结束以后执行的代码
					/*resolve();*/
					resolve();
					
				});
			})
		}
			search () {
				let _this = this;
				this.textfield.on("keyup", function () {
					let keyWord = $(this).val().trim();
					// 内容不为空才请求
					if(keyWord !== ""){
						// getJSON可以完成jsonp跨域，数据返回了自动调用后面的回调
						$.getJSON("https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?cb=?&wd="+keyWord, res => {
							let list = res.s;
							let ul = $("<ul>");
							list.forEach( function(item, index) {
								$("<li>").html(item).appendTo(ul);
							});
							_this.searchContainer.empty().show().append(ul);
						})
					}else{
						// 把上一次请求渲染出来的container隐藏
						_this.searchContainer.hide();
					}

					
				})

				this.textfield.on("blur", function () {
					setTimeout(() => {
						_this.searchContainer.hide();
					},200);
					
				})

				this.searchContainer.on("click", "li", function (e) {
					_this.textfield.val($(this).html());
					_this.searchContainer.hide();
				})
			}
		denglu() {
			var _this = this;
			this.huanying = $("#huanying");
			this.cancel = $("#cancel");
			this.login = $("#login");
			this.regis = $("#regis");
			this.yonghuming=$("#name");
			var loginObj = localStorage.getItem("loginObj");
			//console.log(loginObj)
			if (loginObj) {
               loginObj= JSON.parse(loginObj)
               _this.cancel.css({
   						"display": "block"
					})
               _this.login.css({
   						"display": "none"
					})
               this.regis.css({
               		"display": "none"
               })
               _this.huanying.css({
   						"display": "block"
					})
               _this.yonghuming.html(loginObj.username);

			}
			_this.cancel.on("click",function(){
				if(confirm("确定退出？")){
					_this.cancel.css({
   						"display": "none"
					})
               _this.login.css({
   						"display": "block", 
   						"float":"left"
					})
               _this.regis.css({
               		"display": "block",
               		"float":"left"
               })
               _this.huanying.css({
   						"display": "none"
					})
               localStorage.removeItem("loginObj");
				}
				
				
			})
		}
		carnum(){
			var cart1 = localStorage.getItem("cart");
			//console.log(cart1)
				if (cart1) {	
					cart1 = JSON.parse(cart1);
					//console.log(cart1)
					let num = cart1.reduce(function(num, prod) {
						num += Number(prod.num);
						return num;
					}, 0);
					//console.log(num)
	
					$("#carnum").html(num);
				}
		}
		
	}
	return new Header();
})