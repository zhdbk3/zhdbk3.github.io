const urls = [
  '/img/bg/mahiro_1.avif',
  '/img/bg/mahiro_2.avif',
  '/img/bg/mahiro_3.avif',
  '/img/bg/nachoneko_1.avif',
];

// 随机抽取一个 URL
const i = Math.floor(Math.random() * urls.length);
const url = urls[i];

addEventListener('DOMContentLoaded', () => {
  document.getElementById('web_bg').style.backgroundImage = `url(${url})`;
});
