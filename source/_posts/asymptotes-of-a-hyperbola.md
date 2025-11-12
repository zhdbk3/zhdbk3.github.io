---
title: 从反比例函数看双曲线的渐近线
date: 2025-10-24 13:00
category: 数学
tags: [ 线性代数 ]
description: 众里寻他千百度，蓦然回首，那人却在，灯火阑珊处。
---

最近学了双曲线的渐近线，以焦点在 $x$ 轴上的双曲线为例，对于双曲线：

$$
\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1 \quad (a, b > 0)
$$

其渐近线方程为：

$$
y = \pm \frac{b}{a} x
$$

这个结论莫名其妙地就抛给我了，但是为什么呢？

我记得初中的时候学过**反比例函数** $\displaystyle y = \frac{k}{x} ~ (k \ne 0)$。它的图像名字也叫双曲线，并且也有两条渐近线，即两条坐标轴。难道焦点在坐标轴上的双曲线和反比例函数图像之间存在某种关联？容易想到，这种关联很可能就是一次**线性变换**。如果反比例函数的图像经过某种线性变换后就能得到焦点在坐标轴上的双曲线的话，那不就能证明两坐标轴变换后得到的直线就是变换后双曲线的渐近线了吗？

还是以焦点在 $x$ 轴上的双曲线 $\displaystyle \frac{x^2}{a^2} - \frac{y^2}{b^2} = 1 ~ (a, b > 0)$ 为例，我们记它为 $C'$。曲线 $C$（期望是反比例函数图像）经过某种线性变换后得到 $C'$。

这里，我们做一个尝试，由于 $C'$ 的渐近线为 $\displaystyle y = \pm \frac{b}{a} x$，我们不妨将 $\displaystyle \binom{1}{0}$ 变换到 $\displaystyle \binom{a}{-b}$，将 $\displaystyle \binom{0}{1}$ 变换到 $\displaystyle \binom{a}{b}$，即该线性变换的矩阵 $\boldsymbol{A}$ 为：

$$
\boldsymbol{A} = \begin{bmatrix}
a & a \\
-b & b
\end{bmatrix}
$$

取曲线 $C$ 上任意一点 $P(x, y)$，即 $\displaystyle \overrightarrow{OP} = \binom{x}{y}$，记其变换后得到 $C'$ 上一点 $P'$，则有

$$
\overrightarrow{OP'}
= \boldsymbol{A} ~ \overrightarrow{OP}
= \begin{bmatrix}
a & a \\
-b & b
\end{bmatrix} \binom{x}{y}
= \binom{ax + ay}{-bx + by}
$$

将 $P'(ax + ay, -bx + by)$ 代入 $\displaystyle C': \frac{x^2}{a^2} - \frac{y^2}{b^2} = 1$ 得：

$$
\frac{(ax + ay)^2}{a^2} - \frac{(-bx + by)^2}{b^2} = 1
$$

诶嘿~ 正好能把分母约掉：

$$
(x + y)^2 - (x - y)^2 = 1
$$

$$
4xy = 1
$$

$$
C: y = \frac{1}{4x}
$$

结果非常 amazing 啊，$C$ 竟然就是反比例函数！

那么，原坐标轴上的 $\displaystyle \binom{1}{0}$ 和 $\displaystyle \binom{0}{1}$ 变换后得到的 $\displaystyle \binom{a}{-b}$ 和 $\displaystyle \binom{a}{b}$ 所在直线 $\displaystyle y = \pm \frac{b}{a} x$ 就是双曲线 $\displaystyle C': \frac{x^2}{a^2} - \frac{y^2}{b^2} = 1$ 的渐近线。
