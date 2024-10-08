import images from './images.js';
// console.log('Images:', images);

const refs = {
  gallery: document.querySelector('.gallery'),
};

let instance = null;
let lightboxImg = null;

refs.gallery.addEventListener('click', onGalleryImageClick);

function onGalleryImageClick(evt) {
  evt.preventDefault();
  const { target } = evt;

  if (!target.classList.contains('gallery-image')) {
    return;
  }

  const imageSource = target.dataset.source;
  const imageDescription = target.alt;

  updateLightboxImage(imageSource, imageDescription);
  instance.show();
}

function onPressEscapeBtn(evt) {
  const isLightboxVisible = instance.visible();
  if (evt.code === 'Escape' && isLightboxVisible) {
    instance.close();
  }
}

function initializeLightbox() {
  const basicLightboxMarkup = '<img src="" alt="" width="800" height="600">';
  const option = {
    onShow: () => document.addEventListener('keydown', onPressEscapeBtn),
    onClose: () => document.removeEventListener('keydown', onPressEscapeBtn),
  };

  instance = basicLightbox.create(basicLightboxMarkup, option);
  lightboxImg = instance.element().querySelector('img');
}

function updateLightboxImage(source, description) {
  lightboxImg.src = source;
  lightboxImg.alt = description;
}

function initializeGallery() {
  const galleryMarkup = createGalleryMarkup(images);

  refs.gallery.innerHTML = galleryMarkup;
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

initializeLightbox();
initializeGallery();
