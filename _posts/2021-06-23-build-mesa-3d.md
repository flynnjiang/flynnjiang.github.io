---
layout: post
title: 在Ubuntu上编译mesa库出错的问题
category: notes
---

# 安装依赖

我是在Ubuntu 20.04上编译mesa 20.2.6版本报错的，报错原因就是缺少某些依赖，
安装完相关依赖就可以了。

## 方法1

这是在这篇[博文][https://www.collabora.com/news-and-blog/blog/2018/02/12/virtualizing-gpu-access/]
里发现的方法，其利用了Ubuntu源码仓库上mesa包已有的编译依赖关系，一键安装所有依赖。

```
sudo sed -i 's/\#deb-src/deb-src/' /etc/apt/sources.list
sudo apt update
sudo apt-get build-dep mesa
```

第一二条命令是为了开启source.list里面的deb-src源码仓库，如果执行完后没成功
反注释掉相关行，估计是那个#和deb-src之间有空格了，自己调整一下命令就行。

## 方法2

这是我费蛮力手动找出来的依赖包，汇总了一下，装完应该也可以编译：

```shell
sudo apt-get install libdrm-dev llvm libwayland-dev wayland-protocols \
libwayland-egl-backend-dev libx11-dev libxext-dev libxdamage-dev \
libxcb-glx0-dev libx11-xcb-dev libxcb-dri2-0-dev libxcb-dri3-dev \
libxcb-present-dev libxshmfence-dev libxxf86vm-dev libxrandr-dev
```

# 查找依赖包的方法

如果安装了上面的软件包还是缺少某些依赖的话，可以尝试用下面的方法找到依赖包。

## 缺少库的情况

这种情况的提示一般如下，里面会有"found: NO (tried pkgconfig and cmake)"字样。

```
Run-time dependency libdrm_amdgpu found: NO (tried pkgconfig and cmake)

meson.build:1415:4: ERROR: Dependency "libdrm_amdgpu" not found, tried pkgconfig and cmake

A full log can be found at /data/projects/mesa-20.2.6/build/meson-logs/meson-log.txt
flynn@work:~/projects/mesa-20.2.6/build$ 
```

初步来看，编译系统应该是通过`pkg-config`来判断libdrm_amdgpu库是否存在的，
而`pkg-config`则是通过在/lib/pkgconfig/等类似文件夹下读取对应的
libdrm_amdgpu.pc描述文件来获得信息的,所以我们可以通过搜索并安装
libdrm_amdgpu.pc文件对应的包来解决依赖问题，方法如下：

```
flynn@work:~/projects/mesa-20.2.6/build$ apt-file search libdrm_amdgpu.pc
libdrm-dev: /usr/lib/x86_64-linux-gnu/pkgconfig/libdrm_amdgpu.pc
flynn@work:~/projects/mesa-20.2.6/build$ 
```

可以看到，pc文件位于libdrm-dev包中，安装它即可。

```
flynn@work:~/projects/mesa-20.2.6/build$ sudo apt-get install libdrm-dev
```

## 缺少其他文件的情况

比如这种提示：

```
llvm-config found: NO need '>= 8.0.0'
Run-time dependency LLVM found: NO (tried config-tool)
Looking for a fallback subproject for the dependency llvm
meson.build:1493:2: ERROR: Subproject directory not found and llvm.wrap file not found
A full log can be found at /data/projects/mesa-20.2.6/build/meson-logs/meson-log.txt
```

这种直接搜对应的文件名的就行，因为不是库，所以不用加上.pc的后缀。

```
flynn@work:~/projects/mesa-20.2.6/build$ apt-file search llvm-config
llvm: /usr/bin/llvm-config                
llvm: /usr/share/man/man1/llvm-config.1.gz
llvm-10: /usr/bin/llvm-config-10
llvm-10: /usr/lib/llvm-10/bin/llvm-config
...
```

搜出来的结果比较多，包括了多个llvm的版本，显然我们安装llvm这一个就可以了。

```
flynn@work:~/projects/mesa-20.2.6/build$ sudo apt-get install llvm
```

