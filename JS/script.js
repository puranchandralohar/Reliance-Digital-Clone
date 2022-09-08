// pin-code
let userPinCode = document.querySelector(".user-pin-code");
let popUp = document.querySelector(".pop-up");
let inputScreen = document.querySelector("#pinCode");
let closeBtn = document.querySelector(".close");
let submitBtn = document.querySelector(".apply");
let foundMsg = document.querySelector(".found-msg");
let errorMsg = document.querySelector(".error-msg");
let inputLabel = document.querySelector('.txt-input label')

userPinCode.addEventListener("click", () => {
  popUp.classList.remove("inactive");
  inputScreen.value = "";
  errorMsg.innerHTML = "";
  inputScreen.classList.remove("alert");
  inputLabel.classList.remove('alert')
});

closeBtn.addEventListener("click", () => {
  popUp.classList.add("inactive");
});

submitBtn.addEventListener("click", () => {
  if(inputScreen.value.length < 6) {
    popUp.classList.remove("inactive");
    errorMsg.innerHTML = `Please enter correct PIN Code`;
    inputScreen.classList.add("alert");
    inputLabel.classList.add('alert')
  }
  else{
    fetch(`https://api.postalpincode.in/pincode/${inputScreen.value}`)
      .then((res) => res.json())
      .then((data) => {
        data.forEach((ele) => {
          // console.log(ele);
          let status = ele.Status;
          let PostOffice = ele.PostOffice;
          if (status == "Success") {
            PostOffice.forEach((e) => {
              // console.log(e);
              let PinCode = `${e.District} ${e.Pincode}`;
              foundMsg.innerText = PinCode

              localStorage.setItem('location', PinCode)

            });
            popUp.classList.add('inactive')
          } 
          else if(status == "Error") {
            popUp.classList.remove("inactive");
            errorMsg.innerText = `Invalid Pincode`;
            inputScreen.classList.add("alert");
            inputLabel.classList.add('alert')
          }
        });
      });
      errorMsg.innerHTML = `<div class="loader"></div>`
  }
});

inputScreen.addEventListener("focus", () => {
  errorMsg.innerHTML = "";
  inputScreen.classList.remove("alert");
  inputLabel.classList.remove('alert')
});


// slider js 
const slides = document.getElementsByClassName("slide");
const slider__btns = document.querySelectorAll(".slider__navigation__btn");
const slides2 = document.getElementsByClassName("vivo__galaxy__slide");


// console.log(slider__btns);
let flag = 0;
let currentSlide = 1;
slider__btns.forEach(element => {
    // console.log(element);
  });


function controller(x){
    flag = flag + x;
    slidesShow(flag);
}


slidesShow(flag);

function slidesShow(num){
    if(num == slides.length){
       flag = 0;
       num = 0;
    }
    if(num<0){
        flag = slides.length-1;
        num = slides.length-1;
    }
    for(let y of slides){
        y.style.display = "none";
       }
    slides[num].style.display = "block";
    
}


// slider-2
let flag2 = 0;
function controller2(y){
    flag2 = flag2 + y;
    slideShow2(flag2);
}
slideShow2(flag2);

function slideShow2(num2){
    if(num2 == slides2.length){
        num2=0;
        flag2=0;
    }
    if(num2 < 0){
     num2=slides2.length-1;
     flag2=slides2.length-1;
    }
    for(let y of slides2){
        y.style.display = "none";
       }
    slides2[num2].style.display = "block";
}


// Product Slider Starts
let main = document.querySelector(".watches_slider");

let url = "https://api.escuelajs.co/api/v1/categories/2/products";
fetch(url)
  .then((res) => res.json())
  .then((data) => {
    for (let i = 0; i < 15; i++) {
      console.log(data);
      let result = `<div class="watch_item">
                        <a href="#">
                            <div class="product_image">
                                <img src="${data[i].images[1]}" alt="${
                                    data[i].title
                                }">
                            </div>
                            <div class="product_title">${data[i].title}</div>
                            <div class="stars">&bigstar;&starf;&starf;&starf;&star;</div>
                            <div class="product_price">Offer Price <strong>Rs.${
                              data[i].price
                            }</strong></div>
                            <div class="product_original_price">M.R.P :Rs.${
                              data[i].price + 1000
                            }</div>
                            <button id = "btn">Offer Available</button>
                        </a>
                    </div>`;
      main.innerHTML += result;
    }
  });

// Slider Part

const main1 = [...document.querySelectorAll(".watches_slider")];
const nxtBtn = [...document.querySelectorAll(".nxt-btn")];
const preBtn = [...document.querySelectorAll(".pre-btn")];

main1.forEach((item, i) => {
  let containerDimensions = item.getBoundingClientRect();
  let containerWidth = containerDimensions.width;

  nxtBtn[i].addEventListener("click", () => {
    item.scrollLeft += containerWidth;
  });

  preBtn[i].addEventListener("click", () => {
    item.scrollLeft -= containerWidth;
  });
});
