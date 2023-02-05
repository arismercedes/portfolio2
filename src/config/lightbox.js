const test = document.querySelectorAll(".hover_tgt");
const lightbox = document.querySelector("#lightbox");
const closeBtn = document.querySelector(".closeBtn");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const indexLength = document.querySelectorAll(`#lightbox div[data-index]`).length;
let isOpen = false;

const lightboxController = (() => {
  let index = 0;
  let item = "";
  const openLightbox = (e) => {
    index = e.currentTarget.dataset.index;
    item = document.querySelector(`#lightbox div[data-index="${index}"]`);
    lightboxController.toggles();
    isOpen = true;
    lightboxController.startEnd();
    document.body.style.overflow = "hidden";
    item.classList.toggle("imgAppear")
  }

  const closeLightbox = () => {
    lightboxController.toggles();
    isOpen = false;
    document.body.style.overflow = "auto";
    item.classList.toggle("imgAppear")

  }
  const getCurrentImg = () => {
    item = document.querySelector(`#lightbox div[data-index="${index}"]`);
    return item
  }
  const toggleCurrentImg = () => {
    item.classList.toggle("hidden");
    lightboxController.startEnd();

  }
  const toggleLightbox = () => {
    lightbox.classList.toggle("hidden");

  }
  const toggles = () => {
    lightboxController.toggleLightbox();
    lightboxController.toggleCurrentImg();
  }
  const nextImg = () => {
    if(index < indexLength) {
      lightboxController.toggleCurrentImg();
      setTimeout(() => item.classList.toggle("imgAppear"),100)
      
      index++
      lightboxController.getCurrentImg()
      lightboxController.toggleCurrentImg();
      item.previousElementSibling.classList.toggle("imgAppear");
    }
  }
  const prevImg = () => {
    if(index > 1) {
      lightboxController.toggleCurrentImg();
      setTimeout(() => item.classList.toggle("imgAppear"),100)
      index--
      lightboxController.getCurrentImg()
      lightboxController.toggleCurrentImg();
      item.nextElementSibling.classList.toggle("imgAppear");
    }
  }
  const startEnd = () => {
    if(isOpen === true) {
      if(index<2) {
        prevBtn.classList.add("hidden")
      }else {
        prevBtn.classList.remove("hidden")
      }
      if(index>indexLength-1) {
        nextBtn.classList.add("hidden")
      }else {
        nextBtn.classList.remove("hidden")
      }
    }
  }

  return {
    openLightbox,
    closeLightbox,
    toggleCurrentImg,
    toggleLightbox,
    toggles,
    nextImg,
    prevImg,
    getCurrentImg,
    startEnd
  }


})();

test.forEach((item) => {
  item.addEventListener("click", lightboxController.openLightbox)
})

prevBtn.addEventListener("click", lightboxController.prevImg)
nextBtn.addEventListener("click", lightboxController.nextImg)
closeBtn.addEventListener("click", lightboxController.closeLightbox)

document.addEventListener('keydown', (event) => {
  if(isOpen===true) {
    if (event.key === 'Escape') {
          const isNotCombinedKey = !(event.ctrlKey || event.altKey || event.shiftKey);
          if (isNotCombinedKey) {
            if (isOpen === true) {
              lightboxController.closeLightbox();
            }
          }
      } else if (event.key === 'ArrowRight') {
        lightboxController.nextImg();
      } else if (event.key === 'ArrowLeft') {
        lightboxController.prevImg();
      }
  }
});
