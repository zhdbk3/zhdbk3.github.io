---
title: 拥抱 uv：不科学上网，完成 uv 的安装和 Python 与第三方库的换源
date: 2025-07-17 14:42:33
updated: 2025-10-4 16:30
category: 技术
tags: [ Python ]
description: 感觉和 pnpm 的逻辑好像，就连安装时遇到的困难也一样。
---

# 自定义 uv 与 Python 的安装路径

官方文档：

- https://docs.astral.sh/uv/reference/environment/#uv_install_dir
- https://docs.astral.sh/uv/reference/environment/#uv_python_install_dir

只要设置两个环境变量即可：

|          变量名          |     变量值     |
|:---------------------:|:-----------:|
|    UV_INSTALL_DIR     |   uv 安装路径   |
| UV_PYTHON_INSTALL_DIR | Python 安装路径 |

# 安装 uv

## Windows

官方文档：https://docs.astral.sh/uv/getting-started/installation/#standalone-installer

直接执行安装的命令，会从 GitHub 上下载二进制文件，那速度几乎为零。该命令的实质是从网上下载并执行一个安装脚本，安装脚本从 GitHub 下载二进制文件再安装。那么我们只要修改脚本里的下载地址就行了：

1. 下载 https://astral.sh/uv/install.ps1 到本地
2. 查找里面的 https://github.com，并**在前面加上（不是替换，原 GitHub 地址要保留！）** GitHub 加速站的地址（例如 https://github.akams.cn/ ）
3. 在 PowerShell 运行该脚本（如果有权限问题无法运行的话，按照提示修改权限即可）

## Arch Linux

```bash
sudo pacman -S uv
```

# 换源

官方文档：

- https://docs.astral.sh/uv/reference/environment/#uv_python_install_mirror
- https://docs.astral.sh/uv/reference/environment/#uv_default_index

设置两个环境变量（一个是 Python 的，一个是第三方库的）就行，这里给出我的设置：

|           变量名            |                                              变量值                                               |
|:------------------------:|:----------------------------------------------------------------------------------------------:|
| UV_PYTHON_INSTALL_MIRROR | https://github.akams.cn/https://github.com/astral-sh/python-build-standalone/releases/download |
|     UV_DEFAULT_INDEX     |                            https://pypi.tuna.tsinghua.edu.cn/simple                            |

这里，我使用的是 https://github.akams.cn/ GitHub 加速站和清华的 PyPI 源，你可以按照个人喜好填写其他的。

好诶~ 这样就可以愉快地使用 uv 啦~ 拥抱 uv！~~拥抱 Rust！~~

（感觉和 pnpm 的逻辑好像，就连安装时遇到的困难也一样）
