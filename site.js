(() => {
  const root = document.documentElement;
  const buttons = document.querySelectorAll('[data-language]');
  const title = document.querySelector('title');
  const description = document.querySelector('meta[name="description"]');
  const product = document.querySelector('.product');
  const productEyebrow = document.querySelector('#product-eyebrow');
  const productTitle = document.querySelector('#plop-title');
  const productDescription = document.querySelector('#product-description');
  const productScreen = document.querySelector('#product-screen');
  const productCardLabel = document.querySelector('#product-card-label');
  const productCardCopy = document.querySelector('#product-card-copy');
  const productCalloutTitle = document.querySelector('#product-callout-title');
  const productCalloutCopy = document.querySelector('#product-callout-copy');
  const productDots = document.querySelectorAll('[data-product-slide]');
  const productCount = document.querySelector('.product-slide-count');
  const productFeatureTitles = [1, 2, 3].map((number) => document.querySelector(`#product-feature-title-${number}`));
  const productFeatureCopies = [1, 2, 3].map((number) => document.querySelector(`#product-feature-copy-${number}`));
  let activeProductSlide = 0;
  let productAnimationTimer;
  let touchStartX;

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

  const productSlides = {
    tr: [
      {
        eyebrow: 'Odak zamanlayıcısı',
        title: 'Emeğini bir kavanozda gör.',
        description: 'Her tamamlanan seans kavanozuna su ekler. Yarım kalan seanslar emeğini silmez; iz bırakır ve sana yeniden deneme alanı açar.',
        features: [
          ['Offline-first', 'Hesap ve internet bağlantısı gerekmez.'],
          ['Sapmasız zamanlayıcı', 'Ekran kilitlense de seansın doğru ilerler.'],
          ['Raf ve ritim', 'Günlerini, aylarını ve biriken odağını gör.'],
        ],
        calloutTitle: 'Odağını biriktirmeye başla.',
        calloutCopy: "Plop'u App Store'dan indir ve ilk kavanozunu doldur.",
        image: 'assets/plop-home.webp',
        alt: 'Plop ana ekranında yarısı dolu bir kavanoz ve başla düğmesi',
        cardLabel: 'Gizlilik',
        cardCopy: 'Verin cihazında kalır.',
      },
      {
        eyebrow: 'Kavanoz koleksiyonu',
        title: 'Her seans rafında yerini bulur.',
        description: 'Tamamladığın odaklar, ay ay büyüyen kişisel bir koleksiyona dönüşür. Her kavanoz kendi süresini ve hikâyesini taşır.',
        features: [
          ['Görünür birikim', 'Her odak seansı rafta kendine ait bir kavanoza dönüşür.'],
          ['Ay ay koleksiyon', 'Odağının zaman içindeki ritmini rafında görürsün.'],
          ['Altın onarım izleri', 'Yeniden tamamladığın seanslar dönüşünü görünür kılar.'],
        ],
        calloutTitle: 'Kendi rafını oluşturmaya başla.',
        calloutCopy: 'İlk seansın, koleksiyonunun ilk kavanozu olsun.',
        image: 'assets/plop-shelf-tr.webp',
        alt: "Plop'ta tamamlanan odak seanslarıyla dolu raf",
        cardLabel: 'Dolu raf',
        cardCopy: 'Odağın görünür bir koleksiyona dönüşür.',
      },
      {
        eyebrow: 'Tüm zamanlar',
        title: 'Bütün odağın tek kavanozda birikir.',
        description: 'Ömürlük kavanozun, bugüne kadar ayırdığın zamanı tek bakışta gösterir. Her damla uzun vadeli birikiminin parçasıdır.',
        features: [
          ['Toplam odak', 'Tüm seansların tek bir sakin görünümde birleşir.'],
          ['Altın izler', 'Geri dönüp tamamladığın anlar birikiminin parçası olur.'],
          ['Kendi ritmin', 'İlerlemeni kendi zamanın ve kendi temponla izlersin.'],
        ],
        calloutTitle: 'Biriken odağını görünür kıl.',
        calloutCopy: "Plop'u indir ve ömürlük kavanozuna ilk damlanı ekle.",
        image: 'assets/plop-lifetime-tr.webp',
        alt: 'Plop tüm zamanlar ekranındaki ömürlük kavanoz',
        cardLabel: 'Tüm zamanlar',
        cardCopy: 'Her damla uzun vadeli birikiminin parçası.',
      },
    ],
    en: [
      {
        eyebrow: 'Focus timer',
        title: 'See your effort in a jar.',
        description: 'Every completed session adds water to your jar. An unfinished session never erases your effort; it leaves a trace and gives you room to try again.',
        features: [
          ['Offline-first', 'No account or internet connection required.'],
          ['Drift-free timer', 'Your session stays accurate even when the screen is locked.'],
          ['Shelf and rhythm', 'See your days, months, and accumulated focus.'],
        ],
        calloutTitle: 'Start collecting your focus.',
        calloutCopy: 'Download Plop from the App Store and fill your first jar.',
        image: 'assets/plop-home-en.webp',
        alt: 'Plop home screen with a half-full jar and start button',
        cardLabel: 'Privacy',
        cardCopy: 'Your data stays on your device.',
      },
      {
        eyebrow: 'Jar collection',
        title: 'Every session finds its place.',
        description: 'Your completed focus sessions become a personal collection that grows month by month. Every jar carries its own time and story.',
        features: [
          ['Visible progress', 'Every focus session becomes a jar of its own on your shelf.'],
          ['Month by month', 'See the rhythm of your focus unfold across your shelf.'],
          ['Golden mends', 'Sessions you return to complete make your comeback visible.'],
        ],
        calloutTitle: 'Start building your shelf.',
        calloutCopy: 'Let your first session become the first jar in your collection.',
        image: 'assets/plop-shelf-en.webp',
        alt: 'A shelf filled with completed focus sessions in Plop',
        cardLabel: 'Full shelf',
        cardCopy: 'Your focus becomes a visible collection.',
      },
      {
        eyebrow: 'All time',
        title: 'All your focus collects in one jar.',
        description: 'Your lifetime jar brings together all the time you have set aside so far. Every drop becomes part of your long-term collection.',
        features: [
          ['Total focus', 'All your sessions come together in one calm view.'],
          ['Golden seams', 'The moments you return and complete become part of the whole.'],
          ['Your own rhythm', 'Follow your progress in your own time and at your own pace.'],
        ],
        calloutTitle: 'Make your collected focus visible.',
        calloutCopy: 'Download Plop and add the first drop to your lifetime jar.',
        image: 'assets/plop-lifetime-en.webp',
        alt: "The lifetime jar on Plop's All time screen",
        cardLabel: 'All time',
        cardCopy: 'Every drop is part of your long-term collection.',
      },
    ],
  };

  function renderProductSlide(language, animate = false, direction = 'forward') {
    if (!product) return;
    const slide = productSlides[language][activeProductSlide];
    productEyebrow.textContent = slide.eyebrow;
    productTitle.textContent = slide.title;
    productDescription.textContent = slide.description;
    slide.features.forEach(([featureTitle, featureCopy], index) => {
      productFeatureTitles[index].textContent = featureTitle;
      productFeatureCopies[index].textContent = featureCopy;
    });
    productCalloutTitle.textContent = slide.calloutTitle;
    productCalloutCopy.textContent = slide.calloutCopy;
    productScreen.src = slide.image;
    productScreen.alt = slide.alt;
    productCardLabel.textContent = slide.cardLabel;
    productCardCopy.textContent = slide.cardCopy;
    productCount.textContent = `${String(activeProductSlide + 1).padStart(2, '0')} / 03`;
    productDots.forEach((dot) => {
      dot.setAttribute('aria-pressed', String(Number(dot.dataset.productSlide) === activeProductSlide));
    });

    if (animate) {
      product.classList.remove('is-changing', 'slide-forward', 'slide-backward');
      void product.offsetWidth;
      product.classList.add('is-changing', direction === 'backward' ? 'slide-backward' : 'slide-forward');
      clearTimeout(productAnimationTimer);
      productAnimationTimer = window.setTimeout(() => {
        product.classList.remove('is-changing', 'slide-forward', 'slide-backward');
      }, 420);
    }
  }

  function showProductSlide(index) {
    const total = productSlides.tr.length;
    const direction = index < activeProductSlide ? 'backward' : 'forward';
    activeProductSlide = (index + total) % total;
    renderProductSlide(root.lang === 'en' ? 'en' : 'tr', true, direction);
  }

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
    renderProductSlide(lang);

    if (remember) {
      try { localStorage.setItem('plop-language', lang); } catch (_) {}
    }
  }

  buttons.forEach((button) => {
    button.addEventListener('click', () => applyLanguage(button.dataset.language));
  });

  productDots.forEach((dot) => {
    dot.addEventListener('click', () => showProductSlide(Number(dot.dataset.productSlide)));
  });
  document.querySelector('[data-product-prev]')?.addEventListener('click', () => showProductSlide(activeProductSlide - 1));
  document.querySelector('[data-product-next]')?.addEventListener('click', () => showProductSlide(activeProductSlide + 1));
  product?.addEventListener('touchstart', (event) => {
    touchStartX = event.changedTouches[0].clientX;
  }, { passive: true });
  product?.addEventListener('touchend', (event) => {
    if (touchStartX === undefined) return;
    const distance = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(distance) > 55) showProductSlide(activeProductSlide + (distance < 0 ? 1 : -1));
    touchStartX = undefined;
  }, { passive: true });

  let savedLanguage;
  try { savedLanguage = localStorage.getItem('plop-language'); } catch (_) {}
  const initialLanguage = savedLanguage || (navigator.language.toLowerCase().startsWith('tr') ? 'tr' : 'en');
  applyLanguage(initialLanguage, false);
})();
