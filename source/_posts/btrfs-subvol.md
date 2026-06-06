---
title: 踩坑记录：Btrfs 挂载时要显式声明子卷
date: 2026-06-06 16:05
category: 技术
tags: [Linux]
description: 记尝试修复 Timeshift 恢复快照后 Failed to mount /boot 时踩的坑
---

_感谢 [idadwind](https://www.idadwind.com/) 全程提供的帮助喵！_

# 前情提要

当初为了偷懒，我用了 archinstall 来安装 Arch Linux，导致现在出了问题时啥也不会，大家不要学我 qwq

我采用了**具有 Ubuntu 类型的子卷布局（`@` 和 `@home` 子卷）的 Btrfs 分区**，并使用 Timeshift 定时快照。

# 导火索

最近滚动更新给我字体滚出了点问题。我想用 Timeshift 恢复到字体出问题前的快照，拿一些信息来帮助调试。然而，这时，意外发生了，在我重启的时候：

```
[FAILED] Failed to mount /boot.
```

# 尝试修复

wind 热心地帮助我修复。在经过一些尝试后，wind 发现了端倪：

```shell
# uname -r
7.0.11-arch1-1
# ls /lib/modules
7.0.10-arch1-1
```

于是，wind 让我试试在 archiso 里更新一下 Linux 内核（`linux` 和 `linux-headers` 包）。

进入 archiso 后，需要先挂载根和 boot 分区。老天，我竟然不知道该怎么挂载！我当初用的 archinstall，根本没手动挂载过！wind 直接给了我现成的命令：

```shell
mount /dev/nvme0n1p8 /mnt
mount /dev/nvme0n1p6 /mnt/boot
```

然后：

```shell
pacstrap -K /mnt linux linux-headers
```

重启……还是寄，相同的报错。诡异的是，内核版本还是原来的：

```shell
# uname -r
7.0.11-arch1-1
# ls /lib/modules
7.0.10-arch1-1
```

后来，wind 找出了真正的原因：在恢复的快照到现在的期间，内核版本从 7.0.10 更新到了 7.0.11。Timeshift 将 Btrfs 分区内的内核恢复到了 7.0.10，但 boot 分区内的内核并不在恢复的范围内，还是 7.0.11。内核版本不一致导致了无法挂载 `/boot`。这实际上是 Timeshift 的一个挺经典的问题。解决方法就是，把 Btrfs 里的内核更新一下，使内核版本一致即可（或者降级 boot 分区里的内核，不过我这里是要查字体问题，内核升级不碍事）。

但是，不是已经试过更新内核了吗？

或者更应该问的是，我真的更新了内核吗？为什么 `lib/modules` 里还是 7.0.10？

# 毫厘之差

我发现 [archlinux 简明指南](https://arch.icekylin.online/guide/advanced/system-ctl.html#%E6%81%A2%E5%A4%8D%E5%90%8E%E6%97%A0%E6%B3%95%E6%8C%82%E8%BD%BD%E7%9B%AE%E5%BD%95) 里有写到这个问题，且是相同的解决方案。但是我注意到，它挂载根的命令是：

```shell
mount -t btrfs -o subvol=/@,compress=zstd /dev/nvmexnxpx /mnt
```

它显式声明了 `btrfs` 和 `subvol=/@`。我去问了 AI 声明和不声明的区别，原来不显式声明的话，会挂载整个 Btrfs 分区的最顶层，里面有 `@`（真正的 Linux 根所在的地方）、`@home` 和 `timeshift-btrfs`。必须显式声明，才会把 `@` 挂载为根。而我在前者的情况下，往 `/mnt` 里“更新”（实际上是新安装）内核，实际上不过是缘木求鱼罢了。

wind 没用过 Btrfs，不知道要这样。而我用 Btrfs 的，竟然也啥都不知道，真是太可怕了。

用正确的方法重新挂载目录、更新内核后，终于成功启动了系统！

# 清理垃圾

在 Btrfs 顶层安装 Linux 内核导致出现了一套 Linux 文件，下面把它清理一下。

在 archiso 里用**错误**的方法挂载 Btrfs 顶层：

```shell
mount /dev/nvme0n1p8 /mnt
```

**不要挂载 boot 分区！**

## 检查

挂载后检查一下有没有在干蠢事：

```shell
ls /mnt
```

这时应该能看到一套 Linux 文件夹。重点是找一下 `@`、`@home` 和 `timeshift-btrfs`，如果有就说明正在顶层，而不是 Linux 根。

再检查一下，别给 boot 分区炸了：

```shell
ls /mnt/boot
```

确认里面空空如也。

## 删除

确保一切都没问题后，删除垃圾文件和文件夹：

```shell
cd /mnt
rm -rf bin boot dev etc home lib lib64 mnt opt proc root run sbin srv sys tmp usr var
```
