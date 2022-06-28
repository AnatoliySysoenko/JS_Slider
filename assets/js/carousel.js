/** @format */

function Carousel(containerID, slideID) {
  this.container = document.querySelector(containerID);
  this.slides = this.container.querySelectorAll(slideID);
}

Carousel.prototype = {
  _initProps() {
    this.currentSlide = 0;
    this.isPlaying = true;
    this.interval = 1000;

    this.SLIDES_LENGTH = this.slides.length;
    this.CODE_LEFT_ARROW = 'ArrowLeft';
    this.CODE_RIGHT_ARROW = 'ArrowRight';
    this.CODE_SPACE = 'Space';
    this.FA_PAUSE = '<i class="fas fa-pause-circle"></i>';
    this.FA_PLAY = '<i class="fas fa-play-circle"></i>';
    this.FA_PREV = '<i class="fas fa-angle-left"></i>';
    this.FA_NEXT = '<i class="fas fa-angle-right"></i>';
  },

  _initControls() {
    const controls = document.createElement('div');
    const PAUSE = `<span class="control control-pause" id="pause">${this.FA_PAUSE}</span>`;
    const PREV = `<span class="control control-prev" id="prev">${this.FA_PREV}</span>`;
    const NEXT = `<span class="control control-next" id="next">${this.FA_NEXT}</span>`;
    controls.setAttribute('class', 'controls');
    controls.innerHTML = PAUSE + PREV + NEXT;
    this.container.append(controls);

    this.pauseBtn = document.querySelector('#pause');
    this.prevBtn = document.querySelector('#prev');
    this.nextBtn = document.querySelector('#next');
  },

  _initIndicators() {
    const indicators = document.createElement('div');
    indicators.setAttribute('class', 'indicators');

    for (let i = 0, n = this.SLIDES_LENGTH; i < n; i++) {
      const indicator = document.createElement('div');

      indicator.setAttribute(
        'class',
        i !== 0 ? 'indicator' : 'indicator active'
      );
      indicator.dataset.slideTo = `${i}`;
      indicators.append(indicator);
    }
    this.container.append(indicators);

    this.indicatorsContainer = this.container.querySelector('.indicators');
    this.indicators = this.container.querySelectorAll('.indicator');
  },

  _initListeners: function () {
    this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
    this.prevBtn.addEventListener('click', this.prev.bind(this));
    this.nextBtn.addEventListener('click', this.next.bind(this));
    this.indicatorsContainer.addEventListener(
      'click',
      this._indicate.bind(this)
    );
    document.addEventListener('keydown', this._pressKey.bind(this));
  },

  _pressKey: function (e) {
    if (e.code === this.CODE_LEFT_ARROW) this.prev();
    if (e.code === this.CODE_RIGHT_ARROW) this.next();
    if (e.code === this.CODE_SPACE) this.pausePlay();
  },

  _tick: function () {
    this.intervalID = setInterval(() => this._gotoNext(), this.interval);
  },

  _gotoNth: function (n) {
    this.slides[this.currentSlide].classList.toggle('active');
    this.indicators[this.currentSlide].classList.toggle('active');
    this.currentSlide = (n + this.SLIDES_LENGTH) % this.SLIDES_LENGTH;
    this.slides[this.currentSlide].classList.toggle('active');
    this.indicators[this.currentSlide].classList.toggle('active');
  },

  _gotoPrev: function () {
    this._gotoNth(this.currentSlide - 1);
  },

  _gotoNext: function () {
    this._gotoNth(this.currentSlide + 1);
  },

  pause: function () {
    clearInterval(this.intervalID);
    this.isPlaying = false;
    this.pauseBtn.innerHTML = this.FA_PLAY;
  },

  play: function () {
    this.isPlaying = true;
    this.pauseBtn.innerHTML = this.FA_PAUSE;
    this._tick();
  },

  _indicate: function (e) {
    const target = e.target;
    if (target && target.classList.contains('indicator')) {
      this._gotoNth(+target.dataset.slideTo);
      this.pause();
    }
  },

  pausePlay: function () {
    this.isPlaying ? this.pause() : this.play();
  },

  prev: function () {
    this._gotoPrev();
    this.pause();
  },

  next: function () {
    this._gotoNext();
    this.pause();
  },

  init: function () {
    this._initProps();
    -this._initControls();
    this._initIndicators();
    this._initListeners();
    this._tick();
  },
};

Carousel.prototype.constructor = Carousel;
