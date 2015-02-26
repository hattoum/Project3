var socket = io.connect("http://localhost:1337");	
$(document).ready(function(){
	var resource = $("nav").find("li").first().next();
	var resourceOn = false;
	var productOn = false;
	resource.on("resource",function(){
		$.ajax("./resource.html",{
			success: function(res){
				if(resourceOn == false){
				$(".inner").velocity("fadeOut",100);
				setTimeout(function(){$(".inner").html(res).velocity("fadeIn",100)},100);
				resourceOn = true;
				productOn = false;
				}
			},
			error: function(err, errMessage, errType){
				$(".inner").html("Bummer :( \n err:"+errMessage+" "+errType);
			}
		});
	});
	$(resource).trigger("resource");
	$(resource).on("click",function(){
		$(resource).trigger("resource");
	})
	$("nav").find("li").first().on("click",function(){
		$.ajax("./product.html",{
		success: function(res){
			if(productOn==false){
				$(".inner").velocity("fadeOut",100);
				setTimeout(function(){$(".inner").html(res).velocity("fadeIn",100)},100);
				productOn = true;
				resourceOn = false;
				}
			},
			error: function(err, errMessage, errType){
				$(".inner").html("Bummer :( \n err:"+errMessage+" "+errType);
			}
		});
	});
	$(".inner").on("submit","form",function(e){
		e.preventDefault();
		console.log($(this).find("input").val());
	})
})	