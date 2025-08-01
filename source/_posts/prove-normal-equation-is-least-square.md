---
title: 证明：求解超定方程组时，通过构造正规方程得到的解就是最小二乘解
date: 2025-07-31 22:40
updated: 2025-8-1 9:55
category: 数学
tags: [ 线性代数 ]
description: 哎呀~ 几何法得了 MVP！
---

# 超定方程组

已知 $m \times n$ 的列满秩矩阵 $\boldsymbol{A}$（$m \ge n$），未知 $n$ 维列向量 $\boldsymbol{x}$，已知 $m$ 维列向量 $\boldsymbol{y}$，有：

$$
\boldsymbol{A} \boldsymbol{x} = \boldsymbol{y}
$$

当 $m > n$ 时，这是一个**超定方程组**（方程的数量大于未知数的数量，且这些方程之间经常存在一些小矛盾），通常不存在 $\boldsymbol{x}$ 的精确解。那么我们退一步，我们想要一个“很像解”的解。

# 正规方程

🤓👆诶，我们可以往等式两边的左边同乘一个 $\boldsymbol{A}^{\mathrm{T}}$（这一乘其实严格来说并不严谨，毕竟原来等号就很难成立，这里实际上我们构造了一个新的方程），得到：

$$
\boldsymbol{A}^{\mathrm{T}} \boldsymbol{A} \boldsymbol{x} = \boldsymbol{A}^{\mathrm{T}} \boldsymbol{y}
$$

这个方程就叫**正规方程**。

这式子漂不漂亮？这式子太漂亮了！$\boldsymbol{A}^{\mathrm{T}} \boldsymbol{A}$ 是 $n$ 阶方阵（可以求逆！），$\boldsymbol{x}$ 和 $\boldsymbol{A}^{\mathrm{T}} \boldsymbol{y}$ 都是 $n$ 维列向量，那一切就舒服♡多了：

$$
\boldsymbol{x} = \left( \boldsymbol{A}^{\mathrm{T}} \boldsymbol{A} \right)^{-1} \boldsymbol{A}^{\mathrm{T}} \boldsymbol{y}
$$

这样，我们就可以得到一个很不错（实际上是最不错，这就是今天要证明的）的 $\boldsymbol{x}$ 的解。其中，$\left( \boldsymbol{A}^{\mathrm{T}} \boldsymbol{A} \right)^{-1} \boldsymbol{A}^{\mathrm{T}}$ 称为 $\boldsymbol{A}$ 的**伪逆**。~~（就像伪娘一样）~~

# 残差、最小二乘解

很多时候，精确解对于超定方程组是个奢求，即 $\boldsymbol{A} \boldsymbol{x}$ 和 $\boldsymbol{y}$ 总是有一些偏差的。对于一个解，我们定义它的**残差**向量 $\boldsymbol{r}$：

$$
\boldsymbol{r} = \boldsymbol{y} - \boldsymbol{A} \boldsymbol{x}
$$

显然，残差的范数（模）$\lVert \boldsymbol{r} \rVert$ 越小，这个解 $\boldsymbol{x}$ 就越好。当 $\lVert \boldsymbol{r} \rVert$ 取到最小值时，$\boldsymbol{x}$ 就是我们最想要的**最小二乘解**（$\boldsymbol{A} \boldsymbol{x}$ 与 $\boldsymbol{y}$ 各位相差的平方和最小）。

# 证明：正规方程的解就是最小二乘解

因为我太菜了，~~导不出来~~ 基于矩阵求导的证明一个字也看不懂，所以这里换个角度，用几何法来证。哎呀~ 几何法得了 MVP！

寻找最小二乘解，从几何角度看，就是在 $\boldsymbol{A}$ 的列空间 $\operatorname{Col}(\boldsymbol{A})$（由 $\boldsymbol{A}$ 各个列向量张成的空间）中寻找与 $\boldsymbol{y}$ 最接近的向量（即 $\boldsymbol{y}$ 在 $\operatorname{Col}(\boldsymbol{A})$ 中的正交投影）。那么，正如平面外一点到平面，垂线段最短，想要 $\boldsymbol{y}$ 与 $\boldsymbol{A} \boldsymbol{x}$ 的残差 $\boldsymbol{r}$ 最短，那 $\boldsymbol{r}$ 就必须与 $\operatorname{Col}(\boldsymbol{A})$ 正交。

与 $\operatorname{Col}(\boldsymbol{A})$ 正交，就是和它的每个基向量都正交（内积等于 0）。记 $\boldsymbol{A} = \begin{bmatrix} \boldsymbol{c}_{1} & \boldsymbol{c}_{2} & \cdots & \boldsymbol{c}_{n} \end{bmatrix}$，那么：

$$
\left\{
\begin{array}{c}
\boldsymbol{c}\_{1}^{\mathrm{T}} \boldsymbol{r} = 0 \\
\boldsymbol{c}\_{2}^{\mathrm{T}} \boldsymbol{r} = 0 \\
\vdots \\
\boldsymbol{c}\_{n}^{\mathrm{T}} \boldsymbol{r} = 0
\end{array}
\right.
$$

合起来就是：

$$
\boldsymbol{A}^{\mathrm{T}} \boldsymbol{r} = \boldsymbol{0}
$$

将 $\boldsymbol{r} = \boldsymbol{y} - \boldsymbol{A} \boldsymbol{x}$ 代入：

$$
\boldsymbol{A}^{\mathrm{T}} ( \boldsymbol{y} - \boldsymbol{A} \boldsymbol{x} ) = \boldsymbol{0}
$$

整理一下：

$$
\boldsymbol{A}^{\mathrm{T}} \boldsymbol{A} \boldsymbol{x} = \boldsymbol{A}^{\mathrm{T}} \boldsymbol{y}
$$

这，恰是正规方程！

所以，求解超定方程组时，通过构造正规方程得到的解就是最小二乘解。

_Quod Erat Demonstrandum Miau~_
