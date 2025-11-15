---
title: 遥遥领先！归一化矩阵伪逆——当前照片测星定位中精度最高的天顶确定算法（计算多条直线的同一交点）
date: 2025-08-02 11:45
category: 数学
tags: [线性代数]
description: 发明天才的可真是个矩阵伪逆。
---

> 特别声明：本文采用 [GNU Affero General Public License v3.0](https://www.gnu.org/licenses/agpl-3.0.en.html) 许可协议。

# 问题

关于什么是[照片测星定位](https://www.bilibili.com/video/BV1Dx4y117yM)，什么是天顶，~~我懒得写了~~ 这里就不赘述了。我们直接来看这个问题的数学和工程形式：

**现有平面上多条直线相交于同一点，已知每条直线上两点坐标（但是有误差），如何求出这个交点？**

# 归一化矩阵伪逆 (matrix_inverse_normalized)

## 简介

这一算法是我在 [WANG Lei](https://github.com/wlbksy) 的矩阵伪逆 (matrix_inverse) 的基础上改良而来，添加了[直线方程系数归一化](#直线方程系数归一化)的步骤，使本就名列前茅的精度更加遥遥领先！以下是一众算法的测试成绩：

### 无畸变

| 排名 | 方法                                                                                                                                                         | 平均误差 | 95%置信区间      |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- | ---------------- |
| 1    | [matrix_inverse_normalized](https://github.com/BengbuGuards/StarLocator/blob/main/prototype/core/positioning/top_point/methods/matrix_inverse_normalized.py) | 3.953    | (3.831, 4.076)   |
| 2    | [matrix_inverse](https://github.com/BengbuGuards/StarLocator/blob/main/prototype/core/positioning/top_point/methods/matrix_inverse.py)                       | 8.022    | (7.807, 8.237)   |
| 3    | [sphere](https://github.com/BengbuGuards/StarLocator/blob/main/prototype/core/positioning/top_point/methods/sphere.py)                                       | 8.025    | (7.810, 8.240)   |
| 4    | [median2](https://github.com/BengbuGuards/StarLocator/blob/main/prototype/core/positioning/top_point/methods/median2.py)                                     | 9.375    | (9.114, 9.635)   |
| 5    | [median](https://github.com/BengbuGuards/StarLocator/blob/main/prototype/core/positioning/top_point/methods/median.py)                                       | 9.548    | (9.283, 9.812)   |
| 6    | [least_square](https://github.com/BengbuGuards/StarLocator/blob/main/prototype/core/positioning/top_point/methods/least_square.py)                           | 11.964   | (11.057, 12.872) |

### 有畸变

| 排名 | 方法                                                                                                                                                         | 平均误差 | 95%置信区间      |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- | ---------------- |
| 1    | [matrix_inverse_normalized](https://github.com/BengbuGuards/StarLocator/blob/main/prototype/core/positioning/top_point/methods/matrix_inverse_normalized.py) | 10.628   | (10.226, 11.030) |
| 2    | [matrix_inverse](https://github.com/BengbuGuards/StarLocator/blob/main/prototype/core/positioning/top_point/methods/matrix_inverse.py)                       | 37.666   | (37.043, 38.289) |
| 3    | [sphere](https://github.com/BengbuGuards/StarLocator/blob/main/prototype/core/positioning/top_point/methods/sphere.py)                                       | 37.699   | (37.076, 38.323) |
| 4    | [median2](https://github.com/BengbuGuards/StarLocator/blob/main/prototype/core/positioning/top_point/methods/median2.py)                                     | 47.518   | (46.607, 48.430) |
| 5    | [median](https://github.com/BengbuGuards/StarLocator/blob/main/prototype/core/positioning/top_point/methods/median.py)                                       | 50.080   | (49.129, 51.031) |
| 6    | [least_square](https://github.com/BengbuGuards/StarLocator/blob/main/prototype/core/positioning/top_point/methods/least_square.py)                           | 62.304   | (61.098, 63.511) |

数据来源：[灭点计算误差测试框架](https://github.com/BengbuGuards/StarLocator/tree/main/prototype/core/positioning/top_point)

## 直线方程

记一条直线上已知的两点坐标为 $(x_1, y_1)$ 和 $(x_2, y_2)$，那么不难写出该直线的两点式方程：

$$
\frac{y - y_2}{y_1 - y_2} = \frac{x - x_2}{x_1 - x_2}
$$

为了后面把它放到矩阵里面算，需要给它化成 $ax + by = c$ 的形式：

$$
(y_2 - y_1)x + (x_1 - x_2)y = x_1 y_2 - x_2 y_1
$$

## 直线方程系数归一化

对上面得到的每个直线方程 $ax + by = c$，我们对它的系数进行归一化，得到：

$$
\frac{a}{a + b + c} x + \frac{b}{a + b + c} y = \frac{c}{a + b + c}
$$

归一化的目的是让每条直线对最终结果的影响的权重都是相同的，而不是方程系数越大的直线影响越大。

## 矩阵伪逆

记一共有 $n$ 条直线，其中第 $i$ 条直线的归一化后的方程为 $a_i x + b_i y = c_i$，则有超定方程组：

$$
\left\{
\begin{array}{c}
a_1 x + b_1 y = c_1 \\
a_2 x + b_2 y = c_2 \\
\vdots \\
a_n x + b_n y = c_n \\
\end{array}
\right.
$$

写成矩阵形式就是：

$$
\begin{bmatrix}
a_1 & b_1 \\
a_2 & b_2 \\
\vdots & \vdots \\
a_n & b_n
\end{bmatrix}
\begin{bmatrix}
x \\ y
\end{bmatrix}
=
\begin{bmatrix}
c_1 \\ c_2 \\ \vdots \\ c_n
\end{bmatrix}
$$

我们把它记为：

$$
\boldsymbol{Ax} = \boldsymbol{c}
$$

对于这个超定方程组，我们[通过构造正规方程求得最小二乘解](https://zhdbk3.github.io/2025/07/31/prove-normal-equation-is-least-square/)：

$$
\boldsymbol{A}^\mathrm{T} \boldsymbol{Ax} = \boldsymbol{A}^\mathrm{T} \boldsymbol{c}
$$

$$
\boldsymbol{x} = \left( \boldsymbol{A}^\mathrm{T} \boldsymbol{A} \right)^{-1} \boldsymbol{A}^\mathrm{T} \boldsymbol{c}
$$

这个 $\boldsymbol{x}$，就是我们想要的天顶（交点）坐标。

该算法推广到更高维也是一样可行的。

## 代码实现

https://github.com/BengbuGuards/StarLocator/blob/main/prototype/core/positioning/top_point/methods/matrix_inverse_normalized.py

```python
import numpy as np


def intersection(lines: np.ndarray) -> np.ndarray:
    """
    在 matrix_inverse 基础上改良：对直线方程的系数进行归一化
    Find the intersection point of given lines.
    params:
        lines: numpy array, each row contains two points. [((x1, y1), (x2, y2)), ...]
    return:
        intersection point (x, y)
    """
    V = lines[:, 1] - lines[:, 0]

    A = np.zeros_like(V)
    A[:, 0] = V[:, 1]
    A[:, 1] = -V[:, 0]

    lines_3d = np.dstack((lines, np.zeros((lines.shape[0], 2, 1))))
    C = np.cross(lines_3d[:, 0], lines_3d[:, 1])[:, 2]

    # 对直线方程的系数进行归一化
    for i in range(len(A)):
        a, b = A[i]
        c = C[i]
        m = a + b + c
        A[i] /= m
        C[i] /= m

    A_inv = np.linalg.pinv(A)

    point = A_inv @ C

    return point
```
