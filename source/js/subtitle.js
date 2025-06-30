import subtitleList from './subtitleList.json' with {type: 'json'};

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
