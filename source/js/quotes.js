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
    console.log(pair);
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
    .querySelectorAll('a.article-title, div.content, h1.post-title, article p, article li')
    .forEach(toggleQuotesInAnElement);
}

// 添加自定义右下角按钮
document.getElementById('rightside-config-show').innerHTML +=
  '<button type="button" title="“弯引号”和「直角引号」切换" onclick="toggleQuotes()">' +
  '<i class="fas fa-quote-left"></i>' +
  '</button>';

// 立即执行一次
squareQuotes = !squareQuotes; // 抵消反转状态
toggleQuotes();
