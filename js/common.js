//去除body Touch事件
function RemoveBodyTouch()
{
    $("body").on("touchstart, touchmove", function (e)
    {
        e.stopPropagation();
        e.preventDefault();
        return false;
    });
}

//恢复body Touch事件
function RecoveryBodyTouch()
{
    $("body").off("touchstart, touchmove");
}

//搜索页面出现事件
function searchPanel(){
	
	var Myscroll = new IScroll('.fuzzy-search', {
        click:true,
        touchend:true,
        preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|A|SPAN)$/ },
        bindToWrapper: true,
        scrollbars: true,
        fadeScrollbars: true,
        shrinkScrollbars: 'clip'
    });
    
	//点击出现搜索
	$(".search-container").on("touchend",function(){
		$("aside.search-panel").addClass("active").find("input").focus();
		RemoveBodyTouch();
		return false;
	})
	//点击关闭搜索
	$(".close-panel").on("touchend",function(){
		$("aside.search-panel").removeClass("active").find("input").blur();
		RecoveryBodyTouch();
		return false;
	})
	//输入框实时监测显示删除按钮、模糊搜索刷新
    $(".search-panel input").on('input propertychange', function ()
    {
        var inputVal = $(this).val().trim();
        if(inputVal.length > 0){
        	$(this).siblings(".clear-button").addClass("active");
        	$(".fuzzy-search").addClass("active");
        	Myscroll.refresh();
        	}else{
        		$(this).siblings(".clear-button").removeClass("active");
        		$(".fuzzy-search").removeClass("active");
        	}
    	
    })
    //点击删除按钮清除文本框事件
	$(".clear-button").on("touchend",function(){
		$(this).removeClass("active").prev("input").val("");
    })
	//点击回车事件
	$(window).keyup(function (event)
    {
        if (event.keyCode == 13)
        {
            var keyword = $(".search-panel").find("input").val();

        }

    });
}

//数量加减事件
function numberHandle(){
	//产品列表页加载完后判断按钮显示消失
	if($(".item-box").length > 0){
		$(".number-handle-container").each(function(){
			if($(this).find("input").val().trim() <= 0){
				$(this).find("input,.reduce-button").addClass("hide");
			}
		})
	}	
	$(".number-handle-container").on("tap","em",function(){
		var inputVal = parseInt($(this).siblings("input").val());
        var maxVal = 9999;
        if ($(this).hasClass("reduce-button") && inputVal > 0){
        	$(this).siblings("input").val(--inputVal);
        }else if ($(this).hasClass("plus-button") && inputVal < maxVal){
        	$(this).siblings("input").val(++inputVal);
        }
        if($(this).parents(".item-info-container").length > 0){
			//产品列表页面
			inputVal <= 0 ? $(this).parent().find("input, .reduce-button").addClass("hide") : $(this).parent().find("input, .reduce-button").removeClass("hide");
		}
        return false;
	})	
}
//购物车弹出层事件
function cartPopover(){
	//window.onload = function(){
	var popoverWrapper = new IScroll(".cart-popover-wrapper", {
        preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|A|SPAN)$/ },
        bindToWrapper: true,
        scrollbars: true,
        fadeScrollbars: true,
        tap: true,
    });
   	//}
	
	$(".item-footer.active").on("touchend",".item-footer-cart",function(e){
		if($(".over-bg").hasClass("active")){
			$(".over-bg, .cart-popover-content").removeClass("active");
			RecoveryBodyTouch();
		}else{
			$(".over-bg, .cart-popover-content").addClass("active");
			RemoveBodyTouch();
		}
		e.stopPropagation();
	});
	$(".over-bg").on("click",function(e){
		$(".over-bg, .cart-popover-content").removeClass("active");
		RecoveryBodyTouch();
		e.stopPropagation();
	});
	
}
