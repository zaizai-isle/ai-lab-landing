// Hero轮播
let slides = document.querySelectorAll('.slide');
let current = 0;
setInterval(() => {
  slides[current].classList.remove('active');
  current = (current + 1) % slides.length;
  slides[current].classList.add('active');
}, 5000);

// 动态渲染价格表（带降级处理）
(function renderPricing() {
  const container = document.getElementById('pricing-cards');
  if (!container) return;

  const fallbackData = [
    { title: '免费版', desc: '核心功能 + 1个模型' },
    { title: '教育版', desc: '年费 ¥9,800 / 校，支持多终端部署' },
    { title: '专业版', desc: '定制化，支持科研机构' }
  ];

  function renderCards(list) {
    container.innerHTML = '';
    list.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `<h3>${item.title}</h3><p>${item.desc}</p>`;
      container.appendChild(card);
    });
  }

  // file:// 环境下多数浏览器会阻止 fetch，本地直接使用 fallback
  if (window.location.protocol === 'file:') {
    renderCards(fallbackData);
    return;
  }

  fetch('scripts/pricing.json', { cache: 'no-store' })
    .then(res => {
      if (!res.ok) throw new Error('Failed to load pricing.json');
      return res.json();
    })
    .then(data => {
      if (!Array.isArray(data) || data.length === 0) {
        renderCards(fallbackData);
      } else {
        renderCards(data);
      }
    })
    .catch(() => {
      renderCards(fallbackData);
    });
})();

// 中英文切换（基于文档语言）
const langBtn = document.getElementById('lang-switch');
langBtn.addEventListener('click', () => {
  const htmlEl = document.documentElement;
  const isZH = (htmlEl.lang || 'zh-CN').toLowerCase().startsWith('zh');
  if (isZH) {
    htmlEl.lang = 'en';
    document.getElementById('hero-title').innerText = 'AI Lab Offline Learning Platform';
    document.getElementById('hero-desc').innerText = 'Fully offline, secure, ideal for campus AI labs';
    document.getElementById('features-title').innerText = 'Core Features';
    document.getElementById('edu-title').innerText = 'Education Use Cases';
    document.getElementById('pricing-title').innerText = 'Pricing Plans';
    document.getElementById('download-title').innerText = 'Download Client';
    langBtn.innerText = 'EN';
  } else {
    htmlEl.lang = 'zh-CN';
    document.getElementById('hero-title').innerText = 'AI Lab 离线教学平台';
    document.getElementById('hero-desc').innerText = '完全离线运行，安全可控，适合校园AI实验室';
    document.getElementById('features-title').innerText = '核心功能';
    document.getElementById('edu-title').innerText = '教育应用';
    document.getElementById('pricing-title').innerText = '价格方案';
    document.getElementById('download-title').innerText = '下载客户端';
    langBtn.innerText = '中';
  }
});

// Header glass on scroll
const headerEl = document.querySelector('header.header');
const toggleHeaderGlass = () => {
  if (!headerEl) return;
  if (window.scrollY > 10) {
    headerEl.classList.add('header-glass');
  } else {
    headerEl.classList.remove('header-glass');
  }
};
toggleHeaderGlass();
window.addEventListener('scroll', toggleHeaderGlass, { passive: true });
