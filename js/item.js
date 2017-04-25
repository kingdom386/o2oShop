var navBox, contentBox, nav = $(".item-nav ul>li");
window.onload = function () {
	//console.log("item");
    var winHeight = $(window).height();
    var headerHeight, footerContainer;
    var searchContainer = $(".item-search-container").height();
    var itemTabContainer = $(".item-tab-container").height();
    if($(".common-head").length <= 0){
    	headerHeight = 0;
    }else{
    	headerHeight = $(".common-head").height();
    }
    if($(".footer-container").length <= 0){
    	footerContainer = 0;
    }else{
    	footerContainer = $(".footer-container").height();
    }  
    $(".item-box").css("height", winHeight-searchContainer-headerHeight-itemTabContainer-footerContainer);
    
    navBox = new IScroll(".item-nav", {
        //click: true,
        //touchend: true,
        preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|A|SPAN)$/ },
        bindToWrapper: true,
        scrollbars: true,
        fadeScrollbars: true,
        tap: true,
    });
    contentBox = new IScroll(".item-content", {
        //click: true,
        touchend: true,
        tap: true,
        preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|A|SPAN)$/ },
        bindToWrapper: true,
        scrollbars: true,
        fadeScrollbars: true,
    });
    checkShow($(".item-box-content"));
    //contentBox.on("scrollEnd",checkShow($(window)));
    nav.on("tap", function () {
        $(this).addClass("active").siblings("li").removeClass("active");
        var a = $(this).children("a").attr("rel");
        a = $(".item-box-" + a);
        a.show().siblings().hide();
        contentBox.refresh();
        contentBox.scrollTo(0, 0);
        checkShow($(".item-box-content"));
        //contentBox.on("scrollEnd", checkShow($(".item-box-content")));
        navBox.scrollToElement(this, 100);
    });
    nav.eq(0).trigger("tap");
}

$(".item-tab-container").on("touchend","a",function(){
	$(this).addClass("active").siblings("a").removeClass("active");
	$(".item-section-content").eq($(this).index()).show().siblings().hide();
	$(this).siblings(".item-tab-border").css("left",$(this).width()*$(this).index());
	if($(this).index() == 1){
		$(".item-footer, .over-bg, .cart-popover-content").hide();
	}
})

$(function(){
	//轮播图动�?
	var mySwiper = new Swiper('.swiper-container', {
        autoplay: 4500,
        autoplayDisableOnInteraction: false,
        loop: true,
        pagination: '.swiper-pagination'
    });   
})

