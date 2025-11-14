const data = [
  {
    id: 0,
    image: "./images/peach.jpg",
    texts: ["Fresh Peach", "Sweet & Juicy"],
  },
  {
    id: 1,
    image: "./images/table.png",
    texts: ["Dining Table", "Wooden & Elegant"],
  },
  {
    id: 2,
    image: "./images/shoe.png",
    texts: ["Running Shoe", "Comfortable Fit"],
  },
  {
    id: 3,
    image: "./images/cone.png",
    texts: ["Ice Cream Cone", "Delicious Dessert"],
  },
  {
    id: 4,
    image: "./images/forest.png",
    texts: ["Mystic Forest", "Nature's Beauty"],
  },
  {
    id: 5,
    image: "./images/telephone.jpg",
    texts: ["Vintage Phone", "Classic Design"],
  },
];

let CurrentIndex = 0;

const Swiper_Wrapper = document.querySelector(".swiper-wrapper");

data.map((item) => {
  const SlideElement = `<div class="swiper-slide">
       <img src="${item.image}" class="slide-image"/>
      <div class="slide-texts-container">
        ${item.texts
          .map((text) => `<div class="slide-text">${text}</div>`)
          .join("")}
      </div>
    </div>`;
  Swiper_Wrapper.innerHTML += SlideElement;
});

const Slide_Texts = document.querySelectorAll(".slide-text");
Slide_Texts.forEach((item) => {
  let offsetX = 0;
  let offsetY = 0;
  let isDragging = false;

  item.addEventListener("click", (e) => {
    isDragging = !isDragging;
    if (isDragging) {
      offsetX = e.clientX - item.offsetLeft;
      offsetY = e.clientY - item.offsetTop;
      item.style.cursor = "grabbing";
    } else {
      item.style.cursor = "pointer";
    }
  });

  item.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - item.offsetLeft;
    offsetY = e.clientY - item.offsetTop;
    item.style.cursor = "grabbing";
  });

  document.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false;
      item.style.cursor = "grab";
    }
  });

  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      e.stopPropagation();
      item.style.position = "absolute";
      item.style.left = `${e.clientX - offsetX}px`;
      item.style.top = `${e.clientY - offsetY}px`;
    }
  });
});

const swiper = new Swiper(".swiper", {
  pagination: {
    el: ".swiper-pagination",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  on: {
    slideChange: function () {
      CurrentIndex = this.activeIndex;
    },
  },
});
