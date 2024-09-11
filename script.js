//Slideshow
let slideIndex= 0;
showSlides();



function showSlides(slides) {
//Function for hiding slides
let slides = document.getElementsByClassName("slideNumber"); 


    for (let i = 0; i < slides.length; i++) {
         slides[i].style.display = "none";
    }

//logic to display slides one by one after 2 seconds
    slideIndex++;
    if (slideIndex > slides.length ) { slideIndex=1}
    slides[slideIndex-1].style.display = "block";
    setTimeout(showSlides, 2000);
}