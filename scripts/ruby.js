/**
 * 上、下方注音功能
 * @see 修改自 {@link https://blog.qzink.me/posts/Hexo%E5%8D%9A%E5%AE%A2%E6%B7%BB%E5%8A%A0%E6%B3%A8%E9%9F%B3%E5%8A%9F%E8%83%BD/|Qzink《Hexo 博客添加注音功能》}
 * @license CC BY-NC-SA 4.0
 */

'use strict';

hexo.extend.filter.register('before_post_render', function (data) {
  if (!data.content) return data;

  // 仅在 front-matter 中设置了 ruby: true 时才处理
  if (data.ruby !== true) {
    return data;
  }

  // 将内容分割为代码块和非代码块部分
  const contentParts = [];
  const codeBlockRegex = /```[\s\S]*?```|`[\s\S]*?`/g;
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(data.content)) !== null) {
    // 添加代码块前的文本
    if (match.index > lastIndex) {
      contentParts.push({
        type: 'text',
        content: data.content.substring(lastIndex, match.index),
      });
    }

    // 添加代码块
    contentParts.push({
      type: 'code',
      content: match[0],
    });

    lastIndex = match.index + match[0].length;
  }

  // 添加最后一个代码块后的文本
  if (lastIndex < data.content.length) {
    contentParts.push({
      type: 'text',
      content: data.content.substring(lastIndex),
    });
  }

  // 注音 {漢|かん(下方标注)}
  // 上方和下方标注可能存在其中一个，也可能同时存在
  const pattern = // 只有鬼看得懂的神秘正则表达式
    /\{(?<base>[^|(]*?)\s*(?:\|\s*(?<over>[^({]*?)\s*)?(?:\(\s*(?<under>[^)]*?)\s*\))?\}/g;

  // 只处理非代码块部分
  const processedParts = contentParts.map((part) => {
    if (part.type === 'code') {
      return part.content;
    } else {
      return part.content.replace(pattern, (match, base, over, under) => {
        if (over && under) {
          return `<ruby><ruby class="under">${base}<rt>${under}</rt></ruby><rt>${over}</rt></ruby>`;
        } else if (over) {
          return `<ruby>${base}<rt>${over}</rt></ruby>`;
        } else if (under) {
          return `<ruby class="under">${base}<rt>${under}</rt></ruby>`;
        }
      });
    }
  });

  // 重新组合内容
  data.content = processedParts.join('');
  return data;
});
