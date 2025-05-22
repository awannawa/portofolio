// CONFIGURATION
const CONFIG = {
  apiEndpoint: 'https://script.google.com/macros/s/AKfycbyFC0qXNponeJxWGxzc5tyTa_Gdg3JPkXARzqHgxOPHJ1RblvXYq-Djj-z2UeNr4Ge9/exec',
  slickSettings: {
    desktop: {
      slidesToShow: 3,
      slidesToScroll: 1
    },
    tablet: {
      breakpoint: 768,
      settings: {
        slidesToShow: 2
      }
    },
    mobile: {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        centerMode: true,
        centerPadding: "20px"
      }
    }
  }
};

// COMPONENTS
const CertificateManager = {
  init() {
    this.cacheElements();
    this.initEventListeners();
    this.fetchData();
  },

  cacheElements() {
    this.$gallery = $('#certificateGallery');
    this.$loading = $('#loading');
  },

  initEventListeners() {
    $(document).ajaxStart(() => this.showLoading());
    $(document).ajaxStop(() => this.hideLoading());
  },

  async fetchData() {
    try {
      const response = await fetch(CONFIG.apiEndpoint);
      const data = await response.json();
      this.renderCertificates(data);
      this.initCarousel();
      this.initLightGallery();
    } catch (error) {
      this.handleError(error);
    }
  },

  renderCertificates(certificates) {
    const html = certificates.map(cert => `
      <a href="https://drive.google.com/file/d/${cert.iframeUrl}/preview" 
         class="cert-card" 
         data-iframe="true"
         data-lg-size="1280-720"
         data-sub-html="<h4>${cert.title}</h4><p>${cert.description}</p>">
        <img src="https://lh3.googleusercontent.com/d/${cert.thumbnail}=s512-rw" 
             alt="${cert.title}">
      </a>
          `).join('');

    this.$gallery.html(html);
  },

  initCarousel() {
    if (this.slickInstance) {
      this.$gallery.slick('unslick');
    }

    this.$gallery.slick({
      ...CONFIG.slickSettings.desktop,
      responsive: [
        CONFIG.slickSettings.tablet,
        CONFIG.slickSettings.mobile
      ]
    });
  },

  initLightGallery() {
    if (this.lightGalleryInstance) {
      this.lightGalleryInstance.destroy();
    }

    this.lightGalleryInstance = lightGallery(this.$gallery[0], {
      counter: false,
      selector: '.cert-card',
      plugins: [lgZoom],
      preload: 3,
      download: false,
      showCloseIcon: true,
      mobileSettings: {
        controls: true,
        showCloseIcon: true,
        download: false,
      }
    });
  },

  showLoading() {
    this.$loading.fadeIn();
  },

  hideLoading() {
    this.$loading.fadeOut();
  },

  handleError(error) {
    console.error('Error:', error);
    this.$gallery.html(`
            <div class="error-message">
              <h3>Error loading certificates</h3>
              <p>Please try again later or contact support</p>
            </div>
          `);
  }
};

// INITIALIZE
$(document).ready(() => CertificateManager.init());

// Prevent click event from firing when dragging
let isDragging = false;
$('.cert-slider').on('mousedown touchstart', function () {
  isDragging = false;
});
$('.cert-slider').on('mousemove touchmove', function () {
  isDragging = true;
});
$('.cert-slider').on('click', '.cert-card', function (e) {
  if (isDragging) {
    e.preventDefault();
    e.stopImmediatePropagation();
    return false;
  }
});
//END Prevent click event from firing when dragging
