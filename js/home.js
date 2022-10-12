
$(document).ready(function(){
    $(".home_nav_item").mouseover(function(){
        $(this).children('i').stop().animate({'margin-top': '0px'}, 150);
    });

    $(".home_nav_item").mouseout(function(){
        $(this).children('i').stop().animate({'margin-top': '10px'}, 150);

    });
});
