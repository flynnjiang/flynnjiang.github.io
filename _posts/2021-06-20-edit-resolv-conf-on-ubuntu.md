---
layout: post
title: 在Ubuntu上手动修改/etc/resolv.conf文件
category: notes
---

# 修改步骤

在Ubuntu上，/etc/resolv.conf由多个管理程序同时在管理，想要手动编辑这个文件的
话，需要先禁用掉相关的管理策略。步骤如下：

## 禁用systemd-resolved的管理
查看下/etc/resolv.conf是否为符号链接，如果是的话，把它改成普通文件即可，这样
systemd-resolved变不会再去修改这个文件。

## 禁用NetworkManager的管理
修改/etc/NetworkManager/NetowrkManager.conf文件，在`main`章节下，添加
`dns=none`的配置项，类似这样子：

```ini
[main]
plugins=ifupdown,keyfile
dns=none

[ifupdown]
managed=false

[device]
wifi.scan-rand-mac-address=no
```

## 手动修改/etc/resolv.conf
根据自己的需要手动修改`/etc/resolv.conf`即可


# 参考资料
[NetworkManager.conf](https://developer.gnome.org/NetworkManager/stable/NetworkManager.conf.html)
