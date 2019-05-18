define(["jquery"], function ($) {
	class Footer {
		constructor () {
			this.init();
			}
		init () {
				$("#footer-container").load("/html/module/footer.html",  () => {
					// 回调函数，指的是load加载结束以后执行的代码
					/*resolve();*/
					//console.log(1);
				});
		}
	}
	return new Footer();
})