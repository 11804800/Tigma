const data = [
  {
    id: 0,
    image: "./images/peach.jpg",
  },
  {
    id: 1,
    image: "./images/table.png",
  },
  {
    id: 2,
    image: "./images/shoe.png",
  },
  {
    id: 3,
    image: "./images/cone.png",
  },
  {
    id: 4,
    image: "./images/forest.png",
  },
  {
    id: 5,
    image: "./images/telephone.jpg",
  },
];

let CurrentIndex = 0;

const Swiper_Wrapper = document.querySelector(".swiper-wrapper");

data.map((item) => {
  const SlideElement = `<div class="swiper-slide">
  <img src="${item.image}" class="slide-image"/>
    </div>`;
  Swiper_Wrapper.innerHTML += SlideElement;
});

const swiper = new Swiper(".swiper", {
  loop: true,
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
