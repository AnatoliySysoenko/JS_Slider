/** @format */

(function () {
  const carousel = document.querySelector('#carousel');
  const slides = carousel.querySelectorAll('.slide');
  const indicatorsContainer = carousel.querySelector('.indicators');
  const indicators = indicatorsContainer.querySelectorAll('.indicator');
  const puaseBtn = document.querySelector('#pause');
  const prevBtn = document.querySelector('#prev');
  const nextBtn = document.querySelector('#next');

  let currentSlide = 0;
  let isPlaying = true;
  let intervalID = null;
  let interval = 2000;
  let swipeStartX = null;
  let swipeEndX = null;

  const CODE_LEFT_ARROW = 'ArrowLeft';
  const CODE_RIGHT_ARROW = 'ArrowRight';
  const CODE_SPACE = 'Space';

  const SLIDES_LENGTH = slides.length;

  function gotoNth(n) {
    slides[currentSlide].classList.toggle('active');
    indicators[currentSlide].classList.toggle('active');
    currentSlide = (n + SLIDES_LENGTH) % SLIDES_LENGTH;
    slides[currentSlide].classList.toggle('active');
    indicators[currentSlide].classList.toggle('active');
  }

  function gotoPrev() {
    gotoNth(currentSlide - 1);
  }

  function gotoNext() {
    gotoNth(currentSlide + 1);
  }

  function pause() {
    clearInterval(intervalID);
    isPlaying = false;
    puaseBtn.innerHTML = 'Play';
  }

  function play() {
    intervalID = setInterval(gotoNext, interval);
    isPlaying = true;
    puaseBtn.innerHTML = 'Pause';
  }

  const pausePlay = () => (isPlaying ? pause() : play());

  function prev() {
    gotoPrev();
    pause();
  }

  function next() {
    gotoNext();
    pause();
  }

  function indicate(e) {
    const target = e.target;
    if (target && target.classList.contains('indicator')) {
      gotoNth(+target.getAttribute('data-slide-to'));
      pause();
    }
  }

  function pressKey(e) {
    if (e.code === CODE_LEFT_ARROW) prev();
    if (e.code === CODE_RIGHT_ARROW) next();
    if (e.code === CODE_SPACE) pausePlay();
  }

  function swipeStart(e) {
    swipeStartX = e.changedTouches[0].pageX;
  }
  function swipeEnd(e) {
    swipeEndX = e.changedTouches[0].pageX;

    swipeStartX - swipeEndX < -50 && prev();
    swipeStartX - swipeEndX > 50 && next();
  }

  function initListeners() {
    puaseBtn.addEventListener('click', pausePlay);
    prevBtn.addEventListener('click', prev);
    nextBtn.addEventListener('click', next);
    indicatorsContainer.addEventListener('click', indicate);
    carousel.addEventListener('touchstart', swipeStart);
    carousel.addEventListener('touchend', swipeEnd);
    document.addEventListener('keydown', pressKey);
  }

  function init() {
    initListeners();
    intervalID = setInterval(gotoNext, interval);
  }

  init();
})();
