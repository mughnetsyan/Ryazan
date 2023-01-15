
let scrollBtns = document.querySelectorAll('.img-block__btn')

let modalBtns = [document.querySelector('#openModal-btn'), document.querySelector('.modal-window__close-btn')]

let modalWindow = document.querySelector('.modal-window')

let copyBtn = document.querySelector("#copy-btn")

function horizontalScroll(e, value) {
    element = e.parentElement.parentElement.getElementsByTagName('div')[0]

    element.scrollTo({
            left: value,
            behavior: 'smooth'
    });

    
}


scrollBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        if(e.target.classList.contains("img-block__btn")) {
            var element = e.target
        } else if(e.target.classList.contains("img-block__decorative-btn")) {
            var element = e.target.parentElement
        } else {
            var element = e.target.parentElement.parentElement
        }

        var index = element.classList[1].slice(-1);



        if(index == "2") {
            horizontalScroll(element, 1000)

            element.classList.add("d-none")
            element.previousElementSibling.classList.remove("d-none")

            setTimeout(function() {
                element.classList.add("opacity-0")
                element.previousElementSibling.classList.remove("opacity-0")
            }, 0)

        } else {
            horizontalScroll(element, 0)

            element.classList.add("d-none")
            element.nextElementSibling.classList.remove("d-none")

            setTimeout(function() {
                element.classList.add("opacity-0")
                element.nextElementSibling.classList.remove("opacity-0")
            },0)
        }

    })
})

console.log(modalBtns[0])

modalBtns[0].addEventListener('click', function() {
    document.querySelector('body').style.overflowY = 'hidden'
    modalWindow.classList.remove("d-none")
    
    setTimeout(function() {
        modalWindow.classList.remove("opacity-0")
    }, 0)

    copyBtn.innerHTML = 'Copy';
    copyBtn.style.background = "#ffcc33"
})

modalBtns[1].addEventListener('click', function() {
    document.querySelector('body').style.overflowY = 'visible'
    modalWindow.classList.add("d-none")
    
    setTimeout(function() {
        modalWindow.classList.add("opacity-0")
    }, 0)

})

copyBtn.addEventListener('click', function(e) {
    navigator.clipboard.writeText(e.target.parentElement.querySelector(".modal-window__p").innerHTML)
    e.target.innerHTML = 'Copied'
    e.target.style.background = "#25D366"
})

