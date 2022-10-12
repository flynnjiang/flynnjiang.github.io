---
layout: post
title: 中文markdown转pdf
category: notes
---

这里需要用个两个利器，就是“pandoc”和“xetex”。

pandoc
======
pandoc软件包提供了一个工具——markdown2pdf，它可以直接把markdown文件转化为pdf文件，
为我们省去了中间步骤等麻烦的东西，一步就位。但是当我们的文件中有中文时，
就得稍微设置一下了。那到底都要设置些什么呢？

TeX引擎
-------
在生成pdf文件时，markdown2pdf其实还是先转换成了TeX文件的，然后用默认引擎pdflatex
来导出pdf。而对于排版引擎，我还是偏爱XeTeX的，毕竟人原生就支持unicode。pdflatex
虽然使用CJK宏包也能支持中文，但可选择字体实在是有点少了。

~~那么怎样让markdown2pdf默认使用XeTeX呢？很简单，只要加上"--xetex"选项就可以了。~~

*新版的pandoc软件包去掉了markdown2pdf工具，转而直接使用
`pandoc --latex-engine=pdflatex|lualatex|xelatex`命令。*

TeX模板
-------
光选好了引擎还是不够的，模版也得设置一下。否则就会因为没有设定合适的字体，导致
最终中文还是显示不出来。

那模板要怎么写呢？一个简便的方法就是，使用`pandoc -D latex > pandoc.template`导出
pandoc的默认模板，然后修改一下字体就行了。

    ...
    % 添加此行，设置默认字体
    \setmainfont{Droid Sans Fallback}

    $if(mainfont)$
        \setmainfont{$mainfont$}
    $endif$
    ...

至于字体的名称，可以使用`fc-list :lang=zh`来查看。模板修改完毕后，我们
只要在生成时加上"--template=<path>"选项就OK了。

默认情况下，TeX引擎是按着英文的习惯来排版的，对于中文，会显得比较难看，
这时候可以考虑使用一下xeCJK宏包。xeCJK针对中文做了一些版式上的微调，
看起来会舒服点。

    ...
    \else % if luatex or xelatex
      \usepackage{fontspec}

      \ifxetex
        \usepackage{xltxtra,xunicode}

        % 添加xeCJK宏包
        \usepackage{xeCJK}
        \setCJKmainfont{Droid Sans Fallback}
        \setCJKsansfont{Droid Sans Fallback}
        \setCJKmonofont{Droid Sans Fallback}

      \fi

      % 注释掉此行，否则会冲突
      %\defaultfontfeatures{Mapping=tex-text,Scale=MatchLowercase}

      \newcommand{\euro}{€}

    $if(mainfont)$
        \setmainfont{$mainfont$}
    $endif$
    ...

但也仅仅就是舒服点了，倘若你想完全按着自己的想法来排版的话，还是
重头写一下这个模板文件吧。

XeTeX
=====
XeTeX和上面提到的fc-list，都可以通过安装texlive这个发行版搞定。

生成
====
非常简单，综合上面的两个选项就可以：
~~`markdown2pdf --template=./pandoc.template --xetex hello.md`~~

*新版本的pandoc中，已经去掉了markdown2pdf这个工具。相应的，pandoc
已经可以直接导出pdf了。用法基本没变，如下：*

    pandoc hello.md --latex-engine=xelatex --template=pandoc.template -o hello.pdf

