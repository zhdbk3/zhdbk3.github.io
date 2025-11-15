---
title: SymPy 自定义某些数据类型的 LaTeX
date: 2025-07-14 22:40
updated: 2025-07-15 11:30
category: 技术
tags: [Python]
description: 给向量以矩阵，而不是给矩阵以向量。
---

# 需求

SymPy 可以很轻松地给出一个表达式的 LaTeX。然而在某些情况下，默认的 LaTeX 样式我们并不满意，例如在以下这种情境中：

向量一般借用矩阵表示，我在这里定义一个平面向量 $\boldsymbol a = (114, 514)$，并打印它的 LaTeX：

```python
from sympy import Matrix, latex

a = Matrix([114, 514])
print(latex(a))
```

得到结果 `\left[\begin{matrix}114\\514\end{matrix}\right]`：

$$
\left[\begin{matrix}114\\514\end{matrix}\right]
$$

我就一普普通通的~~小南梁~~小高中生，这玩意 tm 是个啥？

我想让它以高中生熟悉的样式 $(114, 514)$ 输出，而不是矩阵，这应该怎么实现呢？

当然，你可以自己定义一个函数，专门给出向量的 LaTeX，很多场景下这已经够用了。但能找到并点进这篇文章的人大概是无法满足于此的，因为向量可能会出现在各种复杂的表达式中，我们想要的是真正地让 SymPy 在每处都给它以向量的形式输出。

在网上搜不到相关的教程，问 AI 也是幻觉一堆，无奈只能自己探索了。

# “我”从哪里来？

首先，我们要大致看一下 SymPy 是怎么给出表达式的 LaTeX 的，转到 `sympy.latex` 的实现：

```python
@print_function(LatexPrinter)
def latex(expr, **settings):
   r"""Convert the given expression to LaTeX string representation...."""
   return LatexPrinter(settings).doprint(expr)
```

可以看到，这件事实际上是交给 `LatexPrinter` 完成的，而转到 `LatexPrinter` 的实现，可以看到有大量名为 `_print_Xxx`（其中 `Xxx` 为 Sympy 的各种数据类型和运算）这样的方法，这些方法内实现了各种数据类型自己的 LaTeX 表示。

我们要的矩阵，就是在 `_print_MatrixBase` 里实现的。

# 继承，覆写！

那么下面的思路就很明确了：

1. 继承 `LatexPrinter` 并覆写你需要的方法
2. 使用你的派生类定义一个新的 LaTeX 函数，依葫芦画瓢就行
3. 用新的 LaTeX 函数覆盖掉原有的 `sympy.latex`

以下是完整代码实现：

```python
from sympy.printing.latex import LatexPrinter, print_function
import sympy


class CustomLatexPrinter(LatexPrinter):
    def _print_MatrixBase(self, expr):
        if expr.shape[1] == 1:
            return fr"\left( {', '.join(map(self.doprint, expr))} \right)"
        else:
            return super()._print_MatrixBase(expr)


@print_function(CustomLatexPrinter)
def custom_latex(expr, **settings):
    return CustomLatexPrinter(settings).doprint(expr)


sympy.latex = custom_latex
```

注意：

- 如果你的程序不是单文件的，你需要在其他模块里使用 `sympy.latex` 的话，这里必须是 `import sympy` 然后 `sympy.latex = custom_latex`，而不是 `from sympy import latex` 然后 `latex = custom_latex`。因为后者实际上是在你自己的作用域内定义了一个 `latex` 标识符，原来指向 `sympy.latex`，后来把原来的扔掉了，指向了新的函数，而 `sympy.latex` 本身并没有被改变，在其他地方导入使用的话，`sympy.latex` 还是原来的函数。
- 如果在其他模块中，你使用 `from sympy import latex` 来导入的话，你必须让 `sympy.latex = custom_latex` 在其他模块导入之前就执行，不然覆盖也会不成功。原因同上。

最后，让我们看看效果：

```python
from sympy import Matrix, latex

a = Matrix([114, 514])
print(latex(a))
```

得到结果 `\left( 114, 514 \right)`：

$$
\left( 114, 514 \right)
$$

好诶，这下看懂了喵~
