(() => {
  const root = document.documentElement;
  const page = document.body.dataset.page;
  const buttons = document.querySelectorAll('[data-language]');
  const sections = document.querySelectorAll('.legal-section[data-language-section]');
  const titles = {
    support: {
      en: 'Plop Support — Plop Studio',
      tr: 'Plop Destek — Plop Studio',
    },
    privacy: {
      en: 'Plop Privacy Policy — Plop Studio',
      tr: 'Plop Gizlilik Politikası — Plop Studio',
    },
  };

  function localizedValue(element, prefix, language) {
    return element.dataset[`${prefix}${language === 'tr' ? 'Tr' : 'En'}`];
  }

  function applyLanguage(language, updateHash = false, remember = false) {
    const lang = language === 'tr' ? 'tr' : 'en';
    root.lang = lang;

    sections.forEach((section) => {
      section.hidden = section.dataset.languageSection !== lang;
    });
    document.querySelectorAll('[data-tr][data-en]').forEach((element) => {
      element.textContent = element.dataset[lang];
    });
    document.querySelectorAll('[data-href-tr][data-href-en]').forEach((element) => {
      element.href = localizedValue(element, 'href', lang);
    });
    document.querySelectorAll('[data-aria-tr][data-aria-en]').forEach((element) => {
      element.setAttribute('aria-label', localizedValue(element, 'aria', lang));
    });
    buttons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.language === lang));
    });

    document.title = titles[page][lang];
    if (updateHash) history.replaceState(null, '', `#${lang}`);
    if (remember) {
      try { localStorage.setItem('plop-language', lang); } catch (_) {}
    }
  }

  buttons.forEach((button) => {
    button.addEventListener('click', () => applyLanguage(button.dataset.language, true, true));
  });

  // Öncelik sırası: adresteki #tr/#en > kullanıcının daha önce seçtiği dil >
  // tarayıcı dili. Mağazadaki gizlilik adresi hash'siz olduğu için, üçüncü
  // basamak olmadan Türk kullanıcı İngilizce politikayı görüyordu.
  const known = (value) => (value === 'tr' || value === 'en' ? value : null);
  let storedLanguage = null;
  try { storedLanguage = localStorage.getItem('plop-language'); } catch (_) {}
  const browserLanguage =
    (navigator.language || '').toLowerCase().startsWith('tr') ? 'tr' : 'en';
  const initialLanguage =
    known(location.hash.slice(1).toLowerCase()) || known(storedLanguage) || browserLanguage;
  applyLanguage(initialLanguage);
})();
