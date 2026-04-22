document.addEventListener('DOMContentLoaded', () => {
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

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const key = button.dataset[dataAttribute];
        const selected = config[key];

        if (!selected) return;

        buttons.forEach((btn) => btn.classList.remove('is-active'));
        button.classList.add('is-active');

        image.src = selected.src;
        image.alt = selected.alt;
        caption.textContent = selected.caption;
      });
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
        caption: 'Mode RGB menampilkan warna citra seperti yang terlihat pada gambar asli.',
      },
      gray: {
        src: 'assets/images/pcd-sample-gray.jpg',
        alt: 'Contoh citra dalam mode grayscale',
        caption: 'Mode grayscale hanya menampilkan intensitas terang dan gelap tanpa informasi warna.',
      },
      hsv: {
        src: 'assets/images/pcd-sample-hsv.jpg',
        alt: 'Contoh citra dalam mode HSV',
        caption: 'Mode HSV memisahkan warna berdasarkan hue, saturation, dan value sehingga representasinya berbeda dari RGB.',
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
        caption: 'Gambar asli digunakan sebagai acuan sebelum transformasi diterapkan.',
      },
      resize: {
        src: 'assets/images/transform-resize.jpg',
        alt: 'Hasil resize pada citra',
        caption: 'Resize mengubah ukuran citra sehingga tampilan menjadi lebih kecil atau lebih besar dari ukuran awal.',
      },
      rotate: {
        src: 'assets/images/transform-rotate.jpg',
        alt: 'Hasil rotasi pada citra',
        caption: 'Rotate memutar orientasi citra. Pada praktikum, contoh yang digunakan adalah rotasi 90 derajat.',
      },
      flip: {
        src: 'assets/images/transform-flip.jpg',
        alt: 'Hasil flip pada citra',
        caption: 'Flip membalik citra. Pada contoh ini, pembalikan dilakukan secara horizontal.',
      },
      translate: {
        src: 'assets/images/transform-translate.jpg',
        alt: 'Hasil translasi pada citra',
        caption: 'Translate menggeser posisi citra ke arah tertentu tanpa mengubah isi utamanya.',
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
        caption: 'Tampilan awal citra sebelum proses peningkatan dilakukan.',
      },
      equalized: {
        src: 'assets/images/enhance-equalized.jpg',
        alt: 'Hasil histogram equalization pada citra',
        caption: 'Histogram equalization membantu menyebarkan intensitas piksel sehingga kontras citra menjadi lebih jelas.',
      },
      blur: {
        src: 'assets/images/enhance-blur.jpg',
        alt: 'Hasil Gaussian blur pada citra',
        caption: 'Gaussian blur menghaluskan citra dan mengurangi detail halus serta noise tertentu.',
      },
      sharpen: {
        src: 'assets/images/enhance-sharpen.jpg',
        alt: 'Hasil sharpening pada citra',
        caption: 'Sharpening menonjolkan tepi dan detail sehingga citra tampak lebih tajam.',
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
        caption: 'Citra asli menjadi acuan sebelum noise ditambahkan.',
      },
      noisy: {
        src: 'assets/images/restoration-noisy.jpg',
        alt: 'Citra setelah ditambahkan salt and pepper noise',
        caption: 'Salt-and-pepper noise menambahkan gangguan berupa titik-titik hitam dan putih pada citra.',
      },
      restored: {
        src: 'assets/images/restoration-restored.jpg',
        alt: 'Citra setelah diproses median filter',
        caption: 'Median filter membantu mengurangi salt-and-pepper noise sehingga citra hasil restorasi lebih mendekati citra asli.',
      },
    },
  });

  const navLinks = document.querySelectorAll('.sidebar__nav a');
  const sections = document.querySelectorAll('section[id]');

  const setActiveNav = () => {
    let currentId = '';

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('is-current');
      const href = link.getAttribute('href');

      if (href === `#${currentId}`) {
        link.classList.add('is-current');
      }
    });
  };

  setActiveNav();
  window.addEventListener('scroll', setActiveNav);
});