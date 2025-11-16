(function () {
  const subtitleList = [
    {
      content: '我们终将在没有黑暗的地方相见。',
      source: '乔治·奥威尔《1984》',
    },
    {
      content:
        '不向焦虑与抑郁投降，这个世界终会有我们存在的地方。\n如果你能记住我的名字，如果你们都能记住我的名字，也许我或者“我们”，终有一天能自由地生存着。',
      source: '可橙',
    },
    {
      content: 'From the river to the sea, Palestine will be free!',
      source: null,
    },
    {
      content: '不羡桃李春风里，最爱雪花似梨花。',
      source: '沃茨基·谢德（',
    },
    {
      content: '每多一个晚上愿意多抬头仰望星空一会儿的年轻人，这个民族就离真正的星辰大海更近一步。',
      source: '鬼蝉',
    },
  ];

  // 抽取随机一句话
  const i = Math.floor(Math.random() * subtitleList.length);
  const subtitle = subtitleList[i];

  // 组织为 HTML
  let html = `<p>${subtitle.content}</p>`.replace('\n', '</p><p>');
  if (subtitle.source !== null) {
    html += `<p style="text-align: right; margin-right: 1em">——${subtitle.source}</p>`;
  }
  html = `<i>${html}</i>`;

  const siteSubtitleDiv = document.getElementById('site-subtitle');
  if (siteSubtitleDiv !== null) {
    siteSubtitleDiv.innerHTML = html;
  }
})();
