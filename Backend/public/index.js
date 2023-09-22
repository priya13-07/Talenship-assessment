// const slides = document.querySelectorAll('.carousel-slide');
// const slideWidth = slides[0].clientWidth;
// let currentIndex = 0;

// function goToSlide(index) {
//   currentIndex = index;
//   const translateX = -currentIndex * slideWidth;
//   document.querySelector('.carousel-container').style.transform = `translateX(${translateX}px)`;
// }

// function nextSlide() {
//   if (currentIndex < slides.length - 1) {
//     currentIndex++;
//   } else {
//     currentIndex = 0;
//   }
//   goToSlide(currentIndex);
// }

// function prevSlide() {
//   if (currentIndex > 0) {
//     currentIndex--;
//   } else {
//     currentIndex = slides.length - 1;
//   }
//   goToSlide(currentIndex);
// }

// // Auto-cycle the slides every 3 seconds
// setInterval(nextSlide, 3000);

const carousel = document.querySelector('.carousel-content');
const slides = document.querySelectorAll('.carousel-slide');
const register = document.getElementsByClassName('reg')
let currentIndex = 0;

function goToSlide(index) {
  currentIndex = index;
  const translateX = -currentIndex * 100;
  carousel.style.transform = `translateX(${translateX}%)`;
}

function nextSlide() {
  if (currentIndex < slides.length - 1) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  goToSlide(currentIndex);
}

function prevSlide() {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = slides.length - 1;
  }
  goToSlide(currentIndex);
}

// Auto-cycle the slides every 3 seconds
setInterval(nextSlide, 6000);

