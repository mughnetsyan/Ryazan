let dropdownContent = document.querySelector('#dropdown__content');
let dropdownImg = document.querySelector('#dropdown__img');

let dropdownBtn = document.querySelector("#dropdown__btn");

dropdownBtn.addEventListener('click', function() {
    if(dropdownContent.classList.contains("d-none")) {

        dropdownContent.classList.remove("d-none")
        setTimeout(function() {
            dropdownContent.classList.remove("opacity-0")
        }, 0)

        dropdownImg.classList.add("rotateX-180deg")
    } else {
        dropdownContent.classList.add("opacity-0")
        setTimeout(function() {
            dropdownContent.classList.add("d-none")
        }, 300)

        dropdownImg.classList.remove("rotateX-180deg")
    }
})