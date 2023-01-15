let counter = 0;
function changeImage() {
    var images = document.getElementsByClassName("images__img")
    for (let i = 0; i < images.length; i++) {
        if(images[i].style.display != "none") {
            setTimeout(function() {
                images[i].style.opacity = "0";
            }, 200)
            images[i].style.display = "none"; 
        }
    }
    counter++;
    if (counter > images.length) {counter = 1}    

    setTimeout(function() {
        images[counter-1].style.opacity = "1";
    }, 200)
    images[counter-1].style.display = "block";

    setTimeout(changeImage, 7000); // Change image every 2 seconds
}
changeImage()
