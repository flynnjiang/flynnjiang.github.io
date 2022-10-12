---
layout: post
title: 在Windows上安装和使用Github Pages/Jekyll
category: notes
---

*注意：本文只在Win8.1(64位)和Win10(32位)系统上验证过，
其他Windows版本不保证能兼容（不过应该问题不大）。*

在Github Pages运行环境的搭建中，主要步骤就是Jekyll的安装。
虽然[Github Pages][]官网上没找到Windows相关的安装文档，
但在[Jelyll的官网][]中还是有提到的，它推荐了一个第三方提供的安装步骤，
详见：[http://jekyll-windows.juthilo.com/](http://jekyll-windows.juthilo.com/)

这个安装步骤非常的简单易懂，并且有效。但若做细微调整后，
还可以直接一步到位的完成Github Pages的环境搭建，具体如下：

安装Ruby和Ruby DevKit
=====================
Ruby和Ruby DevKit的安装完全参考上面推荐网址中的[“Ruby”章节][]即可。

修改RubyGems的源
================
由于国内网络原因，基本上rubygems.org的默认源已经很难使用了，就这导致
`gem install`和`bundle install`等操作经常半天没有响应，所以这里需要将其换成
[淘宝的镜像源][]，如下：

	$ gem sources --remove https://rubygems.org/
	$ gem sources -a https://ruby.taobao.org/
	$ gem sources -l
	*** CURRENT SOURCES ***

	https://ruby.taobao.org
	# 请确保只有 ruby.taobao.org

安装Github Pages
================
由于Github Pages已经将相关资源整合，所以现在安装过程可以一步到位，其会自动
依赖并安装Jekyll等包。

	gem install github-pages

运行Jekyll
==========

	jekyll serve


[Github Pages]:https://help.github.com/articles/using-jekyll-with-pages/
[“Ruby”章节]:http://jekyll-windows.juthilo.com/1-ruby-and-devkit/
[Jelyll的官网]:http://jekyllrb.com/docs/windows/
[淘宝的镜像源]:http://ruby.taobao.org/