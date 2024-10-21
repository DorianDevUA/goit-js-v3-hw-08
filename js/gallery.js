import images from './images.js';
// console.log('Images:', images);

const refs = {
  gallery: document.querySelector('.gallery'),
};

let basicLightboxInstance = null;
let galleryImage = null;

refs.gallery.addEventListener('click', handleGalleryImageClick);

function handleGalleryImageClick(evt) {
  evt.preventDefault();
  const { target } = evt;

  if (!target.classList.contains('gallery-image')) {
    return;
  }

  if (!basicLightboxInstance) {
    const galleryImageMarkup = `<img class="js-galleryImage" src="" alt="" width="800" height="600">`;
    basicLightboxInstance = createBasicLightboxInstance(galleryImageMarkup, handleEscapePress);
    galleryImage = basicLightboxInstance.element().querySelector('.js-galleryImage');
  }

  galleryImage.src = target.dataset.source;
  galleryImage.alt = target.alt;

  basicLightboxInstance.show();
}

function handleEscapePress(evt) {
  console.log(evt.code);
  if (evt.code === 'Escape') {
    this.close();
  }
}

function createBasicLightboxInstance(markup, onEscape) {
  const option = {
    handler: null,
    onShow(instance) {
      this.handler = onEscape.bind(instance);
      document.addEventListener('keydown', this.handler);
    },
    onClose() {
      document.removeEventListener('keydown', this.handler);
    },
  };

  return basicLightbox.create(markup, option);
}

function initializeGallery(images) {
  refs.gallery.innerHTML = createGalleryMarkup(images);
}

function createGalleryMarkup(images) {
  return images
    .map(
      ({ preview, original, description }) => `
      <li class="gallery-item">
        <a class="gallery-link" href="${original}">
          <img
            class="gallery-image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>
    `
    )
    .join('');
}

initializeGallery(images);
