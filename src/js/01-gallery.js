import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

const imagesContainer = document.querySelector(".gallery");
const imagesMarkup = createGalleryFromSimpleLightbox(galleryItems);
imagesContainer.insertAdjacentHTML("beforeend", imagesMarkup);

function createGalleryFromSimpleLightbox(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<li>
      <a class="gallery__item" 
      href="${original}">
      <img class="gallery__image" 
      src="${preview}" 
      alt="${description}" />
    </a>
    </li>`;
    })
    .join("");
}

console.log(galleryItems);

imagesContainer.addEventListener("click", (eve) => {
  eve.preventDefault();

  // якщо не картинка - виходимо

  if (eve.target.nodeName !== "IMG") {
    return;
  }

  new SimpleLightbox(".gallery a", {
    captions: true,
    captionsData: "alt",
    captionDelay: 250,
  });
});
