document.addEventListener('DOMContentLoaded', function(){
  //Прячет меню

  function hideMenu() {
    document.querySelector(".main-nav").classList.add("main-nav--desktop");
  }
  if (window.matchMedia("(min-width: 1280px)").matches) {
    setTimeout(hideMenu, 4000);
  }
  else {
    window.onscroll = function () {
      if (window.scrollY>10) {
        document.querySelector('.page-header__top').classList.add("page-header__top--white");
      } else {
        document.querySelector(".page-header__top").classList.remove("page-header__top--white");
      }
    }
  }

  var mainNav = document.querySelector('html');
  var mainNavBtn = document.querySelector('.main-nav__trigger');


  mainNav.classList.remove('main-nav--no-js');

  // Показывает/скрывает меню
  mainNavBtn.addEventListener('click', function(evt) {
    evt.preventDefault();

    if (mainNav.classList.contains('show-main-nav')) {
      mainNav.classList.remove('show-main-nav');
    } else {
      mainNav.classList.add('show-main-nav');
    }
  });

  var mainNavLinks = document.querySelectorAll('.main-nav a');
  Array.from(mainNavLinks).forEach(link => {
    link.addEventListener('click', function(){
        mainNav.classList.remove('show-main-nav');
    });
  });

  //Попап с формой чтобы присоединиться
  var popupOverlay = document.querySelector('.participate-popup');
  var popupParticipateBlock = document.querySelector('.participate-popup__block');
  var popupParticipate = document.querySelectorAll('.participate__choose-btn');
  var popupParticipateTourBtn = document.querySelectorAll('.program__days-content-participate');
  Array.from(popupParticipate).forEach(link => {
    link.addEventListener('click', function(){
        popupOverlay.classList.add('participate-popup--show');
        document.querySelector('body').classList.add('stop-scrolling');
    });
  });
  Array.from(popupParticipateTourBtn).forEach(link => {
    link.addEventListener('click', function(){
        popupOverlay.classList.add('participate-popup--show');
        document.querySelector('body').classList.add('stop-scrolling');
    });
  });

  document.querySelector('.participate-popup__button-close').addEventListener('click', function(){
    popupOverlay.classList.remove('participate-popup--show');
    document.querySelector('body').classList.remove('stop-scrolling');
  });
  // Доделать клик вне блока
  // popupOverlay.addEventListener('click', function(evt){
  //   evt.preventDefault();
  //   if (evt.target !== popupParticipateBlock) {
  //     popupOverlay.classList.remove('participate-popup--show');
  //     document.querySelector('body').classList.remove('stop-scrolling');
  //   }
  //   else {
  //     return;
  //   }
  // });
  window.addEventListener("keydown", function(e) {
    if (e.keyCode === 27) {
      if (popupOverlay.classList.contains("participate-popup--show")) {
        document.querySelector('body').classList.remove("stop-scrolling");
        popupOverlay.classList.remove("participate-popup--show");
      }
    }
  });

  //Попап свяжитесь со мной
  var popupConnect = document.querySelector('.questions-popup');
  var popupConnectBlock = document.querySelector('.questions-popup__block');
  var popupConnectClick = document.querySelector('.questions__form-link');
  popupConnectClick.addEventListener('click', function(evt){
    evt.preventDefault();
    popupConnect.classList.add('questions-popup--show');
    document.querySelector('body').classList.add('stop-scrolling');
  });
  document.querySelector('.questions-popup__button-close').addEventListener('click', function(){
    popupConnect.classList.remove('questions-popup--show');
    document.querySelector('body').classList.remove('stop-scrolling');
  });
  window.addEventListener("keydown", function(e) {
    if (e.keyCode === 27) {
      if (popupConnect.classList.contains("questions-popup--show")) {
        document.querySelector('body').classList.remove("stop-scrolling");
        popupConnect.classList.remove("questions-popup--show");
      }
    }
  });

  //Слайдер для длока с фотогалереей
  var swiperPhotos = new Swiper('.photos .swiper-container', {
    initialSlide: 5,
    spaceBetween: 0,
    slidesPerView: 'auto',
    pagination: {
      el: '.photos .swiper-pagination',
      dynamicBullets: true,
      clickable: true,
    },
    navigation: {
      nextEl: '.photos .swiper-button-next',
      prevEl: '.photos .swiper-button-prev',
    },
    breakpoints: {
      780: {
        centeredSlides: true,
      }
    },
  });


  //табы для блока с вопросами

  var tabsQuestions = document.querySelectorAll('.questions__tab')
  Array.from(tabsQuestions).forEach(link => {
    link.addEventListener('click', function(){
      var tab_id = this.getAttribute('data-tab');

      var activeTab = this.parentNode.querySelector('.questions__tab--current');
      activeTab.classList.remove('questions__tab--current');
      var activeSlide = this.parentNode.parentNode.querySelector('.questions__block-item--current');
      activeSlide.classList.remove('questions__block-item--current');

      this.classList.add('questions__tab--current');
      document.querySelector("#"+tab_id).classList.add('questions__block-item--current');
    });
  });

  var swiperResults = new Swiper('.results__container', {
    slidesPerView: '4',
    slideToClickedSlide: true,
    spaceBetween: 32,
    navigation: {
      nextEl: '.results .swiper-button-next',
      prevEl: '.results .swiper-button-prev',
    },
    scrollbar: {
      el: '.results .swiper-scrollbar',
      draggable: true,
      dragSize: 8,
    },
    breakpoints: {
      780: {
        slidesPerView: 'auto',
        spaceBetween: 20,
      }
    },
  });





  var popupTutors = document.querySelectorAll('.tutors__item');
  Array.from(popupTutors).forEach(link => {
    link.addEventListener('click', function(){
      var tab_id = this.getAttribute('data-tab');
        document.querySelector('.tutors-popup').classList.add('tutors-popup--show');
        document.querySelector('body').classList.add('stop-scrolling');
        document.querySelector("#"+tab_id).classList.add('tutors-popup__block--current');

    });
  });
  document.querySelector('.tutors-popup__button-close').addEventListener('click', function(){
    document.querySelector('.tutors-popup').classList.remove('tutors-popup--show');
    document.querySelector('body').classList.remove('stop-scrolling');
  });
  window.addEventListener("keydown", function(e) {
    if (e.keyCode === 27) {
      if (document.querySelector('.tutors-popup').classList.contains("tutors-popup--show")) {
        document.querySelector('body').classList.remove("stop-scrolling");
        document.querySelector('.tutors-popup').classList.remove("tutors-popup--show");
      }
    }
  });

  var popupButtonNext = document.querySelector('.tutors-popup__button-next');
  var popupButtonPrev = document.querySelector('.tutors-popup__button-prev');
  var blocks = document.querySelectorAll('.tutors-popup__block');
  i=0;
  if(i<blocks.length){
    popupButtonNext.addEventListener('click', function(){
      popupTutorsItem = document.querySelector('.tutors-popup__block--current');
      popupTutorsItem.classList.remove('tutors-popup__block--current');
      popupTutorsItem.nextElementSibling.classList.add('tutors-popup__block--current');
    });
    popupButtonPrev.addEventListener('click', function(){
      popupTutorsItem = document.querySelector('.tutors-popup__block--current');
      popupTutorsItem.classList.remove('tutors-popup__block--current');
      popupTutorsItem.previousElementSibling.classList.add('tutors-popup__block--current');
    });
  } else {
    return;
  }



  //Попап для отзывов/результатов
  var popupResults = document.querySelectorAll('.results__item');
  Array.from(popupResults).forEach(link => {
    link.addEventListener('click', function(evt){
      evt.preventDefault();
      var tab_id = this.getAttribute('data-tab');
        document.querySelector('.results-popup').classList.add('results-popup--show');
        document.querySelector('body').classList.add('stop-scrolling');
        document.querySelector("#"+tab_id).classList.add('results-popup__block--current');

    });
  });
  document.querySelector('.results-popup__button-close').addEventListener('click', function(){
    document.querySelector('.results-popup').classList.remove('results-popup--show');
    document.querySelector('body').classList.remove('stop-scrolling');
  });
  window.addEventListener("keydown", function(e) {
    if (e.keyCode === 27) {
      if (document.querySelector('.results-popup').classList.contains("results-popup--show")) {
        document.querySelector('body').classList.remove("stop-scrolling");
        document.querySelector('.results-popup').classList.remove("results-popup--show");
      }
    }
  });
  //В форме показать комментарий
  var textareaFieldMain = document.querySelector('.connect__form textarea');
  textareaFieldMain.classList.add('connect__form-textarea--hide');
  document.querySelector('.connect__comment-btn').addEventListener('click', function(){
    this.classList.add('connect__comment-btn--hide');
    textareaFieldMain.classList.remove('connect__form-textarea--hide');
    textareaFieldMain.classList.add('connect__form-textarea--show');
  });
  //В попапе форме показать комментарий
  var textareaFieldPopup = document.querySelector('.questions-popup__form textarea');
  textareaFieldPopup.classList.add('questions-popup__form-textarea--hide');
  document.querySelector('.questions-popup__comment-btn').addEventListener('click', function(){
    this.classList.add('questions-popup__comment-btn--hide');
    textareaFieldPopup.classList.remove('questions-popup__form-textarea--hide');
    textareaFieldPopup.classList.add('questions-popup__form-textarea--show');
  });
  //В попапе заказа показать комментарий
  var textareaFieldParticipate = document.querySelector('.participate-popup__form textarea');
  textareaFieldParticipate.classList.add('participate-popup__form-textarea--hide');
  document.querySelector('.participate-popup__comment-btn').addEventListener('click', function(){
    this.classList.add('participate-popup__comment-btn--hide');
    textareaFieldParticipate.classList.remove('participate-popup__form-textarea--hide');
    textareaFieldParticipate.classList.add('participate-popup__form-textarea--show');
  });



// allowTouchMove: true,let quoteSwiper = new Swiper('.quote-slider');
//
// let imageSwiper = new Swiper('.image-slider', {
//       nextButton: '.swiper-button-next',
//       prevButton: '.swiper-button-prev',
//     });
//
//     quoteSwiper.controller.control = imageSwiper;
//     imageSwiper.controller.control = quoteSwiper;



  //Скролл до формы обратной связи
  // $(function () {
  //   var headerHeight = $('.page-header').outerHeight();
  //
  //   if (window.location.hash) {
  //     scroll(0, 0);
  //     $('html,body').animate({
  //       scrollTop: $(window.location.hash).offset().top - headerHeight
  //     }, 1000);
  //   }
  // });


});
