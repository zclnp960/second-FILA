require(["require.config"], function() {
	require(["jquery", "header", "footer", "main","url","template","fly"], function($, header, footer, main,url,template) {
	class Detail {
		constructor () {
			this.init();
		}
		init () {
        // 获取id，然后请求数据
        let id = location.search.slice(4);
        // 带着id请求详情页数据
        $.ajax({
          url: url.baseUrl+"/detail?id="+id,
          method: "GET",
          dataType: "json",
          success :  res => {
          	//console.log(res)
            if(res.res_code === 1){
              // 保存当前商品数据
              //console.log(res)
              this.detail = res.res_body.data.detail;
              // 由于rap2返回的id都一样，所以要手动的修改当前数据的id，真实开发中不用写这行代码
              this.detail.id = id;

              // 渲染详情页
              this.render(res.res_body.data);
            }
          }
        })
      }
      render (data) {
      	//console.log(data)
        var html = template("detail-template", data.detail);
        //console.log(html)
        $(".detail-warp").html(html);
        // 绑定事件
        this.addToCart();
      }
      addToCart () {
        //addToCart($(".add_cart_li"), "#btn_car", this.detail);
	        $("#btn_car").on("click",(e) => {
	        	$(`<div style="width:40px;height:40px;background:blue;"></div>`).fly({
	        start:{
	          left: e.clientX,  //开始位置（必填）#fly元素会被设置成position: fixed
	          top: e.clientY,  //开始位置（必填）
	        },
	        end:{
	          left: $("#carnum").offset().left, //结束位置（必填）
	          top: $("#carnum").offset().top  //结束位置（必填）
	          
	        },
	        autoPlay: true, //是否直接运动,默认true
	        speed: 1.3, //越大越快，默认1.2
	        vertex_Rtop: 20, //运动轨迹最高点top值，默认20
	        onEnd: function(){
	          this.destroy(); // 把运动的小方块销毁
	          // 购物车数量加1
	          //$(".shop").html(Number($(".shop").html())+1);
	
	        } //结束回调
	      })
        	let cart = localStorage.getItem("cart");
        	//console.log(this.detail)      	
        	if(cart){
        		cart = JSON.parse(cart);
        		let index;
        		if(cart.some((item,i) => {
        			index = i;
        			return item.id == this.detail.id;
        		})){
        			console.log(cart);
        			cart[index].num++;
        		}else{
        			this.detail.num =1;
        			cart.push(this.detail);
        		}
        		localStorage.setItem("cart",JSON.stringify(cart));
        	}else{
        		this.detail.num =1;
        		localStorage.setItem("cart",JSON.stringify([
        			this.detail  		
        		]));
        	}
        })
      }
	}
	new Detail();
	})
})