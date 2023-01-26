import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const divGallery = document.querySelector('.gallery');

function toAddItems(items) {
  return items
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
       <a class="gallery__link" href="${original}">
         <img
           class="gallery__image"
           src="${preview}"
           data-source="${original}"
           alt="${description}"
         />
       </a>
     </div>`;
    })
    .join('');
}

const constToAddItems = toAddItems(galleryItems);
divGallery.innerHTML = constToAddItems;

divGallery.addEventListener('click', onclickOpenFullSize);

function onclickOpenFullSize(evt) {
  blockStandartAction(evt);
  if (evt.target.nodeName !== 'IMG') {
    return;
  }
  const instance = basicLightbox.create(`
    <img src="${evt.target.dataset.source}" width="800" height="600">
    <button>Нажми меня! <a href="${evt.target.dataset.source}"></a>
    </button>
`);

  instance.show();

  divGallery.addEventListener('keydown', evt => {
    if (evt.code === 'Escape') {
      instance.close();
    }
  });
}
function blockStandartAction(evt) {
  evt.preventDefault();
}
