var swiperTours = new Swiper('.tours .swiper-container', {
  slidesPerView: 'auto',
  freeMode: true,
  navigation: {
    nextEl: '.tours .swiper-button-next',
    prevEl: '.tours .swiper-button-prev',
  },
  pagination: {
    el: '.tours .swiper-pagination',
    clickable: true,
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

          events.on('tourSlideClicked', function(index){
              if (this.activeIndex !== index ) {
                  this.slideTo(index);
              }
          }.bind(this));
      },

      slideChange: function () {
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
        this.$toursContents = $('.js-tours-tab-content'),
        this.$tutorsContents = $('.js-tutors-content')
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

    showTutorsContent(index) {
        this.$tutorsContents.each( function (index, element) {
            $(element).removeClass('tutors__list--active');
        })
        this.$tutorsContents.eq(index).addClass('tutors__list--active')
    },

    setTab(index) {
        this.makeTabActive(index);
        this.showContent(index);
        this.showTutorsContent(index);
        this.index = index;
    },

    bindEvents() {
        events.on('tourSlideChanged', function(index){
            if (this.index !== index) {
                this.setTab(index);

            };
            var $firstTab = $(".js-tours-tabs").parent().find(".js-tours-tab:first-child");
            var childPos =  $(".js-tours-tabs .current").offset();
            var parentPos =  $(".js-tours-tabs").offset();
            var offsetFirstTab = $firstTab.offset();
            var previouslyScrolled = offsetFirstTab.left - parentPos.left;
            var childOffsetLeft = childPos.left - parentPos.left - previouslyScrolled;

            $(".js-tours-tabs .simplebar-content").animate({
              scrollLeft: childOffsetLeft
            }, {
              duration: 500,
              easing: "swing",
            });

        }.bind(this));


        events.on('tourButtonClicked', function(index){
            if (this.index !== index) {
                this.setTab(index);
            }
        }.bind(this));

        events.on('tourSlideClicked', function(index){
            if (this.index !== index) {
                this.setTab(index);
            }
            blockScroll();
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
      this.$toursItems = $('.js-tours-item')
    },

    bindEvents() {
        this.$toursItems = $('.js-tours-item').on('click',function (e) {
            // console.log('click');
        });

        this.$toursBtns.on('click',function (e) {
            this.index = $(e.currentTarget).closest('.js-tours-item').index();

            events.emit('tourButtonClicked', this.index);

        }.bind(this));
    }
}

var toursSlide = {
    init() {
        this.cacheDom();
        this.bindEvents();
    },

    cacheDom() {
      this.$toursSlides = $('.js-tours-item-wrapper')
      this.$toursItems = $('.js-tours-item')
    },

    bindEvents() {
        this.$toursItems = $('.js-tours-item').on('click',function (e) {
            console.log('click');
        });

        this.$toursSlides.on('click',function (e) {
            this.index = $(e.currentTarget).closest('.js-tours-item').index();

            events.emit('tourSlideClicked', this.index);
        }.bind(this));
    }
}


var tabsDays = document.querySelectorAll('.program__days-tabs-slide')
Array.from(tabsDays).forEach(function(link) {
  link.addEventListener('click', function(){
    var tab_id = this.getAttribute('data-tab');

    var activeTab = this.parentNode.parentNode.parentNode.parentNode.querySelector('.program__days-tabs-slide--current');
    activeTab.classList.remove('program__days-tabs-slide--current');
    var activeSlide = this.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('.program__days-content-slide--current');
    activeSlide.classList.remove('program__days-content-slide--current');

    this.classList.add('program__days-tabs-slide--current');
    document.querySelector("#"+tab_id).classList.add('program__days-content-slide--current');
  });
});
function blockScroll() {
  $(".js-program-days-tab").on('click',function (e) {
    var $firstTab = $(this).parent().find(".js-program-days-tab:first-child");
    var childPos =  $(this).offset();
    var parentPos =  $(this).parent().offset();
    var offsetFirstTab = $firstTab.offset();
    var previouslyScrolled = offsetFirstTab.left - parentPos.left;
    var childOffsetLeft = childPos.left - parentPos.left - previouslyScrolled;

    $(".js-program-days-tabs .simplebar-content").animate({
      scrollLeft: childOffsetLeft
    }, {
      duration: 500,
      easing: "swing",
        // complete: function () {
        //     console.log(childOffsetLeft);
        // }.bind(this)
    });
  });
};
function blockTourScroll() {
  $(".js-tours-tab").on('click',function (e) {
    var $firstTab = $(this).parent().find(".js-tours-tab:first-child");
    var childPos =  $(this).offset();
    var parentPos =  $(this).parent().offset();
    var offsetFirstTab = $firstTab.offset();
    var previouslyScrolled = offsetFirstTab.left - parentPos.left;
    var childOffsetLeft = childPos.left - parentPos.left - previouslyScrolled;

    $(".js-tours-tabs .simplebar-content").animate({
      scrollLeft: childOffsetLeft
    }, {
      duration: 500,
      easing: "swing",
        // complete: function () {
        //     console.log(childOffsetLeft);
        // }.bind(this)
    });
  });
};
blockTourScroll();
blockScroll();

toursTabs.init();
tours.init();
toursSlide.init();
