---
title: 对数感知下，我究竟荒废了多少青春？
date: 2025-07-13 15:26
updated: 2025-10-4 16:30
category: 数学
tags: [ 函数, 自我 ]
description: “最是人间留不住，朱颜辞镜花辞树。”
---

> ⚠️本文可能引起不适。

# 问题

假设有一个小男娘[^补]，她在 $t_1$ 岁时开始进入青春期，有了自己的性别意识。但由于家庭等种种缘故，直到 $t_2$ 岁时她才得以第一次穿上小裙子。随着身体的衰老，到了 $t_3$ 岁时她不得不结束了自己花枝招展的青春。

仅从性别角度考虑，在她 $t_1 \sim t_3$ 岁的青春中，$t_1 \sim t_2$ 岁的部分是被荒废的。不妨令 $t_1 = 14, \ t_2 = 18, \ t_3 = 35$，那么对她来说，整个青春有多大的占比是被荒废了的呢？

# 一个简单的答案

这么简单的问题小学生都会算！时间的流逝是线性的，今天的一秒和昨天的一秒没有什么不同。在线性的时间中，我们记青春荒废率为 $\lambda_线 \in (0, 1)$[^1]，则显然有：

$$
\lambda_线 = \frac{t_2 - t_1}{t_3 - t_1}
$$

将数据代入得：

$$
\lambda_线 = \frac{4}{21} \approx 19.05 \%
$$

如此看来，她的青春荒废了大约 $\frac{1}{5}$……吗？

# 世界是对数的

- [【毕导】这个定律，预言了你的人生进度条](https://www.bilibili.com/video/BV1VrVSz1Eme)
- [【漫士】世界是对数的……吗？为什么？](https://www.bilibili.com/video/BV15kj4z4Eju)

> 按照这个规律（~~我们小学二年级就学过的~~韦伯-费希纳定律），假设你活到 80 岁，那你生命的中点当然是 40 岁。但假设你 4 岁开始有记忆，在你的对数感觉里，生命的中点，其实是 18 岁。80 岁回首往事，你会觉得，过了 18，人生的一半已经结束了。多么令人感伤啊！

在看了这两个视频之后，我对这个问题有了一些不一样的理解。

首先，不妨令她从 $t_\mathrm{min}$ 岁时开始有记忆，到 $t_\mathrm{max}$ 岁时死亡，那么根据韦伯-费希纳定律，记她的年龄为 $t \in (t_\mathrm{min}, t_\mathrm{max})$，对数感知下人生的进度为 $f(t) \in (0, 1)$，则有：

$$
f(t) = \frac{\log t - \log t_\mathrm{min}}{\log t_\mathrm{max} - \log t_\mathrm{min}}
$$

（这里底数不重要，后面换底公式化简一下就没了）

这一大串对数看着就头大，让我们给它化简一下：

$$
\begin{aligned}
f(t) & = \frac{\log t - \log t_\mathrm{min}}{\log t_\mathrm{max} - \log t_\mathrm{min}} \\
& = \frac{\log \left( \frac{t}{t_\mathrm{min}} \right)}{\log \left( \frac{t_\mathrm{max}}{t_\mathrm{min}} \right)} \\
& = \log_{\left( \frac{t_\mathrm{max}}{t_\mathrm{min}} \right)} \left( \frac{t}{t_\mathrm{min}} \right)
\end{aligned}
$$

嗯，这样就舒服多了。

记对数感知下，青春的荒废率为 $\lambda_对 \in (0, 1)$，则有：

$$
\lambda_对 = \frac{f(t_2) - f(t_1)}{f(t_3) - f(t_1)}
$$

代入展开并化简：

$$
\begin{aligned}
\lambda_对 & = \frac{f(t_2) - f(t_1)}{f(t_3) - f(t_1)} \\
& = \frac{\log_{\left( \frac{t_\mathrm{max}}{t_\mathrm{min}} \right)} \left( \frac{t_2}{t_\mathrm{min}} \right) - \log_{\left( \frac{t_\mathrm{max}}{t_\mathrm{min}} \right)} \left( \frac{t_1}{t_\mathrm{min}} \right)}{\log_{\left( \frac{t_\mathrm{max}}{t_\mathrm{min}} \right)} \left( \frac{t_3}{t_\mathrm{min}} \right) - \log_{\left( \frac{t_\mathrm{max}}{t_\mathrm{min}} \right)} \left( \frac{t_1}{t_\mathrm{min}} \right)} \\
& = \frac{\log_{\left( \frac{t_\mathrm{max}}{t_\mathrm{min}} \right)} \left( \frac{t_2}{t_1} \right)}{\log_{\left( \frac{t_\mathrm{max}}{t_\mathrm{min}} \right)} \left( \frac{t_3}{t_1} \right)} \\
& = \log_{\left( \frac{t_3}{t_1} \right)} \left( \frac{t_2}{t_1} \right)
\end{aligned}
$$

这式子漂不漂亮？这式子太漂亮了！$t_\mathrm{min}$ 和 $t_\mathrm{max}$ 竟然都没了耶！~~也就是说过了那个年龄我什么时候死其实已经不重要了喵！~~

现在让我们带入数据：

$$
\lambda_对 = \log_{\left( \frac{35}{14} \right)} \left( \frac{9}{7} \right) \approx 27.43 \%
$$

于是我们就得到了一个更符合人的感受的答案。这个值约为线性时间下的 1.44 倍。

# 一些乱七八糟的东西

语文老师向我们提过一个哲学问题：如果你能知道自己的死期，你愿意知道吗？我们应该今朝有酒今朝醉，过一天算一天，还是像史铁生一样，向死而生呢？我一开始也就听个热闹，认为这不过是一个属于“想了也没有用”系列的问题，毕竟一般来说，我怎么可能能知道自己的死期呢？

然而仔细一想又觉得不太对，对我们这个特殊群体来说，确乎是有一件比死亡更可怕的事情的——衰老。对我个人来说，我的“人生”还没开始，尽管很多人已经开始了。朋友劝我说还没开始就不要想着结束之后的事情了，当个鸵鸟倒也好，但我总觉得这样骗得了谁都骗不了我自己，该面对的事情总归得面对，不是我现在去逃避就能改变的。

我后面二十年到底该怎么活，才能不枉此生？不知道。我现在能做的只有从理性的角度分析，计算一下，心里大概有个数，可能会有一些帮助吧。然而人终究是感性的，少年的一秒和中年的一秒不一样，绝不只是韦伯-费希纳定律带来的，正如那句词所说的：

> 欲买桂花同载酒，终不似，少年游。

[^1]: 对于“无效部分的占比”，数学和物理界并没有一个公认的字母符号。有比率的意思的符号有很多，我这里选用 $\lambda$ 最主要是因为它长得像个扫帚。
[^补]: 这是一个平行宇宙，作者被巨大的困难吓倒，放弃了跨性别路线。
