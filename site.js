(() => {
  const root = document.documentElement;
  const buttons = document.querySelectorAll('[data-language]');
  const title = document.querySelector('title');
  const description = document.querySelector('meta[name="description"]');

  const copy = {
    tr: {
      title: 'Plop Studio — Sakin dijital ürünler',
      description: 'Plop Studio, sakin ve düşünceli dijital ürünler geliştirir. İlk ürünümüz Plop, zamanı biriktiren çevrimdışı bir odak zamanlayıcısıdır.',
    },
    en: {
      title: 'Plop Studio — Calm digital products',
      description: 'Plop Studio creates calm, thoughtful digital products. Our first product, Plop, is an offline focus timer that makes time visible.',
    },
  };

  function applyLanguage(language, remember = true) {
    const lang = language === 'en' ? 'en' : 'tr';
    root.lang = lang;

    document.querySelectorAll('[data-tr][data-en]').forEach((element) => {
      element.textContent = element.dataset[lang];
    });
    document.querySelectorAll('[data-html-tr][data-html-en]').forEach((element) => {
      element.innerHTML = element.dataset[`html${lang === 'tr' ? 'Tr' : 'En'}`];
    });
    document.querySelectorAll('[data-href-tr][data-href-en]').forEach((element) => {
      element.href = element.dataset[`href${lang === 'tr' ? 'Tr' : 'En'}`];
    });
    document.querySelectorAll('[data-src-tr][data-src-en]').forEach((element) => {
      element.src = element.dataset[`src${lang === 'tr' ? 'Tr' : 'En'}`];
    });
    document.querySelectorAll('[data-alt-tr][data-alt-en]').forEach((element) => {
      element.alt = element.dataset[`alt${lang === 'tr' ? 'Tr' : 'En'}`];
    });
    document.querySelectorAll('[data-aria-tr][data-aria-en]').forEach((element) => {
      element.setAttribute('aria-label', element.dataset[`aria${lang === 'tr' ? 'Tr' : 'En'}`]);
    });
    buttons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.language === lang));
    });

    title.textContent = copy[lang].title;
    description.content = copy[lang].description;

    if (remember) {
      try { localStorage.setItem('plop-language', lang); } catch (_) {}
    }
  }

  buttons.forEach((button) => {
    button.addEventListener('click', () => applyLanguage(button.dataset.language));
  });

  let savedLanguage;
  try { savedLanguage = localStorage.getItem('plop-language'); } catch (_) {}
  const initialLanguage = savedLanguage || (navigator.language.toLowerCase().startsWith('tr') ? 'tr' : 'en');
  applyLanguage(initialLanguage, false);
})();
