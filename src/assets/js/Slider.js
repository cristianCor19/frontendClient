var currentSlideId = 1;

const sliderElement = document.getElementById('slider');
const totalSlides = sliderElement.childElementCount;
console.log(totalSlides);

function prev(){
    if(totalSlides < currentSlideId){
        currentSlideId++
        showSlide()
    }
}

function next(){
    if(currentSlideId > 1){
        currentSlideId--
        showSlide()
    }
}


function showSlide(){
    var slides = document.getElementById('slider').getElementsByTagName('li'); 
    for(let i = 0; i < totalSlides; i++){
        const element = slides[i]
        if(currentSlideId=== i+1){
            element.classList.remove('hidden')
        }{
            element.classList.add('hidden')
        }
    }
}