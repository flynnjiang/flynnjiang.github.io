/*
 * GitHubRepos 0.1
 * Copyright (c) 2012 Flynn Jiang http://jiangfeng.org
 * Date: 2012-6-24
 * Get repos list by user name, base on GitHub API v3.
 *
 * Usage: 
 * 		$('#ooxx').GitHubRepos({
 * 			username : xxx,
 * 			callback : function(data){...};
 *		});	
 */
(function($) {
	$.fn.GitHubRepos = function(options) {

		var ReposCallback = function(result) {
			$(result.data).each(function() {
				target.append(
					  '<dt><a href="'+ this.html_url + '" target="_blank">' + this.name + '</a></dt>'
					+ '<dd>' + this.description + '</dd>');
			});
		};

		var defaults = {
			username : 'flynnjiang',
			callback : ReposCallback
		};

		var target = this;
		var options = $.extend(defaults, options);

		$.getJSON('https://api.github.com/users/' + options.username + '/repos?callback=?', options.callback);
	};
})(jQuery);
