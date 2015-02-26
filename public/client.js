var socket = io.connect("http://localhost:1337");
var optionsArray = ["Option 1","Option 2","Option 3","Option 4"];
$(document).ready(function(){
	var options;
	optionsArray.forEach(function(entry){
			options += "<option>"+entry+"</option>";
	})
	var resource = $("nav").find("li").first().next();
	var resourceOn = false;
	var productOn = false;
	var rotate = 0;
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
	$(".inner").on("click",".addResource",function(){
		var resourceEntry = $("<div class='resourceEntryDiv'><select class='resourceEntry'>"+options+"</select><input type='text'><div class='removeResource'><less>-</less></div></div>");
		$(resourceEntry).insertBefore(this).velocity("slideDown",400);
		rotate += 90;
		$(this).velocity({rotateZ: rotate+"deg"},400);
	});
	$(".inner").on("click",".removeResource",function(){
		var thisOne = $(this);
		console.log($(thisOne).parent().find("select").val());
		$(this).velocity({rotateZ: "90deg",background: "#ff0000"},200)
		setTimeout(function(){
			$(thisOne).parent().velocity("slideUp",200)},200);
		setTimeout(function(){$(thisOne).parent().remove()},401);
	})
	$(".inner").on("submit","form",function(e){
		e.preventDefault();
		if($(this).attr("id") ==="resourceForm"){
			socket.emit("resourceReq");
		}else if($(this).attr("id") ==="productForm"){
			socket.emit("productReq");
		}
	})
})	