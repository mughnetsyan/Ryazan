// * Кнопки для удаления картинок из формы
let deleteImgBtns = document.querySelectorAll(".images__delete-btn")

// * Файловое поле ввода
let fileInput = document.querySelector("#file-input")

// * Элемент с картинками из fileInput
let formImages = document.querySelector(".form__images")

// * Элемент с другими файлами, кроме картинок, из fileInput
let formFiles = document.querySelector(".form__files")

// * Кнопки с выпадающим списком
let formBtns = document.querySelectorAll(".form__btn")

// * Выпадающие списки для formBtns
let formDropdownContents = document.querySelectorAll(".form__dropdown-content")

// * Элемент, который является родителем для formImages и formFiles
let downloadedFiles = document.querySelector("#downloaded-files")

// * Массив файлов
let files = [];

function addFile(file) {
    
    files.push(file)

    if(file.type.indexOf("image") === 0) {
        var reader = new FileReader();

        reader.readAsDataURL(file)

        reader.addEventListener('load', function() {
            var element = createImagesElement(file.name, reader.result)
            formImages.innerHTML += element;

            console.log(formImages)

            checkFiles()
        })
    } else {
        switch(true) {
            case(file.name.length >= 45) : var name = getShortenedString(file.name, false); break;
            case(file.name.split(' ').length > 4) : var name = getShortenedString(file.name, true); break;
            default : var name = file.name;
        }

        switch(true) {
            case(convertDecimals(file.size, 3).toFixed(1) != 0.0) : var size = `${convertDecimals(file.size, 3).toFixed(1)} ГБ`; break;
            case(convertDecimals(file.size, 2).toFixed(1) != 0.0) : var size = `${convertDecimals(file.size, 2).toFixed(1)} МБ`; break;
            case(convertDecimals(file.size, 1).toFixed(1) != 0.0) : var size = `${convertDecimals(file.size, 1).toFixed(1)} КБ`;
        }

        var fullName = file.name;

        var date = getFullDate(file)

        formFiles.innerHTML +=  createFormFile(fullName, name, size, date)
        checkFiles()
    }
}

function removeFile(e, containerClassName, btnClassName, imgClassName) {
    if(!e.target.classList.contains(containerClassName)) {
        switch(true) {
            case(e.target.classList.contains(btnClassName)) : var element = e.target.parentElement; break;
            case(e.target.classList.contains(imgClassName)) : var element = e.target.parentElement.parentElement; break;
            default: return
        }
        
        for(var i in files) {
            if(element.dataset.name === files[i].name) {
                files.splice(i, 1)
            }
        }
        
        element.classList.add("opacity-0");
        
        setTimeout(function() { element.parentElement.removeChild(element); checkFiles() }, 200) }
}

function isDuplicate(file) {
    for(var i in files) {
        if(file.name === files[i].name) return true
    }

    return false
}

function checkFiles() {
    if(document.querySelector(".images__element") == null) { formImages.classList.remove("mb-20") } else { formImages.classList.add("mb-20") }
    
    if(files.length != 0) {
        downloadedFiles.classList.remove("d-none")
        setTimeout(function() {
            downloadedFiles.classList.remove("opacity-0")
        }, 300)
    } else {
        downloadedFiles.classList.add("opacity-0")
        setTimeout(function() {
            downloadedFiles.classList.add("d-none")
        }, 300)
    }
}

function convertDecimals(bytes, power) {
    return bytes / Math.pow(1024, power);
}

function getFullDate(file) {
    return `${(new Date(file.lastModified)).getDate()}.${(new Date(file.lastModified)).getMonth() + 1}.${(new Date(file.lastModified)).getFullYear()}`
}
// ? mode - для переключения режимов
function getShortenedString(str, mode) {
    if(mode) {
        return `${str.split(' ')[0]} ${str.split(' ')[1]} ${str.split(' ')[2]}...${str.split(' ')[str.split(' ').length - 1]}`
    } else {
        return `${str.slice(0, 21)}...${str.slice(-21, -1)}`
    }
}

function createImagesElement(name, src) {
    return `<div class="images__element" data-name="${name}">
        <img src="${src}" alt="" class="images__main-img">
        <button class="btn images__delete-btn">
            <img src="../img/cross.svg" alt="" class="images__delete-img">
        </button>
    </div>`
}

function createFormFile(fullName, name, size, date) {
    return `<div class="form__file" data-name="${fullName}">
        <img src="../img/file.svg" alt="" class="file__main-img">
        <div class="file__info">
            <h1 class="file__h1">${name}</h1>
            <div class="file__details">
                <p class="file__p">${size}</p>
                <div class="file__spacer"></div>
                <p class="file__p">${date}</p>
            </div>
        </div>
        <button class="btn file__delete-btn">
            <img src="../img/cross-1.svg" alt="" class="file__delete-img">
        </button>
    </div>
`
}

fileInput.addEventListener('change', function() {
    var file = fileInput.files[0];

    if(isDuplicate(file)) return

    addFile(file)
    
    fileInput.value = ""
})

formImages.addEventListener('click', function(e) {
    removeFile(e, "form-images", "images__delete-btn", "images__delete-img")
})

formFiles.addEventListener('click', function(e) {
    removeFile(e, "form__files", "file__delete-btn", "file__delete-img")
})

document.addEventListener('paste', function(e) {
    var file = e.clipboardData.items[0].getAsFile();
    
    if(file == null || isDuplicate(file)) return

    addFile(file)
})


formBtns.forEach(btn => {
    let formDropdownContent = btn.parentElement.nextElementSibling;
    let formImg = btn.nextElementSibling;

    let dropdownBtns = Array.prototype.slice.call(formDropdownContent.querySelectorAll(".form__dropdown-btn:not(.form__dropdown-btn-noresult)"))


    // * Появление выпадающих списков
    btn.addEventListener('focus', function() {
        formImg.classList.add("rotateZ-90deg")

        formDropdownContent.classList.remove("d-none")
        setTimeout(function() {
            formDropdownContent.classList.remove("opacity-0")
        }, 150 )
    })

    
    // * Исчезновение выпадающих списков
    btn.addEventListener('blur', function() {
        formImg.classList.remove("rotateZ-90deg")

        formDropdownContent.classList.add("opacity-0")
        setTimeout(function() {
            formDropdownContent.classList.add("d-none")
        }, 150)
    })


    btn.addEventListener('input', function(e) {
        dropdownBtns.forEach(dropDownbtn => {
            var btnText = dropDownbtn.innerHTML.toLowerCase().replace(/ /g,'')
            var inputText = e.target.value.toLowerCase().replace(/ /g,'')

            if(btnText.includes(inputText)) {
                dropDownbtn.classList.remove("d-none")
                setTimeout(function() {
                    dropDownbtn.classList.remove("opacity-0")
                }, 150)
            } else {
                dropDownbtn.classList.add("opacity-0")
                setTimeout(function() {
                    dropDownbtn.classList.add("d-none")
                }, 150)
            }
        })
    })

    dropdownBtns.forEach(dropDownbtn => {
        dropDownbtn.addEventListener('click', function() {
            btn.value = dropDownbtn.innerHTML;
        })
    })
})

