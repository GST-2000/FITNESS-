// Global variables
var slideIndex = 0; // To keep track of the current slide
var slides = document.getElementsByClassName("slide");
var dots = document.getElementsByClassName("dot");
var slideInterval; // For setting the interval

// Function to show a specific slide
function currentSlide(n) {
    // Reset the index if it's outside the range of available slides
    if (n >= slides.length) { slideIndex = 0; }
    if (n < 0) { slideIndex = slides.length - 1; }

    // Hide all slides and deactivate all dots
    for (var i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
        dots[i].classList.remove('active');
    }

    // Show the active slide and highlight the active dot
    slides[slideIndex].classList.add('active');
    dots[slideIndex].classList.add('active');
}

// Function to toggle the display of the lists
function toggleList(listId) {
    var list = document.getElementById(listId);
    list.classList.toggle('hidden');
}

// Function to move to the next slide
function nextSlide() {
    slideIndex++;
    currentSlide(slideIndex);
}

// Function to start the slide show
function startSlideShow() {
    slideInterval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
}

// Function to stop the slide show
function stopSlideShow() {
    clearInterval(slideInterval);
}

// Initialize the slide show
startSlideShow();

// Optional: Stop the slideshow when the user hovers over a slide
for (var i = 0; i < slides.length; i++) {
    slides[i].addEventListener('mouseover', stopSlideShow);
    slides[i].addEventListener('mouseout', startSlideShow);
}

// Initialize the first slide as active
currentSlide(slideIndex);