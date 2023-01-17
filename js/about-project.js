let sliderMarginTop = (-(Number((window.getComputedStyle(document.querySelector('#main-content__statistics'), null).height).slice(0, -2)) / 2)) + 'px';

document.querySelector('#slider').style.marginTop = sliderMarginTop;

let sliderBtns = document.querySelectorAll('.slider__btn');
let sliderSlides = document.querySelectorAll('.slider__slide');
let counter = 1;

function changeSlideByClick() {
    for(let i = 0; i < sliderBtns.length; i++) {
        if(sliderBtns[i] == this) {
            setTimeout(function() {
                sliderSlides[i].classList.add("slider__visible")
            }, 200)
            sliderBtns[i].classList.add("slider__active-btn")
            sliderSlides[i].classList.add("slider__active-slide")
            
            if(counter == sliderBtns.length) { counter = 1} else { counter = i + 1 } 

        } else {
            setTimeout(function() {
                sliderSlides[i].classList.remove("slider__visible")
            }, 200)
            sliderSlides[i].classList.remove("slider__active-slide")
            sliderBtns[i].classList.remove("slider__active-btn")
        } 
    }

    clearTimeout(intervalId)
    intervalId = setTimeout(changeSlideByTime, 3000)
}

function changeSlideByTime() {
    for(let i = 0; i < sliderBtns.length; i++) {
        if(sliderBtns[i] == sliderBtns[counter - 1]) {
            setTimeout(function() {
                sliderSlides[i].classList.add("slider__visible")
            }, 200)
            sliderBtns[i].classList.add("slider__active-btn")
            sliderSlides[i].classList.add("slider__active-slide")

        } else {
            setTimeout(function() {
                sliderSlides[i].classList.remove("slider__visible")
            }, 200)
            sliderSlides[i].classList.remove("slider__active-slide")
            sliderBtns[i].classList.remove("slider__active-btn")
        } 
    }
    if(counter == sliderBtns.length) { counter = 1} else { counter++ } 

    clearTimeout(intervalId)
    intervalId = setTimeout(changeSlideByTime, 3000)
}


for(var i = 0; i < sliderBtns.length; i++) {
    if(sliderBtns[i].classList.contains("slider__active-btn")) {
        sliderSlides[i].classList.add("slider__visible")
        sliderSlides[i].classList.add("slider__active-slide")

    }
    sliderBtns[i].onclick = changeSlideByClick;
    sliderSlides[i].onclick = changeSlideByTime;
}

let intervalId = setTimeout(changeSlideByTime, 0)