
if (window.NodeList && !NodeList.prototype.filter) {
    NodeList.prototype.filter = Array.prototype.filter;
}

let emojiDropdownContent = document.querySelector(".comments__emoji-dropdown-content");

let emojiDropdownBtn = document.querySelector(".comments__emoji-btn")

let commentsTextarea = document.querySelector(".comments__textarea")

let poll = document.querySelector(".main-block__poll")

let pollData = []

let pollProgress = 0

let pollProgressText = document.querySelector(".poll__progress-text")

let pollHr = document.querySelector("#poll-hr")

let pollListElements = document.querySelector(".poll__list").childNodes.filter(child => child.nodeName != "#text")

let pollBtn = document.querySelector(".poll__btn")

let emojies = ["😀","😁","😂","🤣","😃","😄","😅","😆","😉","😊","😋","😎","😍","😘","🥰","😗","😙","😚","☺","🙂","🤗","🤩","🤔","🤨","😐","😑","😶","🙄","😏","😣","😥","😮","🤐","😯","😪","😫","🥱","😴","😌","😛"]

function changePoll(pollProgress) {
    try {   
        pollListElements[pollProgress].classList.add("opacity-0")
        pollListElements[pollProgress + 1].classList.remove("d-none")
    
        setTimeout(function() {
            pollListElements[pollProgress].classList.add("d-none")
            pollListElements[pollProgress + 1].classList.remove("opacity-0")
        }, 0)
    } catch(error) {}
}

function saveData(pollProgress) {
    pollElementActiveChildren = pollListElements[pollProgress].querySelectorAll('input');

    pollValues = []

    pollElementActiveChildren.forEach(element => {
        switch(true) {
            case(element.checked) : pollValues.push(true); break;
            default : pollValues.push(false)
        }
    })

    pollData.push(pollValues)
}

emojies.forEach(emoji => {
    emojiDropdownContent.innerHTML += `<div class="btn emoji-select-btn">${emoji}</div>`
})
let emojiDropdownBtns = document.querySelectorAll(".emoji-select-btn")


emojiDropdownBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        commentsTextarea.value +=  e.target.innerHTML
    })
})

emojiDropdownBtn.addEventListener('click', function() {
    if(emojiDropdownContent.classList.contains("d-none")) {
        emojiDropdownContent.classList.remove("d-none")

        setTimeout(function() {
            emojiDropdownContent.classList.remove("opacity-0")
        }, 0)
    } else {
        emojiDropdownContent.classList.add("opacity-0")

        setTimeout(function() {
            emojiDropdownContent.classList.add("d-none")
        }, 300)
    }
})

pollProgressText.innerHTML = `Вопрос ${pollProgress + 1} из ${pollListElements.length}`

pollBtn.addEventListener('click', function(e) {
    saveData(pollProgress)

    changePoll(pollProgress)

    if(!pollProgress < pollListElements.length - 2) {
        e.target.innerHTML = 'Завершить'

        e.target.addEventListener('click', function() {

            poll.classList.add("opacity-0")
            pollHr.classList.add("opacity-0")

            setTimeout(function() {
                poll.classList.add("d-none")
                pollHr.classList.add("d-none")
            }, 300)
        })
    }


    pollProgress++;
})