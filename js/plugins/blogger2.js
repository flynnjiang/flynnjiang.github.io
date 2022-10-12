(function($) {


    
	$.fn.blogger = function(options) {

        var defaults = {
            'id' : '5568048636599513853',
            'key' : 'AIzaSyD9TfhepQP6C50axzubBBPHMHoPFnDdcJw',
            'max_posts' : '20'
        };

		var options = $.extend(defaults, options);
		var target = this;
        var prev_page_token;
        var next_page_token;
		
        /* Response callback */
		var resp_callback = function(result) {

            if (!result.items)
            {
                prev_page_token = "";
                $("a#blogger_prev_page", target).hide();
                return -1;
            }

            /*$("ul#blogger_posts", target).html("");*/
			
			$(result.items).each(function() {
				$("ul#blogger_posts", target).append(
                      '<li>'
                    + '   <a href="'+ this.url + '">' + this.title + '</a>'
                    + '   <span class="meta">(' + this.published.substr(0,10) + ')</span>'
                    + '</li>');
			});


            if (result.prevPageToken) {
                prev_page_token = result.prevPageToken;
                $("a#blogger_prev_page", target).show();
            } else {
                prev_page_token = "";
                $("a#blogger_prev_page", target).hide();
            }

            if (result.nextPageToken) {
                next_page_token = result.nextPageToken;
                $("a#blogger_next_page", target).show();
            } else {
                next_page_token = "";
                $("a#blogger_next_page", target).hide();
            }
		};

        /* Fetch page */
        var fetch_page = function(page_token) {
            //$("ul#blogger_posts", target).html("努力加载中。。。");

            $.getJSON(
                'https://www.googleapis.com/blogger/v3/blogs/' + options.id + '/posts'
                + '?'
                + 'fields=items(published,title,updated,url),nextPageToken'
				+ '&maxResults=' + options.max_posts
                + (page_token ? ('&pageToken=' + page_token) : "")
                + '&key=' + options.key,
                resp_callback);
         };


        if (0 == $("ul#blogger_posts", this).length)
        {
            target.append(
                  '<ul id="blogger_posts"></ul>'
                + '<div id="blogger_pagination">'
                + '     <a id="blogger_next_page" href="javascript:void(0)" onclick="BloggerNextPage()">查看更多...</a>'
                + '</div>'
            );
        }

        $("#blogger_pagination").css({
            'text-align' : 'right',
            'width' : '90%',
            'margin' : '0 0 0 2em',
        });

        $("#blogger_pagination a").css({
            'display' : 'block',
            'height' : '2em',

            'text-align' : 'center'
        });

        $("#blogger_prev_page").css({
        });

        $("#blogger_next_page").css({
        });

        $("a#blogger_prev_page", this).hide();
        $("a#blogger_next_page", this).hide();

        fetch_page();


        /* Public functions */
        $.fn.blogger.prev_page = function(){
            /*alert("fetch prev page: " + prev_page_token);*/
            fetch_page(prev_page_token);
        };

        $.fn.blogger.next_page = function() {
            /*alert("fetch next page: " + next_page_token);*/
            fetch_page(next_page_token);
        };
	};

    

    BloggerPrevPage = function() {
        $.fn.blogger.prev_page();
    };

    BloggerNextPage = function() {
        $.fn.blogger.next_page();
    };

})(jQuery);
