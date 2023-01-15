
let mainDropdownContent = document.querySelector('#main-dropdown-content');
let mainDropdownBtn = document.querySelector('#main-dropdown-btn')

let secondaryDropdownContent = [document.querySelector("#secondary-dropdown-content-1"),
                                document.querySelector("#secondary-dropdown-content-2"),
                                document.querySelector("#secondary-dropdown-content-3")]

let secondaryDropdownBtns = [document.querySelector("#secondary-dropdown-btn-1"),
                            document.querySelector("#secondary-dropdown-btn-2"), 
                            document.querySelector("#secondary-dropdown-btn-3")]

let scrollBtns = document.querySelectorAll('.img-block__btn')


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

mainDropdownBtn.addEventListener('click', function(e) {
    if(mainDropdownContent.style.maxHeight === '100px') {
        mainDropdownBtn.classList.remove("btn-active")

        mainDropdownContent.style.maxHeight = '0'
        mainDropdownContent.style.visibility = 'hidden'

        setTimeout(function() {
            mainDropdownContent.style.marginTop = '0';
            mainDropdownContent.style.opacity = '0';
        }, 0)


        
        secondaryDropdownContent.forEach(element => {
            element.style.maxHeight = '0'
            element.style.visibility = 'hidden'
    
            setTimeout(function() {
                element.style.marginTop = '0';
                element.style.opacity = '0';
            }, 0)
        })

        secondaryDropdownBtns.forEach(element => {
            element.lastChild.style.transform = "rotateX(0deg)"
        })


    } else {
        mainDropdownBtn.classList.add("btn-active")

        mainDropdownContent.style.marginTop = '24px';
        
        mainDropdownContent.style.maxHeight = '100px'
        mainDropdownContent.style.visibility = 'visible'

        setTimeout(function() {
            mainDropdownContent.style.opacity = '1';
        }, 0)

    }

}
)

for(var i = 0; i <= 2; i++) {
    secondaryDropdownBtns[i].addEventListener('click', function(e) {
        if(e.target.classList.contains("dropdown-content__btn")) {
            var index = e.target.id.slice(-1);
        } else {
            var index = e.target.parentElement.id.slice(-1);
        }


        console.log(secondaryDropdownContent)

        if(secondaryDropdownContent[index - 1].style.maxHeight === '400px') {
            
            secondaryDropdownBtns[index - 1].lastChild.style.transform = "rotateX(0deg)"

            secondaryDropdownContent[index - 1].style.maxHeight = '0'
            secondaryDropdownContent[index - 1].style.visibility = 'hidden'
    
            setTimeout(function() {
                secondaryDropdownContent[index - 1].style.marginTop = '0';
                secondaryDropdownContent[index - 1].style.opacity = '0';
            }, 0)


        } else {

            secondaryDropdownBtns[index - 1].lastChild.style.transform = "rotateX(180deg)"

            secondaryDropdownContent[index - 1].style.marginTop = '8px';
            
            secondaryDropdownContent[index - 1].style.maxHeight = '400px'
            secondaryDropdownContent[index - 1].style.visibility = 'visible'
    
            setTimeout(function() {
                secondaryDropdownContent[index - 1].style.opacity = '1';
            }, 0)
        }
    })

    secondaryDropdownContent[i].addEventListener('click', function(e) {

        var parentIndex = e.target.parentElement.id.slice(-1);

        if(!e.target.classList.contains("dropdown-content__select-block")) {
            secondaryDropdownBtns[parentIndex - 1].innerHTML = e.target.innerHTML + '<img src="../img/chevron-2.svg" alt="">';
            secondaryDropdownBtns[parentIndex - 1].value = e.target.innerHTML;

            secondaryDropdownContent[parentIndex - 1].style.maxHeight = '0'
            secondaryDropdownContent[parentIndex - 1].style.visibility = 'hidden'
    
            setTimeout(function() {
                secondaryDropdownContent[parentIndex - 1].style.marginTop = '0';
                secondaryDropdownContent[parentIndex - 1].style.opacity = '0';
            }, 0)
        }
    })
}