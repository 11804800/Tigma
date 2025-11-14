const data = [
  {
    id: 0,
    image: "./images/peach.jpg",
    texts: [],
  },
  {
    id: 1,
    image: "./images/table.png",
    texts: [],
  },
  {
    id: 2,
    image: "./images/shoe.png",
    texts: [],
  },
  {
    id: 3,
    image: "./images/cone.png",
    texts: [],
  },
  {
    id: 4,
    image: "./images/forest.png",
    texts: [],
  },
  {
    id: 5,
    image: "./images/telephone.jpg",
    texts: [],
  },
];

let CurrentIndex = 0;

const Swiper_Wrapper = document.querySelector(".swiper-wrapper");

function AttachSlideEventListener() {
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
        item.style.border = "2px solid white";
      } else {
        item.style.cursor = "pointer";
        item.style.border = "none";
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
        item.style.position = "absolute";
        item.style.left = `${e.clientX - offsetX}px`;
        item.style.top = `${e.clientY - offsetY}px`;
      }
    });
  });
}

function RenderDataItem() {
  Swiper_Wrapper.innerHTML = "";
  data.map((item) => {
    const SlideElement = `<div class="swiper-slide">
       <img src="${item.image}" class="slide-image"/>
      <div class="slide-texts-container">
        ${item.texts
          .map((elem) => `<div class="slide-text">${elem.text}</div>`)
          .join("")}
      </div>
    </div>`;
    Swiper_Wrapper.innerHTML += SlideElement;
  });
  AttachSlideEventListener();
}

RenderDataItem();

const Add_New_Text_Btn = document.querySelector("#add-text-btn");
Add_New_Text_Btn.addEventListener("click", () => {
  data[CurrentIndex].texts.push({
    id: data[CurrentIndex].texts.length + 1,
    text: "Click to edit text",
  });
  RenderDataItem();
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
