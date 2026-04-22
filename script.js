document.addEventListener('DOMContentLoaded', () => {
  const topbarLinks = document.querySelectorAll('.topbar__nav a');
  const sections = document.querySelectorAll('section[id]');

  const placeholderImage = (label) => {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
        <rect width="800" height="600" fill="#eef3ff" />
        <rect x="40" y="40" width="720" height="520" rx="24" fill="#ffffff" stroke="#dbe5ff" stroke-width="4" />
        <text x="400" y="275" text-anchor="middle" font-size="28" font-family="Arial, sans-serif" fill="#1f45b6">Demo belum memakai gambar asli</text>
        <text x="400" y="320" text-anchor="middle" font-size="20" font-family="Arial, sans-serif" fill="#60708f">${label}</text>
      </svg>
    `;
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  };

  const setActiveNav = () => {
    let currentId = '';

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 130;
      const sectionHeight = section.offsetHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    topbarLinks.forEach((link) => {
      link.classList.remove('is-current');
      const href = link.getAttribute('href');

      if (href === `#${currentId}`) {
        link.classList.add('is-current');
      }
    });
  };

  const setupSingleImageDemo = ({
    buttonSelector,
    imageSelector,
    captionSelector,
    dataAttribute,
    config,
  }) => {
    const buttons = document.querySelectorAll(buttonSelector);
    const image = document.querySelector(imageSelector);
    const caption = document.querySelector(captionSelector);

    if (!buttons.length || !image || !caption) return;

    const setDemoState = (key) => {
      const selected = config[key];
      if (!selected) return;

      buttons.forEach((btn) => {
        btn.classList.toggle('is-active', btn.dataset[dataAttribute] === key);
      });

      image.src = selected.src;
      image.alt = selected.alt;
      caption.textContent = selected.caption;
      image.dataset.fallbackLabel = selected.fallbackLabel || 'Siapkan gambar demo di folder assets/images';
    };

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const key = button.dataset[dataAttribute];
        setDemoState(key);
      });
    });

    const defaultButton = document.querySelector(`${buttonSelector}.is-active`) || buttons[0];
    if (defaultButton) {
      setDemoState(defaultButton.dataset[dataAttribute]);
    }

    image.addEventListener('error', () => {
      image.src = placeholderImage(image.dataset.fallbackLabel || 'Siapkan gambar demo di folder assets/images');
      caption.textContent = 'Gambar demo belum tersedia. Nanti tinggal ganti file gambar di folder assets/images sesuai nama yang dipakai.';
    });
  };

  setupSingleImageDemo({
    buttonSelector: '[data-target-mode]',
    imageSelector: '#demo-color-image',
    captionSelector: '#demo-color-caption',
    dataAttribute: 'targetMode',
    config: {
      rgb: {
        src: 'assets/images/pcd-sample-rgb.jpg',
        alt: 'Contoh citra dalam mode RGB',
        caption: 'Mode RGB menampilkan warna gambar seperti yang biasa terlihat pada foto aslinya.',
        fallbackLabel: 'pcd-sample-rgb.jpg',
      },
      gray: {
        src: 'assets/images/pcd-sample-gray.jpg',
        alt: 'Contoh citra dalam mode grayscale',
        caption: 'Mode grayscale menghilangkan warna dan menyisakan tingkat terang serta gelap.',
        fallbackLabel: 'pcd-sample-gray.jpg',
      },
      hsv: {
        src: 'assets/images/pcd-sample-hsv.jpg',
        alt: 'Contoh citra dalam mode HSV',
        caption: 'Mode HSV melihat warna dari sisi hue, saturation, dan value, jadi tampilannya terasa beda dari RGB.',
        fallbackLabel: 'pcd-sample-hsv.jpg',
      },
    },
  });

  setupSingleImageDemo({
    buttonSelector: '[data-transform]',
    imageSelector: '#demo-transform-image',
    captionSelector: '#demo-transform-caption',
    dataAttribute: 'transform',
    config: {
      original: {
        src: 'assets/images/transform-original.jpg',
        alt: 'Citra asli untuk demo transformasi',
        caption: 'Ini adalah gambar awal sebelum diubah ukuran, diputar, dibalik, atau digeser.',
        fallbackLabel: 'transform-original.jpg',
      },
      resize: {
        src: 'assets/images/transform-resize.jpg',
        alt: 'Hasil resize pada citra',
        caption: 'Resize mengubah ukuran gambar. Isi gambarnya tetap sama, cuma tampilannya jadi lebih kecil atau lebih besar.',
        fallbackLabel: 'transform-resize.jpg',
      },
      rotate: {
        src: 'assets/images/transform-rotate.jpg',
        alt: 'Hasil rotasi pada citra',
        caption: 'Rotate memutar gambar. Contoh yang dipakai di sini adalah rotasi 90 derajat.',
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
  });

  setupSingleImageDemo({
    buttonSelector: '[data-enhance]',
    imageSelector: '#demo-enhance-image',
    captionSelector: '#demo-enhance-caption',
    dataAttribute: 'enhance',
    config: {
      original: {
        src: 'assets/images/enhance-original.jpg',
        alt: 'Citra asli sebelum peningkatan domain spasial',
        caption: 'Ini adalah tampilan awal gambar sebelum proses peningkatan dilakukan.',
        fallbackLabel: 'enhance-original.jpg',
      },
      equalized: {
        src: 'assets/images/enhance-equalized.jpg',
        alt: 'Hasil histogram equalization pada citra',
        caption: 'Histogram equalization membantu bikin kontras gambar terasa lebih jelas.',
        fallbackLabel: 'enhance-equalized.jpg',
      },
      blur: {
        src: 'assets/images/enhance-blur.jpg',
        alt: 'Hasil Gaussian blur pada citra',
        caption: 'Gaussian blur bikin gambar terasa lebih halus karena detail-detail kecil ikut dilembutkan.',
        fallbackLabel: 'enhance-blur.jpg',
      },
      sharpen: {
        src: 'assets/images/enhance-sharpen.jpg',
        alt: 'Hasil sharpening pada citra',
        caption: 'Sharpening bikin tepi dan detail gambar terasa lebih tegas.',
        fallbackLabel: 'enhance-sharpen.jpg',
      },
    },
  });

  setupSingleImageDemo({
    buttonSelector: '[data-restore]',
    imageSelector: '#demo-restoration-image',
    captionSelector: '#demo-restoration-caption',
    dataAttribute: 'restore',
    config: {
      original: {
        src: 'assets/images/restoration-original.jpg',
        alt: 'Citra asli sebelum restorasi',
        caption: 'Gambar asli dipakai sebagai acuan utama buat melihat hasil perbaikannya nanti.',
        fallbackLabel: 'restoration-original.jpg',
      },
      noisy: {
        src: 'assets/images/restoration-noisy.jpg',
        alt: 'Citra setelah ditambahkan salt and pepper noise',
        caption: 'Salt-and-pepper noise terlihat seperti bintik-bintik hitam putih yang mengganggu gambar.',
        fallbackLabel: 'restoration-noisy.jpg',
      },
      restored: {
        src: 'assets/images/restoration-restored.jpg',
        alt: 'Citra setelah diproses median filter',
        caption: 'Setelah median filter dipakai, gangguan noise berkurang dan bentuk utama gambar jadi lebih jelas.',
        fallbackLabel: 'restoration-restored.jpg',
      },
    },
  });

  setActiveNav();
  window.addEventListener('scroll', setActiveNav);
  window.addEventListener('resize', setActiveNav);
});
