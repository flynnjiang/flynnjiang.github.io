
$(document).ready(function(){
    $("header").mouseenter(function(){
		$('#hdr_nav').stop().animate({'top': '-60px'});
    });

    $("header").mouseleave(function(){
        $('#hdr_nav').stop().animate({'top': '0'});
    });
});


$(document).ready(function(){
	$("#hdr_search .hdr_search_box").keypress(function(event){
		if (event.which == 13) {
			$("#q").val($("#word").val() + " site:jiangfeng.org");
			$("#hdr_search").submit();
		}
	});
});
