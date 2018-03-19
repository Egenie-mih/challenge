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
  },

  on: {
      init: function () {
          events.on('tourTabChanged', function(index) {
              if (this.activeIndex !== index || (this.activeIndex === index && this.isEnd)) {
                  this.slideTo(index);
              }
          }.bind(this));

          events.on('tourButtonClicked', function(index){
              if (this.activeIndex !== index ) {
                  this.slideTo(index);
              }
          }.bind(this));
      },

      slideChange: function () {
          events.emit('tourSlideChanged', this.activeIndex);
      },
      click: function () {
          events.emit('tourSlideChanged', this.activeIndex);
      },

      reachEnd: function () {
        // -2 потомучто слайдов сейчас 6. Нумерация индексов идет с 0, это уже -1.
        // И до края мы доходим уже на 5 слайде, соответственно нам нужен 4-й
          events.emit('tourSlideChanged', this.slides.length-2);
        }
  },
});

var toursTabs = {
    index: 0,
    init() {
        this.cacheDom();
        this.bindEvents();
    },

    cacheDom() {
        this.$toursTabs = $('.js-tours-tab'),
        this.$toursContents = $('.js-tours-tab-content')
    },

    makeTabActive(index) {
        this.$toursTabs.each( function (index, element) {
            $(element).removeClass('current');
        })
        this.$toursTabs.eq(index).addClass('current')
    },

    showContent(index) {
        this.$toursContents.each( function (index, element) {
            $(element).hide(0);
        })
        this.$toursContents.eq(index).fadeIn(200)
    },

    setTab(index) {
        this.makeTabActive(index);
        this.showContent(index);
    },

    bindEvents() {
        events.on('tourSlideChanged', function(index){
            if (this.index !== index) {
                this.setTab(index);
            }
        }.bind(this));

        events.on('tourButtonClicked', function(index){
            if (this.index !== index) {
                this.setTab(index);
            }
        }.bind(this));

        this.$toursTabs.on('click',function (e) {
           this.index = $(e.currentTarget).index();

            this.setTab(this.index);

            events.emit('tourTabChanged', this.index);
        }.bind(this));
    }
}

var tours = {
    init() {
        this.cacheDom();
        this.bindEvents();
    },

    cacheDom() {
      this.$toursBtns = $('.js-tour-btn')
    },

    bindEvents() {
        this.$toursBtns.on('click',function (e) {
            this.index = $(e.currentTarget).closest('.js-tours-item').index();

            events.emit('tourButtonClicked', this.index);
        }.bind(this));
    }
}

var tabsDays = document.querySelectorAll('.program__days-tabs-slide')
Array.from(tabsDays).forEach(function(link) {
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

toursTabs.init();
tours.init();
