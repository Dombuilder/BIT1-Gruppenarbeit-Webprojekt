let slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  const slides = document.querySelectorAll(".PlanetSlides");

  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}

  slides.forEach(slide => {
    slide.style.display = "none";
  });

  slides[slideIndex - 1].style.display = "block";
}