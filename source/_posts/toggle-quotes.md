---
title: 弯引号和直角引号的切换（以 Hexo Butterfly 为例）
date: 2025-11-16 16:00
category: 技术
tags: [前端]
description:
---

# 前言

在中文排版中，直角引号比弯引号更加美观（至少我是这么觉得的）。然而，在中国大陆，直角引号在横排中并不是规范标准，也没有广泛使用。即使是之前玩过一会《原神》的我，看到直角引号还是难免有点不习惯。我想在我的博客中使用直角引号，但直接一下子全换掉必定会影响大部分人的阅读体验。一个折中的方案是，提供一个开关，让用户根据自己的喜好自行选择使用什么引号。

以下的实现以我自己的博客（Hexo Butterfly）为例，你应该根据你自己情况做出适当调整。

# 基本实现

首先，我们需要一个变量来存储当前的引号状态。我找不到“直角引号”的英文名，这里，我将其译作“square quotes”：

```javascript
/**
 * 当前是否为直角引号模式
 * @type {boolean}
 */
let squareQuotes = false;
```

默认为 `false`，即使用弯引号，以符合大多数人的习惯。

然后，先实现切换一个元素内的引号的功能：

```javascript
const charPairs = [
  ['“', '「'],
  ['”', '」'],
  ['‘', '『'],
  ['’', '』'],
];

/**
 * 切换一个元素的引号
 * @param el {HTMLElement}
 */
function toggleQuotesInAnElement(el) {
  let text = el.innerHTML; // 使用 innerHTML 而不是 innerText，以避免破坏原有结构
  for (const pair of charPairs) {
    if (squareQuotes) {
      text = text.replaceAll(pair[0], pair[1]);
    } else {
      text = text.replaceAll(pair[1], pair[0]);
    }
  }
  el.innerHTML = text;
}
```

正如注释所讲的，应使用 `innerHTML` 而不是 `innerText`，否则可能会破坏该元素的原有结构（如里面的链接、脚注等）。

再然后，实现切换页面上所有合适元素内的引号的函数。在一开始，需要先反转 `squareQuotes` 的状态：

```javascript
/**
 * 切换整个页面所有合适元素内的引号
 */
function toggleQuotes() {
  squareQuotes = !squareQuotes;
  document
    .querySelectorAll(
      'div#site-subtitle, a.article-title, div.content, h1.post-title, ol.toc, article p, article li, ' +
        'article h1, article h2, article h3, article h4, article h5, article h6',
      // 标题的 id 不应被替换，故采用这种写法
      // 右侧导航（ol.toc）内锚点的特殊字符均被转义，故不需要考虑
    )
    .forEach(toggleQuotesInAnElement);
}
```

这里我的选择器是适配的 Hexo Butterfly，你可以参考以下列表去适配你自己的选择器：

- 主页：
  - `div#site-subtitle`：大副标题
  - `a.article-title`：文章标题
  - `div.content`：文章摘要
- 文章页面：
  - `h1.post-title`：文章大标题
  - `ol.toc`：右侧目录
  - `article p, article li`：文章内的正文
  - `article h1` - `article h6`：文章内的 1 到 6 级标题（这样写的考虑见上面注释）
  - 代码块里就算了

Butterfly 的右下角有一排功能按钮，我选择把开关加到那里：

```javascript
// 添加自定义右下角按钮
const btn = document.createElement('button');
btn.type = 'button';
btn.title = '“弯引号”和「直角引号」切换';
btn.innerHTML = '<i class="fas fa-quote-left"></i>';
btn.addEventListener('click', toggleQuotes);
document.getElementById('rightside-config-show').appendChild(btn);
```

这里，我不直接给 `div#rightside-config-show` 加 `innerHTML`，用 `onclick="toggleQuotes()"`，是考虑到下面的 [IIFE](#iife)。

# 用 `localStorage` 记住用户偏好

对于喜欢直角引号的用户，这样写有一个问题，那就是每次进一个页面都必须手动开一下，挺烦的。这里，我们使用 `localStorage` 记住用户偏好。

在一开始给 `squareQuotes` 赋值处，改为：

```javascript
let squareQuotes = localStorage.getItem('squareQuotes') === 'true';
```

由于 `localStorage` 只能存储字符串，所以这里我们选择存储字符串形式的 `'true'` 和 `'false'`。在一开始，用户浏览器里是没有这个值的，`getItem` 会返回 `null`，所以这里用 `=== 'true'` 判断，一举两得。

在 `toggleQuotes` 每次反转状态后，我们也要把反转后的状态存起来，即在 `squareQuotes = !squareQuotes;` 后添加：

```javascript
localStorage.setItem('squareQuotes', squareQuotes.toString());
```

在每次页面的一开始，我们需要立即应用用户的偏好：

```javascript
// 立即执行一次
squareQuotes = !squareQuotes; // 抵消反转状态
toggleQuotes();
```

# IIFE

把代码放在[立即调用函数表达式（IIFE）](https://developer.mozilla.org/zh-CN/docs/Glossary/IIFE)里是个好习惯：

```javascript
(function () {
  // ...
})();
```

~~不要像我一样，把全局变量弄得到处都是，最后一头撞在一起。~~

# 最终完整代码

```javascript
(function () {
  /**
   * 当前是否为直角引号模式
   * @type {boolean}
   */
  let squareQuotes = localStorage.getItem('squareQuotes') === 'true';

  const charPairs = [
    ['“', '「'],
    ['”', '」'],
    ['‘', '『'],
    ['’', '』'],
  ];

  /**
   * 切换一个元素的引号
   * @param el {HTMLElement}
   */
  function toggleQuotesInAnElement(el) {
    let text = el.innerHTML; // 使用 innerHTML 而不是 innerText，以避免破坏原有结构
    for (const pair of charPairs) {
      if (squareQuotes) {
        text = text.replaceAll(pair[0], pair[1]);
      } else {
        text = text.replaceAll(pair[1], pair[0]);
      }
    }
    el.innerHTML = text;
  }

  /**
   * 切换整个页面所有合适元素内的引号
   */
  function toggleQuotes() {
    squareQuotes = !squareQuotes;
    localStorage.setItem('squareQuotes', squareQuotes.toString());
    document
      .querySelectorAll(
        'div#site-subtitle, a.article-title, div.content, h1.post-title, ol.toc, article p, article li, ' +
          'article h1, article h2, article h3, article h4, article h5, article h6',
        // 标题的 id 不应被替换，故采用这种写法
        // 右侧导航（ol.toc）内锚点的特殊字符均被转义，故不需要考虑
      )
      .forEach(toggleQuotesInAnElement);
  }

  // 添加自定义右下角按钮
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.title = '“弯引号”和「直角引号」切换';
  btn.innerHTML = '<i class="fas fa-quote-left"></i>';
  btn.addEventListener('click', toggleQuotes);
  document.getElementById('rightside-config-show').appendChild(btn);

  // 立即执行一次
  squareQuotes = !squareQuotes; // 抵消反转状态
  toggleQuotes();
})();
```
