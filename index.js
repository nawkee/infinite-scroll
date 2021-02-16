const imageContainer = document.querySelector("#image-container");
const loader = document.querySelector("#loader");

const count = 30;
const apiKey = "3ZH7k-yFYhEDvDYZzTG_IaFfZs2HlEQpUSwJPWHRV5I";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
let ready = false;

const imageLoaded = (imagesLoaded, totalImages) => {
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
};

const setAttributes = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

const displayPhotos = (photosArray) => {
  let imagesLoaded = 0;
  const totalImages = photosArray.length;

  photosArray.forEach((photo) => {
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    img.addEventListener("load", () => {
      imagesLoaded++;
      imageLoaded(imagesLoaded, totalImages);
    });
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
};

const getPhotos = async () => {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    displayPhotos(data);
  } catch (error) {
    console.error(error);
  }
};

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

getPhotos();
