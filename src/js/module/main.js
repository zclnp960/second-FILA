define(["jquery"], function ($) {
	class Main {
		constructor () {
			this.init().then(() => {
			this.touch = $(".touch");
			//console.log(this.touch)
			this.showhide=$(".show-hide");
			this.show();
			})
		}
		init () {
			return new Promise((resolve, reject) => {
				$("#main-container").load("/html/module/main.html",  () => {
					// 回调函数，指的是load加载结束以后执行的代码
					resolve();
					//console.log(1);
				});
			})	
		}
		show () {
			let _this = this;
			this.touch.on("click",function(){
				console.log(123)
				const index = $(this).parent().index()
				//_this.showhide.stop().slideUp();
				console.log(_this.touch.eq(index).siblings('.show-hide').parent().siblings().children("ul"))
				_this.touch.eq(index).siblings('.show-hide').parent().siblings().children("ul").hide();
				_this.touch.eq(index).siblings('.show-hide').slideToggle("fast");
			})
		}
	}
	return new Main();
})