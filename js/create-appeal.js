// * Кнопки для удаления картинок из формы
let deleteImgBtns = document.querySelectorAll(".images__delete-btn")

// * Файловое поле ввода
let fileInput = document.querySelector("#file-input")

// * Элемент с картинками из fileInput
let formImages = document.querySelector(".form__images")

// * Элемент с другими файлами, кроме картинок, из fileInput
let formFiles = document.querySelector(".form__files")

// * Элемент, который является родителем для formImages и formFiles
let downloadedFiles = document.querySelector("#downloaded-files")

// * Массив файлов
let files = [];

function convertDecimals(bytes, power) {
    return bytes / Math.pow(1024, power);
}

function checkDownloadedFiles() {
    if(files.length > 0) {
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

function checkDownloadedImages() {

    var imagesCount = 0

    formImages.childNodes.forEach(child => { if(child.nodeName == "DIV") imagesCount += 1 })

    if(imagesCount == 0) {
        formImages.classList.remove("mb-20")
    } else {
        formImages.classList.add("mb-20")
    }
}

function getFullDate(file) {
    return `${(new Date(file.lastModified)).getDate()}.${(new Date(file.lastModified)).getMonth() + 1}.${(new Date(file.lastModified)).getFullYear()}`
}

// ? mode - для переключения режимов
function shortenStr(str, mode) {
    if(mode) {
        return `${str.split(' ')[0]} ${str.split(' ')[1]} ${str.split(' ')[2]}...${str.split(' ')[str.split(' ').length - 1]}`
    } else {
        return `${str.slice(0, 21)}...${str.slice(-21, -1)}`
    }
}

function createImagesElement(name, src) {
    return `
    <div class="images__element" data-name="${name}">
        <img src="${src}" alt="" class="images__main-img">
        <button class="btn images__delete-btn">
            <img src="../img/cross.svg" alt="" class="images__delete-img">
        </button>
    </div>`
}

function createFormFile(name, size, date) {
    return `
    <div class="form__file" data-name="${name}">
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

    files.push(file)

    if(file.type.indexOf("image") === 0) {
        var reader = new FileReader();

        reader.readAsDataURL(file);

        reader.addEventListener('load', function() {
            var element = createImagesElement(file.name, reader.result)
            formImages.innerHTML += element;

            checkDownloadedImages()
        })

    } else {
        switch(true) {
            case(file.name.length >= 45) : var name = shortenStr(file.name, false); break;
            case(file.name.split(' ').length > 4) : var name = shortenStr(file.name, true); break;
            default : var name = file.name
        }

        switch(false) {
            case(convertDecimals(file.size, 3).toFixed(1) == 0.0) : var size = `${convertDecimals(file.size, 3).toFixed(1)} ГБ`; break;
            case(convertDecimals(file.size, 2).toFixed(1) == 0.0) : var size = `${convertDecimals(file.size, 2).toFixed(1)} МБ`; break;
            case(convertDecimals(file.size, 1).toFixed(1) == 0.0) : var size = `${convertDecimals(file.size, 1).toFixed(1)} КБ`;
        }

        var date = getFullDate(file)

        var element = createFormFile(name, size, date)
        formFiles.innerHTML += element

        checkDownloadedImages()
    }
    console.log(files)
    checkDownloadedFiles()
})

formImages.addEventListener('click', function(e) {
    if(!e.target.classList.contains("form-images")) {
        if(e.target.classList.contains("images__delete-btn")) {
            var element = e.target;
        } else if(e.target.classList.contains("images__delete-img")) {
            var element = e.target.parentElement
        } else {
            return
        }

        for(var i in files) {
            if(element.parentElement.dataset.name === files[i].name) {
                files.splice(i, 1)
            }
        }

        element.parentElement.classList.add("opacity-0")

        setTimeout(function() {
            element.parentElement.parentElement.removeChild(element.parentElement);
            checkDownloadedImages()
        }, 200)

        checkDownloadedFiles()
    }
})

formFiles.addEventListener('click', function(e) {
    if(!e.target.classList.contains("form__files")) {
        if(e.target.classList.contains("file__delete-img")) {
            var element = e.target.parentElement
        } else if(e.target.classList.contains("file__delete-btn")) {
            var element = e.target
        } else {
            return
        }

        for(var i in files) {
            if(element.parentElement.dataset.name === files[i].name) {
                files.splice(i, 1)
            }
        }

        element.parentElement.classList.add("opacity-0")

        setTimeout(function(){
            element.parentElement.parentElement.removeChild(element.parentElement)
        }, 300)

        checkDownloadedFiles()
    }
})

document.addEventListener('paste', function(e) {
    var file = e.clipboardData.items[0].getAsFile();

    files.push(file)

    if(file.type.indexOf("image") === 0) {
        var reader = new FileReader();

        reader.readAsDataURL(file)

        reader.addEventListener('load', function() {
            var element = createImagesElement(file.name, reader.result)
            formImages.innerHTML += element;

            console.log(formImages)

            checkDownloadedImages()
        })
    }
    
    checkDownloadedFiles()
})