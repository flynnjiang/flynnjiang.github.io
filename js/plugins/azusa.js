/*
 * Azusa 0.1
 * Copyright (c) 2012 Flynn Jiang http://jiangfeng.org
 * Date: 2012-6-24
 * 在浏览器窗口右下角显示一个可爱的阿梓喵（非要看别的萌妹子的话，也不是不可以啦）
 *
 * Usage: 
 * 		Azusa([
 *			{
 * 				words : ooxx,
 * 				img_url : xxoo
 *			},
 *			{
 * 				words : ooxx,
 * 				img_url : xxoo
 *			},
 * 			...
 * 		]);	
 */

(function($) {
	$.fn.Azusa = function(options) {

		var pre_load = function(){
			if ($('#azusa_preload').attr('src') == $('#azusa_image').attr('src'))
			{
				for (var next_idx = curr_idx + 1; next_idx < options.length; next_idx++)
				{
					if (options[next_idx].img_url != options[curr_idx].img_url) {
						$('#azusa_preload').attr('src', options[next_idx].img_url)
						break;
					}
				}
			}
		};

		var defaults = [
			{
				words : '大家好，我也是中野梓...',
				img_url : '/azusa/hehe.gif'
			}
		];

		var target = this;
		var options = $.extend(defaults, options);
		var curr_idx = 0;
		
		if (0 == options.length)
			return -1;

		$('body').append(
				 '<div id="azusa_container">'
				+ 	'<div id="azusa_words"></div>'
				+	'<img id="azusa_image" />'
				+	'<img id="azusa_preload" />'
				+'</div>');

		$('#azusa_container').css({
			'display' : 'block',
			'position' : 'fixed',
			'bottom' : '10px',
			'right' : '10px'
		});
		
		$('#azusa_words').css({
			'width' : '100px',
			'position' : 'absolute',
			'right' : '120px',
			'bottom' : '100px',
			'padding' : '5px',
			'font-size' : '12px',
			'text-align' : 'left',
			'border' : '1px solid #ccc',
			'-webkit-border-radius' : '8px',
			'-moz-border-radius' : '8px',
			'border-radius' : '8px'
		});
		
		$('#azusa_image').css({
			'cursor' : 'pointer'
		});
		
		$('#azusa_preload').css({
			'display' : 'none'
		});
		

		curr_idx = 0;
		$('#azusa_words').text(options[curr_idx].words);
		$('#azusa_preload').attr('src', options[curr_idx].img_url);
		$('#azusa_image').attr('src', options[curr_idx].img_url);
		$('#azusa_image').click(function(){
			curr_idx++;
			curr_idx = curr_idx % options.length;
            if (options[curr_idx].img_url && "" != options[curr_idx].img_url) {
			    $('#azusa_image').attr('src', options[curr_idx].img_url);
            }
			$('#azusa_words').text(options[curr_idx].words);

			pre_load();
		});
		
		pre_load();
	};
	
	Azusa = function(opts){
		$.fn.Azusa(opts);
	};
})(jQuery);
