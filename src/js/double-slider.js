var swiperTours = new Swiper('.tours .swiper-container', {
  spaceBetween: 40,
  slidesPerView: 'auto',
  slideToClickedSlide: true,
  pagination: {
    el: '.tours .swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    480: {
      spaceBetween: 10,
    },
    780: {
      spaceBetween: 16,
    }
  }
});

var tabTourButtons = new Swiper('.topic-program__tabs', {
  slidesPerView: 'auto',
  slideToClickedSlide: true,
});

tabTourButtons.controller.control = swiperTours;
swiperTours.controller.control = tabTourButtons;

var tabsProgram = document.querySelectorAll('.topic-program__tabs .swiper-slide')
Array.from(tabsProgram).forEach(link => {
  link.addEventListener('click', function(){
    var tab_id = this.getAttribute('data-tab');

    document.querySelector('.topic-program__tabs .swiper-slide.current').classList.remove('current');
    document.querySelector('.topic-program__content .swiper-slide.current').classList.remove('current');

    this.classList.add('current');
    document.querySelector("#"+tab_id).classList.add('current');
  });
});


// инициализация слайдера с табами дней в каждом туре
var tabDaysButtons = new Swiper('.program__days-tabs', {
  slidesPerView: 'auto',
  slideToClickedSlide: true,
  freeModeSticky: true,
  slideClass: 'program__days-tabs-slide',
});

// переключение по табам дней в каждом туре
var tabsDays = document.querySelectorAll('.program__days-tabs-slide')
Array.from(tabsDays).forEach(link => {
  link.addEventListener('click', function(){
    var tab_id = this.getAttribute('data-tab');

    var activeTab = this.parentNode.querySelector('.program__days-tabs-slide--current');
    activeTab.classList.remove('program__days-tabs-slide--current');
    var activeSlide = this.parentNode.parentNode.parentNode.querySelector('.program__days-content-slide--current');
    activeSlide.classList.remove('program__days-content-slide--current');

    this.classList.add('program__days-tabs-slide--current');
    document.querySelector("#"+tab_id).classList.add('program__days-content-slide--current');
  });
});

//Инициализация слайдеров с описанием дней для каждого тура
var slidertabsDays = document.querySelectorAll(".program__days-tabs");
slidertabsDays.forEach (function(index, element){
  var $this = this;
  var swiper = new Swiper($this,{
    slidesPerView: 'auto',
    slideToClickedSlide: true,
    freeModeSticky: true,
    slideClass: 'program__days-tabs-slide',
  });
});
