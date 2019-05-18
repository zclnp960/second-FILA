require(["require.config"], function() {
	require(["jquery", "header", "footer", "main", "url", "template"], function($, header, footer, main, url, template) {
		class List {
			constructor() {
				this.caty();
			}
			caty() {
				$.ajax({
					url: "http://rap2api.taobao.org/app/mock/164792/caty",
					method: "GET",
					dataType: "json",
					success: function(res) {
						if(res['res_code'] === 1) {
							let list = res['res_body'].list;
							console.log(list)
							var html = template("catyList", {
								list
							});
							$("#catyListContainer").html(html);
						}
					}
				})
			}
		}
		return new List();
	})
})