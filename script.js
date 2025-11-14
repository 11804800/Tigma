const data = [
  {
    id: 0,
    image: "./images/peach.jpg",
    texts: [
      {
        id: 0,
        text: "Cherry is Very Good for health.",
        font: "24px",
        color: "rgb(0,0,0)",
        fontFamily: "Gill Sans",
        fontWeight: 400,
      },
    ],
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
let CurrentTextIndex = -1;
let CurrentTextId = -1;

const Add_New_Text_Btn = document.querySelector("#add-text-btn");
const Swiper_Wrapper = document.querySelector(".swiper-wrapper");

const Edit_Text_Btn = document.querySelector("#edit-text-btn");
const Edit_Font_Size_Btn = document.querySelector("#edit-font-size-btn");
const Edit_Font_Color_Btn = document.querySelector("#edit-font-color-btn");
const Edit_Font_Family_Btn = document.querySelector("#edit-font-family-btn");
const Edit_Font_Weight_Btn = document.querySelector("#edit-font-weight-btn");

function AttachEventListeners() {
  const SLIDE = document.querySelectorAll(".slide-text");
  SLIDE.forEach((item, index) => {
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    item.addEventListener("mousedown", (e) => {
      isDragging = true;
      offsetX = e.clientX - item.offsetLeft;
      offsetY = e.clientY - item.offsetTop;
      document.addEventListener("mousemove", MouseMoveHandler);
      document.addEventListener("mouseup", MouseUpHandler);
    });

    function MouseMoveHandler(e) {
      if (isDragging) {
        item.style.position = "absolute";
        item.style.left = e.clientX - offsetX + "px";
        item.style.top = e.clientY - offsetY + "px";
      }
    }

    function MouseUpHandler() {
      item.style.border = "none";
      isDragging = false;
      document.removeEventListener("mousemove", MouseMoveHandler);
      document.removeEventListener("mouseup", MouseUpHandler);
    }
  });
}

function SetCurrentTextIndex() {
  const SLIDE = document.querySelectorAll(".slide-text");
  SLIDE.forEach((item, index) => {
    item.addEventListener("click", (e) => {
      CurrentTextIndex = index;
      CurrentTextId = item.id;
      SLIDE.forEach((item) => {
        item.style.border = "none";
      });
      item.style.border = "1px solid white";
      const Style = window.getComputedStyle(item);
      Edit_Font_Color_Btn.value = `${Style.color}`;
      Edit_Font_Size_Btn.value = `${Style.fontSize.replace("px", "")}`;
      Edit_Font_Weight_Btn.value = `${Style.fontWeight}`;
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
          .map(
            (elem, index) =>
              `<div id=${elem.id}  class="slide-text"       
      style=" font-size:${elem.font}; color:${elem.color}; font-weight: ${elem.fontWeight};font-family:${elem.fontFamily};">${elem.text}</div>`
          )
          .join("")}
      </div>
    </div>`;
    Swiper_Wrapper.innerHTML += SlideElement;
  });
  AttachEventListeners();
  SetCurrentTextIndex();
}

RenderDataItem();

Add_New_Text_Btn.addEventListener("click", () => {
  data[CurrentIndex].texts.push({
    id: data[CurrentIndex].texts.length + 1,
    text: "Click to edit text",
    font: "24px",
    color: "rgb(0,0,0)",
    fontFamily: "Gill Sans",
    fontWeight: 400,
  });
  RenderDataItem();
});

const swiper = new Swiper(".swiper", {
  pagination: {
    el: ".swiper-pagination",
  },
  touchStartPreventDefault: false,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  on: {
    slideChange: function () {
      CurrentIndex = this.realIndex;
    },
  },
});

function DeleteText() {
  if (CurrentTextIndex >= 0) {
    const filterText = data[CurrentIndex].texts.filter(
      (item) => item.id != CurrentTextId
    );
    data[CurrentIndex].texts = filterText;
    RenderDataItem();
  }
}

function EditText() {
  if (CurrentTextIndex >= 0) {
    const slide_text = document.querySelectorAll(".slide-text");
    slide_text[CurrentTextIndex].contentEditable = "true";
    slide_text[CurrentTextIndex].focus();
    document.addEventListener("mousedown", (e) => {
      if (e.target != slide_text[CurrentTextIndex]) {
        if (slide_text[CurrentTextIndex]) {
          slide_text[CurrentTextIndex].contentEditable = "false";
        }
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key == "Enter") {
        slide_text[CurrentTextIndex].contentEditable = "false";
      }
    });
  }
}

function FontChange() {
  if (CurrentTextIndex >= 0) {
    const slide_text = document.querySelectorAll(".slide-text");
    const value = document.querySelector("#edit-font-size-btn").value;
    slide_text[CurrentTextIndex].style.fontSize = `${value}px`;
    const Index = data[CurrentIndex].texts.findIndex(
      (item) => item.id == CurrentTextId
    );
    data[CurrentIndex].texts[Index].font = `${value}px`;
  }
}

function ChangeFontWeight() {
  if (CurrentTextIndex >= 0) {
    const slide_text = document.querySelectorAll(".slide-text");
    const value = Edit_Font_Weight_Btn.value;
    slide_text[CurrentTextIndex].style.fontWeight = `${value}`;
    const Index = data[CurrentIndex].texts.findIndex(
      (item) => item.id == CurrentTextId
    );
    data[CurrentIndex].texts[Index].fontWeight = value;
  }
}

function ChangeFontFamily() {
  if (CurrentTextIndex >= 0) {
    const slide_text = document.querySelectorAll(".slide-text");
    const value = Edit_Font_Family_Btn.value;
    slide_text[CurrentTextIndex].style.fontFamily = `${value}`;
    const Index = data[CurrentIndex].texts.findIndex(
      (item) => item.id == CurrentTextId
    );
    data[CurrentIndex].texts[Index].fontFamily = value;
  }
}

function ChangeFontColor() {
  if (CurrentTextIndex >= 0) {
    const slide_text = document.querySelectorAll(".slide-text");
    const value = Edit_Font_Color_Btn.value;
    slide_text[CurrentTextIndex].style.color = `${value}`;
    const Index = data[CurrentIndex].texts.findIndex(
      (item) => item.id == CurrentTextId
    );
    data[CurrentIndex].texts[Index].color = `${value}`;
    console.log(data[CurrentIndex].texts[Index]);
  }
}
