require(["require.config"], function () {
	require(["jquery","header","footer","url",'swiper','main'], function ($,header,footer,url,Swiper,main) {
		class Index{
			constructor(){
				this.banner();

			}
			      
			banner () {
				// 首页轮播图
				var mySwiper = new Swiper ('.swiper-container', {
				  autoplay: true,
				  
				  loop: true, // 循环模式选项
				  // 如果需要分页器
				  pagination: {
					el: '.swiper-pagination',
					clickable: true
				  },
				  
				  // 如果需要前进后退按钮
				//   navigation: {
				//     nextEl: '.swiper-button-next',
				//     prevEl: '.swiper-button-prev'
					
				//   }
		
				}) 
			  }
		
		}
		new Index();
	})	
})

