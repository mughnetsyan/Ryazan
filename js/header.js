document.querySelector('#dropdown__btn').addEventListener('click', function (e) {
    var dropdownContent = document.querySelector('#dropdown__content')
    var dropdownImg = document.querySelector('#dropdown__img')
    dropdownContent.style.opacity = dropdownContent.style.opacity == '1' ? '0' : '1';
    dropdownContent.style.display = dropdownContent.style.display == 'grid' ? 'none' : 'grid';

    dropdownImg.style.transform = dropdownImg.style.transform == "rotateX(180deg)" ? "rotateX(0deg)" : "rotateX(180deg)"
})