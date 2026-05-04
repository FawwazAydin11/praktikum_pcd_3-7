document.addEventListener('DOMContentLoaded', () => {
  const navLinks = Array.from(document.querySelectorAll('.topbar__nav a'));
  const sections = Array.from(document.querySelectorAll('section[id]'));

  const createPlaceholderImage = (label) => {
    const safeLabel = label || 'Siapkan gambar demo di folder assets/images';
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
        <rect width="800" height="600" fill="#eef3ff" />
        <rect x="40" y="40" width="720" height="520" rx="24" fill="#ffffff" stroke="#dbe5ff" stroke-width="4" />
        <text x="400" y="275" text-anchor="middle" font-size="28" font-family="Arial, sans-serif" fill="#1f45b6">Demo belum memakai gambar asli</text>
        <text x="400" y="320" text-anchor="middle" font-size="20" font-family="Arial, sans-serif" fill="#60708f">${safeLabel}</text>
      </svg>
    `;
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  };

  const updateActiveNav = () => {
    if (!navLinks.length || !sections.length) return;

    let currentId = sections[0]?.id || '';

    sections.forEach((section) => {
      const top = section.offsetTop - 140;
      const bottom = top + section.offsetHeight;

      if (window.scrollY >= top && window.scrollY < bottom) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      const isCurrent = link.getAttribute('href') === `#${currentId}`;
      link.classList.toggle('is-current', isCurrent);
    });
  };

  const setupImageDemo = ({
    buttonSelector,
    imageSelector,
    captionSelector,
    dataAttribute,
    states,
  }) => {
    const buttons = Array.from(document.querySelectorAll(buttonSelector));
    const image = document.querySelector(imageSelector);
    const caption = document.querySelector(captionSelector);

    if (!buttons.length || !image || !caption) return;

    const renderState = (key) => {
      const state = states[key];
      if (!state) return;

      buttons.forEach((button) => {
        button.classList.toggle('is-active', button.dataset[dataAttribute] === key);
      });

      image.src = state.src;
      image.alt = state.alt;
      image.dataset.fallbackLabel = state.fallbackLabel || 'Siapkan gambar demo di folder assets/images';
      caption.textContent = state.caption;
    };

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const key = button.dataset[dataAttribute];
        renderState(key);
      });
    });

    image.addEventListener('error', () => {
      image.src = createPlaceholderImage(image.dataset.fallbackLabel);
      caption.textContent = 'Gambar demo belum tersedia. Nanti tinggal ganti file gambar di folder assets/images sesuai nama yang dipakai.';
    });

    image.addEventListener('load', () => {
      if (caption.textContent.includes('Gambar demo belum tersedia')) {
        const activeButton = buttons.find((button) => button.classList.contains('is-active'));
        if (activeButton) {
          const key = activeButton.dataset[dataAttribute];
          if (states[key]) caption.textContent = states[key].caption;
        }
      }
    });

    const defaultButton = buttons.find((button) => button.classList.contains('is-active')) || buttons[0];
    const defaultKey = defaultButton?.dataset[dataAttribute];
    if (defaultKey) {
      renderState(defaultKey);
    }
  };

  const demoConfigs = [
    {
      buttonSelector: '[data-target-mode]',
      imageSelector: '#demo-color-image',
      captionSelector: '#demo-color-caption',
      dataAttribute: 'targetMode',
      states: {
        rgb: {
          src: 'assets/images/pcd-sample-rgb.jpg',
          alt: 'Contoh citra dalam mode RGB',
          caption: 'Mode RGB menampilkan warna gambar seperti yang biasa terlihat pada foto aslinya.',
          fallbackLabel: 'pcd-sample-rgb.jpg',
        },
        gray: {
          src: 'assets/images/pcd-sample-gray.jpg',
          alt: 'Contoh citra dalam mode grayscale',
          caption: 'Mode grayscale menghilangkan informasi warna dan hanya menyisakan terang serta gelap.',
          fallbackLabel: 'pcd-sample-gray.jpg',
        },
        hsv: {
          src: 'assets/images/pcd-sample-hsv.jpg',
          alt: 'Contoh citra dalam mode HSV',
          caption: 'Mode HSV membantu melihat warna dari sisi hue, saturation, dan value, jadi tampilannya terasa berbeda dari RGB.',
          fallbackLabel: 'pcd-sample-hsv.jpg',
        },
      },
    },
    {
      buttonSelector: '[data-transform]',
      imageSelector: '#demo-transform-image',
      captionSelector: '#demo-transform-caption',
      dataAttribute: 'transform',
      states: {
        original: {
          src: 'assets/images/transform-original.jpg',
          alt: 'Citra asli untuk demo transformasi',
          caption: 'Ini adalah gambar awal sebelum diubah ukuran, diputar, dibalik, atau digeser.',
          fallbackLabel: 'transform-original.jpg',
        },
        resize: {
          src: 'assets/images/transform-resize.jpg',
          alt: 'Hasil resize pada citra',
          caption: 'Resize mengubah ukuran gambar. Isi gambarnya tetap sama, tetapi tampilannya menjadi lebih kecil atau lebih besar.',
          fallbackLabel: 'transform-resize.jpg',
        },
        rotate: {
          src: 'assets/images/transform-rotate.jpg',
          alt: 'Hasil rotasi pada citra',
          caption: 'Rotate memutar gambar. Pada contoh ini gambar diputar 90 derajat sehingga orientasinya berubah jelas.',
          fallbackLabel: 'transform-rotate.jpg',
        },
        flip: {
          src: 'assets/images/transform-flip.jpg',
          alt: 'Hasil flip pada citra',
          caption: 'Flip membalik gambar. Kalau horizontal, sisi kiri dan kanan seakan bertukar tempat.',
          fallbackLabel: 'transform-flip.jpg',
        },
        translate: {
          src: 'assets/images/transform-translate.jpg',
          alt: 'Hasil translasi pada citra',
          caption: 'Translate menggeser posisi gambar ke arah tertentu tanpa mengubah bentuk objek utamanya.',
          fallbackLabel: 'transform-translate.jpg',
        },
      },
    },
    {
      buttonSelector: '[data-enhance]',
      imageSelector: '#demo-enhance-image',
      captionSelector: '#demo-enhance-caption',
      dataAttribute: 'enhance',
      states: {
        original: {
          src: 'assets/images/enhance-original.jpg',
          alt: 'Citra asli sebelum peningkatan domain spasial',
          caption: 'Ini adalah tampilan awal gambar sebelum proses peningkatan dilakukan.',
          fallbackLabel: 'enhance-original.jpg',
        },
        equalized: {
          src: 'assets/images/enhance-equalized.jpg',
          alt: 'Hasil histogram equalization pada citra',
          caption: 'Histogram equalization membantu membuat persebaran intensitas lebih merata, sehingga bagian gambar bisa terlihat lebih jelas.',
          fallbackLabel: 'enhance-equalized.jpg',
        },
        blur: {
          src: 'assets/images/enhance-blur.jpg',
          alt: 'Hasil Gaussian blur pada citra',
          caption: 'Gaussian blur membuat gambar terasa lebih halus karena detail-detail kecil dan gangguan tertentu ikut dilembutkan.',
          fallbackLabel: 'enhance-blur.jpg',
        },
        sharpen: {
          src: 'assets/images/enhance-sharpen.jpg',
          alt: 'Hasil sharpening pada citra',
          caption: 'Sharpening menonjolkan tepi dan detail supaya gambar terlihat lebih tegas.',
          fallbackLabel: 'enhance-sharpen.jpg',
        },
      },
    },
    {
      buttonSelector: '[data-restore]',
      imageSelector: '#demo-restoration-image',
      captionSelector: '#demo-restoration-caption',
      dataAttribute: 'restore',
      states: {
        original: {
          src: 'assets/images/restoration-original.jpg',
          alt: 'Citra asli sebelum restorasi',
          caption: 'Gambar asli dipakai sebagai patokan utama untuk melihat seberapa dekat hasil restorasi dengan kondisi awal.',
          fallbackLabel: 'restoration-original.jpg',
        },
        noisy: {
          src: 'assets/images/restoration-noisy.jpg',
          alt: 'Citra setelah ditambahkan salt and pepper noise',
          caption: 'Salt-and-pepper noise terlihat seperti bintik-bintik hitam dan putih yang mengganggu tampilan gambar.',
          fallbackLabel: 'restoration-noisy.jpg',
        },
        restored: {
          src: 'assets/images/restoration-restored.jpg',
          alt: 'Citra setelah diproses median filter',
          caption: 'Setelah median filter diterapkan, gangguan noise berkurang dan bentuk utama gambar bisa terlihat lebih bersih.',
          fallbackLabel: 'restoration-restored.jpg',
        },
      },
    },
    {
      buttonSelector: '[data-seg-threshold]',
      imageSelector: '#demo-seg-threshold-image',
      captionSelector: '#demo-seg-threshold-caption',
      dataAttribute: 'segThreshold',
      states: {
        original: {
          src: 'assets/images/seg-threshold-original.jpg',
          alt: 'Citra asli untuk demo thresholding',
          caption: 'Gambar awal dipakai sebagai pembanding sebelum thresholding dilakukan.',
          fallbackLabel: 'seg-threshold-original.jpg',
        },
        global: {
          src: 'assets/images/seg-threshold-global.jpg',
          alt: 'Hasil global thresholding',
          caption: 'Global thresholding memakai satu threshold untuk seluruh gambar. Cocok kalau perbedaan foreground dan background cukup jelas.',
          fallbackLabel: 'seg-threshold-global.jpg',
        },
        adaptive: {
          src: 'assets/images/seg-threshold-adaptive.jpg',
          alt: 'Hasil adaptive thresholding',
          caption: 'Adaptive thresholding menghitung threshold per area kecil, jadi lebih fleksibel untuk pencahayaan yang tidak merata.',
          fallbackLabel: 'seg-threshold-adaptive.jpg',
        },
        otsu: {
          src: 'assets/images/seg-threshold-otsu.jpg',
          alt: 'Hasil Otsu thresholding',
          caption: 'Otsu thresholding mencari threshold optimal secara otomatis untuk memisahkan foreground dan background.',
          fallbackLabel: 'seg-threshold-otsu.jpg',
        },
      },
    },
    {
      buttonSelector: '[data-seg-edge]',
      imageSelector: '#demo-seg-edge-image',
      captionSelector: '#demo-seg-edge-caption',
      dataAttribute: 'segEdge',
      states: {
        original: {
          src: 'assets/images/seg-edge-original.jpg',
          alt: 'Citra asli untuk demo segmentasi tepi',
          caption: 'Gambar awal dipakai sebagai pembanding sebelum deteksi tepi dilakukan.',
          fallbackLabel: 'seg-edge-original.jpg',
        },
        sobel: {
          src: 'assets/images/seg-edge-sobel.jpg',
          alt: 'Hasil Sobel edge detection',
          caption: 'Sobel menghitung gradien intensitas untuk menampilkan area perubahan yang cukup tajam pada gambar.',
          fallbackLabel: 'seg-edge-sobel.jpg',
        },
        canny: {
          src: 'assets/images/seg-edge-canny.jpg',
          alt: 'Hasil Canny edge detection',
          caption: 'Canny memakai beberapa tahap tambahan supaya hasil tepinya lebih rapi dan lebih selektif dibanding Sobel.',
          fallbackLabel: 'seg-edge-canny.jpg',
        },
      },
    },
  ];

  demoConfigs.forEach(setupImageDemo);

  updateActiveNav();
  window.addEventListener('scroll', updateActiveNav);
  window.addEventListener('resize', updateActiveNav);
});
