require(["require.config"], function() {
	require(["jquery", "header", "footer","template"], function($, header, footer, template) {
	function Cart () {
      this.init();
    }
    $.extend(Cart.prototype, {
        init () {
        
        this.render();
      },
        render () {
	      	this.cart = JSON.parse(localStorage.getItem("cart"));
	        var html = template("cart-template", {cart: this.cart});
	        //console.log(html);
	        $("#recommond").html(html);
	        this.change2();
	        this.getDom();
	        this.moneyBox();
	        this.shanChu();
	        this.quanxuan();
        
        },
      	getDom(){
				this.price = document.querySelector("#price").innerHTML;
			},

		change2(){
			var _this = this;
			var jian = document.querySelectorAll(".jian");
			var mide =document.querySelectorAll(".mide");
			var jia = document.querySelectorAll(".jia");
			
			for(let i=0;i<mide.length;i++){
				jia[i].onclick = function(e){
					var cart = localStorage.getItem("cart");
					e.preventDefault();
					
					this.previousElementSibling.value++;
					var num=this.previousElementSibling.value;
					
					_this.price=this.parentNode.previousElementSibling.children[0].innerHTML;
					_this.smallMoney=this.parentNode.nextElementSibling.children[0];
					//console.log(smallMoney)
					_this.allMoney=_this.price*Number(num);
					//console.log(allMoney)
					_this.smallMoney.innerHTML=_this.allMoney;
					
					let cartId=this.parentNode.parentNode.parentNode.getAttribute("deta-id");
					let i=0;
					cart=JSON.parse(cart);
					if(cart.some((item,index)=>{
						i=index;
						return item.id=cartId;
					})){
						cart[i].num++
					}
					
					
					localStorage.setItem("cart",JSON.stringify(cart));
					$("#carnum").html(header.carnum());
					_this.moneyBox();
					
				}
				jian[i].onclick = function(e){
					var cart = localStorage.getItem("cart");
					e.preventDefault();
	
				    	this.nextElementSibling.value--;
					if(this.nextElementSibling.value<1){
						this.nextElementSibling.value =1;
					}
					var num=this.nextElementSibling.value;
					let allMoney=_this.price*Number(num);
					_this.smallMoney=this.parentNode.nextElementSibling.children[0];
					_this.smallMoney.innerHTML=allMoney;
					_this.moneyBox();
					let cartId=this.parentNode.parentNode.parentNode.getAttribute("deta-id");
					let i=0;
					cart=JSON.parse(cart);
					if(cart.some((item,index)=>{
						i=index;
						return item.id=cartId;
					})){
						cart[i].num--
					}
					
					
					localStorage.setItem("cart",JSON.stringify(cart));
					$("#carnum").html(header.carnum());
					
				}
				//console.log(mide.innerHTML)
			}
			/*for (var i=0;i < mide.length;i++) {
				//console.log(_this.allMoney=_this.price*Number(num))
			}
			*/
		},
		moneyBox(){
			var allPrice =$(".allprice").get();
			//console.log(allPrice)
			var jiesuan =$(".jiesuan");
			var zongjia =$(".zongjia");
			let money=0;
			for (var i=0;i < allPrice.length;i++) {
				
				money += Number(allPrice[i].innerHTML);
				//console.log(money);
				
			}
			//console.log(jiesuan)
			jiesuan.html(money);
			zongjia.html(money);
		},
		shanChu(){
			var _this=this;
			this.shanchu=$(".shanchu");
			this.shanchu.on("click",function(){
				var scid = localStorage.getItem("cart");
				//console.log(33)
				if(confirm("确定删除这件商品吗？")){
					//localStorage.getItem("cart");
					scid=JSON.parse(scid);
					let cartId=Number($(this).parent().parent().attr("deta-id"));
					let i=0;
					scid.some((item,index)=>{
						i=index;
						return item.id=cartId;
					})
					//console.log(scid[i])
					scid.splice(i,1);
					localStorage.setItem("cart",JSON.stringify(scid))
					//_this.render();
					$(this).parent().parent().remove();
					//_this.render();
				}
			})
		},
		quanxuan(){
			var checkAll = document.querySelector("#checkAll");
			console.log(checkAll)
			var aCheck = document.querySelectorAll(".checkbox1");
			console.log(aCheck)
			var n = 0;
			checkAll.onchange=function(){
				console.log(111)
				n = checkAll.checked ? aCheck.length : 0;
				for(var i = 0; i < aCheck.length; i++){
					aCheck[i].checked = checkAll.checked;
				}
			}
			for(var j = 0; j < aCheck.length; j++){
				aCheck[j].onchange = function(){
					this.checked ? n++ : n--;
					checkAll.checked = n === aCheck.length;
				}
			}
		}
    })
    
    new Cart();	
	})
})