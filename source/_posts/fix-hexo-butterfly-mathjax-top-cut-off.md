---
title: 修复 Hexo Butterfly 中 MathJax 块级公式顶部被截断的问题
date: 2025-06-19 13:30
updated: 2025-8-1 10:50
category: 技术
tags: [ 前端 ]
description: 搞了好几天，原来就一句 CSS 的事 qwq
cover: /img/mathjax-top-cut-off.png
---

# 省流

~~换用 KaTeX。~~

在你的自定义 CSS 里加上：

```css
mjx-container {
    overflow: visible !important;
}
```

这样就好了喵~ 不看[注意事项](#注意事项)就跑，出了事我不负责喵~

## 注意事项

这样设置之后，公式太长时自动出滚动条的功能就寄了。你需要注意下公式长度，必要时手动折行。

如果你想知道为什么不得不这样做，请参阅[权衡与妥协](#权衡与妥协)。

---

以下为完整版。

# 问题

使用 Hexo Butterfly 搭建的博客，配置了 MathJax 来渲染数学公式。

然而，部分块级公式的大写字母的顶部被截断了，变成了这样：

![](/img/mathjax-top-cut-off.png)

而预期效果应该是这样的：

$$
V+F-E=2
$$

# 分析

这是一个很诡异的 bug：

1. 该现象仅在字体大小为 16 px 的情况下出现；
2. 另一个平台字体大小也为 16 px，但没有这个问题；
3. 不可复现性：即使是完全相同的公式，也会有时候被截断而有时候正常。

前前后后研究了几天，都没能解决<del>，差点以为计算机科学不存在了</del>。

最终，在 DeepSeek 的帮助下，我抓到了罪魁祸首：

在 Butterfly 的默认样式中，有以下配置：

```css
mjx-container {
    overflow-x: auto;
    overflow-y: hidden;
}
```

（如果你不了解 `overflow` 属性，建议搜索了解一下）

其中，部分符号的顶部超出了容器上边缘，于是在 `overflow-y: hidden` 下被截断了。

至于为什么会这样？这似乎是 MathJax 的一个 bug，容器高度计算有点问题，比实际需要的高度稍小一些，即使设置了 `height: auto` 也没用。其他平台上的容器高度也是有问题的，但由于没有设置 `overflow-y: hidden`，所以溢出的部分还是能正常看到的。

# 解决方法

~~换用 KaTeX。~~

把出问题的样式覆盖掉就行了，在自定义 CSS 里加上：

```css
mjx-container {
    overflow: visible !important;
}
```

# 权衡与妥协

可能有人会想，这样设置，把 `overflow-x: auto` 也一起覆盖掉了，那公式太长时横向滚动条不就没了吗？为什么不单独设置 `overflow-y: visible` 呢？

> 如果一个轴设置为 `visible` 而另一个轴设置为不同的值，`visible` 的行为会像 `auto` 一样。

而即使在 `overflow-x: auto` 的情况下，也会因为容器高度计算错误而表现得和 `overflow-x: hidden` 一样。

CSS 就是这样的，我也不知道为什么。

然而公式头上被砍掉一截，太丑陋了，不可接受，所以我选择放弃了横向滚动条。
