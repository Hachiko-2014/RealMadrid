/*下拉菜单*/
$(function(){                                    
	$("#nav li").hover(function(){
	    $(this).find(".jnNav").show();
	},function(){
	    $(this).find(".jnNav").hide();
	});
})

/*中间的轮播图*/                                         
$(function(){
	var $imgrolls = $("#trophy div a");
	$imgrolls.css("opacity","0.7");
    var len=$imgrolls.length;                    //获取整个区域的长度
	var index=0;
	var adTimer=null;
	$imgrolls.mouseover(function(){              //鼠标移入的时候记住图片当前的角标
		index=$imgrolls.index(this);
		showImg(index);
	}).eq(0).mouseover();	                     //eq(0).mouseover()初始化

	$("#trophy").hover(function(){               //滑入停止动画，滑出开始动画.      
			if(adTimer){ 
				clearInterval(adTimer);          //鼠标重新移除后，清除之前的adTimer
			}
		 },function(){
			adTimer=setInterval(function(){
			    showImg(index);
				index++;
				if(index==len){index=0;}
			},5000);                             //设置一个定时器，每5000毫秒显示一张当前角标的图片，然后角标加1，如果角标等于整个区域的len长度则index重新赋值为0
	}).trigger("mouseleave");
})

function showImg(index){                         //显示不同的图片
	var $carouselObj=$("#trophy");
	var $carouselList=$carouselObj.find("div a");
	var newHref=$carouselList.eq(index).attr("href");
	$("#JS_imgWrap").attr("href",newHref).find("img").eq(index)     //根据获得的角标得到新的图片地址
	.stop(true,true).fadeIn().siblings().fadeOut();                 //给id为JS_imgWrap的标签添加一个新的地址，找到与角标相同的图片并淡入该图片，而它旁边的图片则淡出
	$carouselList.removeClass("blank").css("opacity","0.7").eq(index)
	.addClass("blank").css("opacity","1");                           //寻找id为trophy下面所有的div a标签，给它以透明度为0.7的方式移除chos样式，然后给等于index的a标签添加透明度为1的chos样式
}

/*成员横向滚动*/
$(function(){
    $("#playerTab li a").click(function(){ 
		$(this).parent().addClass("blank").siblings().removeClass("blank");
		var idx=$("#playerTab li a").index(this);
		showPlayerList(idx);
		return false;
   }).eq(0).click();
});

function showPlayerList(index){
	var $rollObj=$("#playerList");
    var rollWidth=$rollObj.find("li").outerWidth();
	rollwidth=rollWidth*3;                                           //一次出现3名球员
	$rollObj.stop(true,false).animate({left:-rollwidth*index},1000);
}