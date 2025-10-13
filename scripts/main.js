// Hero轮播
let slides = document.querySelectorAll('.slide');
let current = 0;
setInterval(() => {
  slides[current].classList.remove('active');
  current = (current + 1) % slides.length;
  slides[current].classList.add('active');
}, 5000);

// 动态渲染价格表
fetch('scripts/pricing.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('pricing-cards');
    container.innerHTML = '';
    data.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `<h3>${item.title}</h3><p>${item.desc}</p>`;
      container.appendChild(card);
    });
  });

// 中英文切换示例
const langBtn = document.getElementById('lang-switch');
langBtn.addEventListener('click', () => {
  if(langBtn.innerText === 'EN'){
    document.getElementById('hero-title').innerText = 'AI Lab Offline Learning Platform';
    document.getElementById('hero-desc').innerText = 'Fully offline, secure, ideal for campus AI labs';
    document.getElementById('features-title').innerText = 'Core Features';
    document.getElementById('edu-title').innerText = 'Education Use Cases';
    document.getElementById('pricing-title').innerText = 'Pricing Plans';
    document.getElementById('download-title').innerText = 'Download Client';
    langBtn.innerText = 'ZH';
  } else {
    document.getElementById('hero-title').innerText = 'AI Lab 离线教学平台';
    document.getElementById('hero-desc').innerText = '完全离线运行，安全可控，适合校园AI实验室';
    document.getElementById('features-title').innerText = '核心功能';
    document.getElementById('edu-title').innerText = '教育应用';
    document.getElementById('pricing-title').innerText = '价格方案';
    document.getElementById('download-title').innerText = '下载客户端';
    langBtn.innerText = 'EN';
  }
});
