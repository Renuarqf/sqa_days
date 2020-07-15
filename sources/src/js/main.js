"use strict";
var mobile = false,
    desktop = true,
    constWindowScrollTop = 0,
    windowScrollTop = 0,
    windowWidth = 1024,
    windowHeight = 900,
    stopHeaderChangesOnScroll = false;

$(document).ready(function () {

  mobile = isMobile();
  desktop = (isMobile() || isTablet()) ? false : true;
  windowWidth = $(window).width();
  windowHeight = $(window).height();

  if (desktop) $('html').addClass('desktop');

  windowScrollTop = $(document).scrollTop();

  $('.js__interactive').on('click', function (e) {
    let ths = $(this);
    let thsAttr;
    if (ths[0].type === 'button') {
      thsAttr = ths.attr('data-action');
    }
    else {
      thsAttr = ths.attr('href').split('#')[1];
    }
    switch (thsAttr) {
      case 'place':
        openAside(thsAttr);
        break;
      case 'visa':
        openAside(thsAttr);
        break;
      case 'close-aside':
        closeAllAside();
        break;
      case 'show-notifications':
        toggleNotifications(ths);
        break;
      case 'clear-notifications':
        clearNotifications(ths);
        break;
      case 'hide-cookie':
        hideCookie();
        break;
      default:
        return false;
    }
    e.preventDefault();
  });
  mainSpeakers();
  menuFunctions();
  headerFunctions();
  homeScrollAnimation();
  toggleFunctions();
  ticketsFunctions();
  faqFunctions();
  programFunction();
  hoverElems();
  selectDatesFunctions();
  registerFunctions();
  customSelect();
  checkboxFunc();
  radioFunc();
  inputFunctions();
  contactsFunctions();
  organizersFunctions();
  reportsFunctions();
  participantsFunctions();
  mediaFunctions();
});

$(window).on('resize', function () {
  windowWidth = $(window).width();
  windowHeight = $(window).height();
});

function headerFunctions() {
  var darkSections = $('.layout').find('.dark-section');
  var header = $('.header');
  var headerH = header.outerHeight();


  function repeatOften() {
    if (!stopHeaderChangesOnScroll) {
      setHeadeModeOnScroll();
    }
    requestAnimationFrame(repeatOften);
  }
  requestAnimationFrame(repeatOften);
  function setHeadeModeOnScroll() {
    windowScrollTop = $(document).scrollTop();

    let whiteModeOn = false;

    darkSections.each(function () {
      let thsOffTop = $(this)[0].offsetTop;
      let thsHeight = $(this)[0].offsetHeight;

      if (windowScrollTop === 0) {
        header.addClass('transparent-mode');
      } else {
        header.removeClass('transparent-mode');
      }
      if (windowScrollTop >= thsOffTop && windowScrollTop + headerH <= thsOffTop + thsHeight) {
        whiteModeOn = true;
        return false
      }
    });
    if (whiteModeOn) {
      if (!header.hasClass('white-mode')) {
        header.addClass('white-mode');
      }
    } else {
      if (header.hasClass('white-mode')) {
        header.removeClass('white-mode');
      }
    }
  }
}

function menuFunctions() {
  $('.menu__toggle').on('click', function (e) {
    let ths = $(this);
    let header = $('.header');
    let menu = $('.header__menu');
    let menuBg = $('.header__menu-bg');

    if (!ths.hasClass('active')) {
      ths.addClass('active');
      header.addClass('menu-mode');
      disableScroll();
    } else {
      ths.removeClass('active');
      header.removeClass('menu-mode');
      enableScroll();
    }
    e.preventDefault();
  });

  $('.aside-menu__toggle').on('click', function (e) {
    let ths = $(this);
    let header = $('.header');

    if (!ths.hasClass('active')) {
      ths.addClass('active');
      header.addClass('menu-aside-mode');
    } else {
      ths.removeClass('active');
      header.removeClass('menu-aside-mode');
    }
    e.preventDefault();
  });
  $('.hs-block__toggle').on('click', function (e) {
    let ths = $(this);
    let searchBlock = ths.closest('.hs-block');
    if (!searchBlock.hasClass('activated')) {
      searchBlock.addClass('activated');
      searchBlock.find('.hs-block__input').focus();
    }
    e.preventDefault();
  });
  $('.hs-block__input').on('blur', function (e) {
    let ths = $(this);
    let thsValue = ths.val();
    if (thsValue === '') {
      let searchBlock = ths.closest('.hs-block');
      searchBlock.removeClass('activated');
    }
  });
  $('.hs-block__input').on('focus', function (e) {
    $('.header-lang').removeClass('view-mode');
  });
  $('.menu__title').on('click', function (e) {
    let ths = $(this);
    let menu = ths.closest('.footer__menu').find('.menu__list');
    if ($(window).width() < 768) {
      if (!ths.hasClass('active')) {
        ths.addClass('active');
        menu.slideDown(300);
      } else {
        ths.removeClass('active');
        menu.slideUp(300);
      }
    }
    e.preventDefault();
  });
  $('.lang-menu__toggle').on('click', function (e) {
    let ths = $(this);
    let wrap = ths.closest('.header-lang');
    if (!wrap.hasClass('view-mode')) {
      wrap.addClass('view-mode');
    }
    e.preventDefault();
  });
}

function openAside(thsAttr) {
  if (!$('.home-aside.opened').length) {
    disableScroll();
  }
  closeAllAside(true);

  $('.home-aside[data-aside='+ thsAttr +']').addClass('opened');


}

function closeAllAside(reopen) {
  $('.home-aside.opened').removeClass('opened');
  if (!reopen) {
    enableScroll();
  }

}

function toggleNotifications(thsElem) {
  let header = $('.header');
  header.removeClass('notification-mode');
  let notificationContent = $('.notification-content');

  if (!thsElem.hasClass('active')) {
    thsElem.addClass('active');
    notificationContent.fadeIn(300)
  } else {
    thsElem.removeClass('active');
    notificationContent.fadeOut(300)
  }

}

function clearNotifications(ths) {
  let notificationContent = ths.closest('.notification-content');
  notificationContent.addClass('empty-state')
}

function mainSpeakers() {
  $('.speaker__view').on('click', function (e) {
    let ths = $(this);
    let thsSpeaker = ths.closest('.speaker');
    let speakerList = thsSpeaker.closest('.main-speakers__list');
    clearViewSpeaker(speakerList.find('.view-speaker'));
    thsSpeaker.addClass('view-speaker').addClass(speakerPosition(thsSpeaker));
    e.preventDefault();
  });


  $('.close-speaker-preview').on('click', function (e) {
    let thsSeaker = $(this).closest('.speaker');
    clearViewSpeaker(thsSeaker);
    e.preventDefault();
  });

  function clearViewSpeaker(elem) {
    elem.addClass('view-speaker-out');
    setTimeout(function () {
      elem.removeClass('view-speaker onLeft onRight onBottom view-speaker-out');
    }, 1000);

  }

  function speakerPosition(speaker) {
    let speakerClass = '';
    let speakersWrap = speaker.closest('.main-speakers__list');
    let wrapWidth = speakersWrap.width();
    let wrapHeight = speakersWrap.height();
    let wrapOffsetTop = speakersWrap.offset().top;
    let thsOffset = speaker.offset();
    let thsWidth = speaker.width();
    let thsHeight = speaker.height();

    if (thsOffset.left <= 5) speakerClass+='onLeft ';
    if (thsOffset.left + thsWidth + 5 >= wrapWidth) speakerClass+='onRight ';
    if (thsOffset.top + thsHeight + 5 >= wrapOffsetTop + wrapHeight - thsHeight) speakerClass+='onBottom ';
    return speakerClass
  }
}

function homeScrollAnimation() {

  var eventsThere = false;
  var videoThere = false;
  var eventsSection = $('.section-other-events');
  var eventsInner = eventsSection.find('.section-other-events__inner');
  var sectionHeight = getSectionEventsHeight();
  setSectionEventsHeight();

  if (eventsSection.length) eventsThere = true;


  function homeRepeater() {
    if (!mobile) {
      eventsAnimation();
      videoAnimation();
    }

    requestAnimationFrame(homeRepeater);
  }
  requestAnimationFrame(homeRepeater);

  function eventsAnimation() {
    if (!eventsThere) return false;
    windowScrollTop = $(document).scrollTop();

    if (windowScrollTop + windowHeight  > eventsSection.offset().top + sectionHeight) {
      eventsSection.addClass('unstick')
    } else {
      eventsSection.removeClass('unstick')
    }
  }
  function getSectionEventsHeight() {
    return eventsInner.outerHeight();
  }
  function setSectionEventsHeight() {
    eventsSection.css('min-height', sectionHeight);
  }

  $(window).on('resize', function () {
    sectionHeight = getSectionEventsHeight();
    setSectionEventsHeight();
    initVideoHome();
  });

  var videoObj = {};
  var videoSelf = $('.video-self');
  var videoBLock = $('.video-block');
  var videoSection = $('.section-about');

  if (videoBLock.length) videoThere = true;

  initVideoHome();

  function videoAnimation() {
    if (!videoThere) return false;
    if (videoObj.vidOfftop + videoObj.vidH/2 < windowScrollTop + windowHeight/2) {
      videoBLock.addClass('activate-video');
      playVideo();
    } else {
      videoBLock.removeClass('activate-video');
      pauseVideo();
    }
    if (windowScrollTop > videoObj.sectionH + videoObj.sectionOffTop) {
      pauseVideo();
      videoBLock.addClass('pause-video');
    } else {
      videoBLock.removeClass('pause-video');
    }
  }

  function playVideo() {
    videoSelf[0].play();
  }
  function pauseVideo() {
    videoSelf[0].pause();
  }
  function initVideoHome() {
    if (!videoThere) return false;
    let videoHome = $('.video-home');
    let vidW = videoBLock.width();
    let vidH = videoBLock.height();
    let vidOfftop = videoBLock.offset().top;
    let sectionH = videoSection.outerHeight();
    let sectionOffTop = videoSection.offset().top;

    videoObj.vidW = vidW;
    videoObj.vidH = vidH;
    videoObj.vidOfftop = vidOfftop;
    videoObj.sectionH = sectionH;
    videoObj.sectionOffTop = sectionOffTop;
    videoHome.css({'width':videoObj.vidW, 'height':videoObj.vidH});
  }
}

function toggleFunctions() {
  $('.toggle-block__link').on('click', function (e) {
    let ths = $(this);
    let thsBody = ths.next('.toggle-block__body');
    let thsBlock = ths.closest('.toggle-block');


    if (!ths.hasClass('active')) {
      ths.addClass('active');
      thsBlock.addClass('active');
      thsBody.slideDown(300);
    } else {
      ths.removeClass('active');
      thsBlock.removeClass('active');
      thsBody.slideUp(300);
    }
    e.preventDefault();
  });
}

function ticketsFunctions() {
  $('.js__change-ticket-tab').on('click', function (e) {
    let ths = $(this);
    let wrap = ths.closest('ul');
    if (!ths.hasClass('active')) {
      wrap.find('.active').removeClass('active');
      ths.addClass('active');
    }
    e.preventDefault();
  });
}

function faqFunctions() {
  $('.faq-category-link').on('click', function (e) {
    let ths = $(this);
    let thsAttr = ths.attr('data-faq');
    let mainWrap = ths.closest('.faq-block');
    let tabWrap = mainWrap.find('.faq-block__body');
    let categoryBlock = tabWrap.find('.faq-tab[data-faq='+thsAttr+']');

    if (ths.hasClass('active') && windowWidth > 1023) {
      return false
    }
    mainWrap.find('.faq-category-link.active').removeClass('active');
    tabWrap.find('.faq-tab').hide();
    tabWrap.addClass('mobile-visible');
    categoryBlock.fadeIn(300);
    ths.addClass('active');
    disableScroll();
    e.preventDefault();
  });

  $('.faq-back').on('click', function (e) {
    let ths = $(this);
    let tabWrap = ths.closest('.faq-block__body');
    tabWrap.removeClass('mobile-visible');
    enableScroll();
    e.preventDefault();
  });
}

function contactsFunctions() {
  $('.contacts-category-link').on('click', function (e) {
    let ths = $(this);
    let thsAttr = ths.attr('data-contacts');
    let mainWrap = ths.closest('.contacts-block');
    let tabWrap = mainWrap.find('.contacts-block__body');
    let categoryBlock = tabWrap.find('.contacts-tab[data-contacts='+thsAttr+']');

    if (ths.hasClass('active') && windowWidth > 1023) {
      return false
    }
    mainWrap.find('.contacts-category-link.active').removeClass('active');
    tabWrap.find('.contacts-tab').hide();
    categoryBlock.fadeIn(300);
    ths.addClass('active');
    e.preventDefault();
  });

  $('.toggle-contact__link').on('click', function (e) {
    let ths = $(this);
    let thsBody = ths.next('.toggle-contact__body');

    if (windowWidth < 1024) return false
    if (!ths.hasClass('active')) {
      ths.addClass('active');
      thsBody.slideDown(300);
    } else {
      ths.removeClass('active');
      thsBody.slideUp(300);
    }
    e.preventDefault();
  });
  $('.contacts-category-link-mobile').on('click', function (e) {
    let ths = $(this);
    let thsBody = ths.closest('.contacts-tab__head').next('.contacts-tab__body');

    if (!ths.hasClass('active')) {
      ths.addClass('active');
      thsBody.slideDown(300);
    } else {
      ths.removeClass('active');
      thsBody.slideUp(300);
    }
    e.preventDefault();
  });
}

function programFunction() {
  $('.category-slider').slick({
    slide: '.slide-category',
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 6,
    centerMode: true,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 3,
        }
      }
    ]
  });
  $('.es__param-with-tip').on('click', function (e) {
    let ths = $(this);
    if (!desktop) {
      ths.toggleClass('hover');
    }
    e.preventDefault();
  });
  $('.table-toggle-link').on('click', function (e) {
    let ths = $(this);
    let mainTable = ths.closest('.t_table');
    let thsAttr = ths.attr('href').split('#')[1];
    changeTableView(mainTable, thsAttr);
    e.preventDefault();
  });

  $('.event-single').on('click', function (e) {
    let ths = $(this);
    if (windowWidth < 768) {
      let mainTable = ths.closest('.t_table');
      let thsAttr = ths.closest('.t_col').attr('data-filter');
      changeTableView(mainTable, thsAttr);
      scrollToElement(ths);
    }
  });

  function changeTableView(mainTable, thsAttr) {
    mainTable.attr('data-filter', thsAttr);
  }
  function scrollToElement(elem) {
    let headerHeight = $('.header').outerHeight();
    $([document.documentElement, document.body]).animate({
      scrollTop: elem.offset().top - headerHeight
    }, 0);
  }

  $('.js__go-to-next-table').on('click', function (e) {
    let ths = $(this);
    let thsAttr = ths.attr('href').split('#')[1];
    let table = $('.t_table[data-id='+thsAttr+']');

    let headerHeight = $('.header').outerHeight();
    $([document.documentElement, document.body]).animate({
      scrollTop: table.offset().top - headerHeight
    }, 1000);
    e.preventDefault();
  });
}

function hoverElems() {
  $('.btn-buy').on('mouseenter', function () {
    let ths = $(this);
    let thsSection = ths.closest('.banner-section');
    thsSection.addClass('hovered-btn');
  });
  $('.btn-buy').on('mouseleave', function () {
    let ths = $(this);
    let thsSection = ths.closest('.banner-section');
    thsSection.removeClass('hovered-btn');
  });
}

function selectDatesFunctions() {

  var selectDatesBlock = $('.select-dates__block');
  var slidesCont = parseInt($('.slide-single-date.active-date').attr('data-index'), 10);
  var sliderSelect = $('.slider-dates');
  sliderSelect.slick({
    slide: '.slide-single-date',
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    variableWidth: true,
    arrows: false,
    initialSlide: slidesCont,
  });
  sliderSelect.on('afterChange', function(event, slick, currentSlide){
    let dateValue = slick.$list.find('.slick-current').find('.date-value').html();
    $('.hidden-input-select').val(dateValue);
  });
  $('.slide-single-date').on('click', function (e) {
    let ths = $(this);
    let thisIndes = parseInt(ths.attr('data-index'), 10);
    sliderSelect.slick('slickGoTo', thisIndes);
    e.preventDefault();
  });

  $('.js__show-select-dates').on('click', function (e) {
    showSelectDates();
    e.preventDefault();
  });

  $('.js__hide-select-dates').on('click', function (e) {
    hideSelectDates();
    e.preventDefault();
  });

  function showSelectDates() {

    let durationScroll = (windowScrollTop === 0) ? 0 : 300;
    let headingTitle = $('.js__show-select-dates');

    $([document.documentElement, document.body]).animate({
      scrollTop: 0
    }, durationScroll, function () {
      setSelectBgHeight();
      selectDatesBlock.addClass('show');
      disableScroll();
      headingTitle.addClass('active');
    });

  }
  function hideSelectDates() {
    let headingTitle = $('.js__show-select-dates');
    headingTitle.removeClass('active');
    selectDatesBlock.removeClass('show');
    enableScroll();
  }
  function setSelectBgHeight() {
    let sizer = $('.select-date-sizer');

    if (!sizer.length) return false;



    let selectBg = $('.select-dates__block__bg');
    let heading = $('.js__show-select-dates');
    let offTop = heading.offset().top;
    let headingH = heading.outerHeight();
    let selectBgHeight = windowHeight - offTop - headingH - 5;
    selectBg.css('height',  selectBgHeight);
    sizer.css('height',  offTop + headingH);

    //check if selectDates placed in title
    let selectDatesBlock = $('.select-dates__block');
    let selectDatesSlider = $('.slider-dates__wrap');
    if (selectDatesSlider.offset().top < offTop + headingH) {
      selectDatesBlock.addClass('filled')
    } else {
      selectDatesBlock.removeClass('filled')
    }
  }
  $(window).on('resize', function () {
    setSelectBgHeight();
  });
}

function hideCookie() {
  $('.cookie-block').addClass('hide');
}

function inputFunctions() {
  $('input[data-clear]').on('change input text paste', function (e) {
    let ths = $(this);
    let thsLabel = ths.closest('label');
    if (ths.val() != '') {
      thsLabel.addClass('clear-mode');
    } else {
      thsLabel.removeClass('clear-mode');
    }
  });
  $('.clear-control').on('click', function (e) {
    let ths = $(this);
    let thsLabel = ths.closest('label');
    let thsInput = thsLabel.find('input');
    thsLabel.removeClass('clear-mode');
    thsInput.val('')
  });

  $('input[type=tel]').mask('+375(00)000-00-00', {placeholder: "+375(__)___-__-__"});
}

function checkboxFunc() {
  $('input[type=checkbox]').on('change', function (e) {
    let ths = $(this);
    let thsData = ths.data('additionally');
    if (thsData.length) {
      let additBlock = $('.form-additionally[data-additionally='+thsData+']');
      if (ths.is(':checked')) {
        additBlock.addClass('view-all-additionally');
      } else {
        additBlock.removeClass('view-all-additionally');
      }
    }
  });
}

function radioFunc() {
  $('input[type=radio][data-currency]').on('change', function (e) {
    let ths = $(this);
    let thsData = ths.data('currency');
    let mainWrap = $('.pd__currency');
    let tabCurrency = mainWrap.find('.currency-result-tab[data-currency='+thsData+']');

    if (ths.is(':checked')) {
      mainWrap.find('.currency-result-tab:visible').removeClass('active').slideUp(200);
      tabCurrency.addClass('active').slideDown(200);
    }
  });
  $('input[type=radio][data-payment-type]').on('change', function (e) {
    let ths = $(this);
    let thsData = ths.data('payment-type');
    let tabCurrency = $('.payment-method__one[data-payment-type='+thsData+']');

    if (ths.is(':checked')) {
      $('.payment-method__one:visible').removeClass('active').fadeOut(200, function (){
        tabCurrency.addClass('active').fadeIn(300);
      });
    }
  });
  $('input[type=radio][data-notification]').on('change', function (e) {
    let ths = $(this);
    let thsData = ths.data('notification');
    let tabCurrency = $('.notification-option[data-notification='+thsData+']');

    if (ths.is(':checked')) {
      $('.notification-option:visible').removeClass('active').fadeOut(200, function (){
        tabCurrency.addClass('active').fadeIn(300);
      });
    }
  });
}

function registerFunctions() {
  let registerSlider = $('.register-slider');
  if (registerSlider.length) {
    registerSlider.each(function () {
      let $slider = $(this);

      // slick with Mobile First
      $slider.slick({
        slide: '.register-card-slide',
        mobileFirst: true,
        slidesToShow: 1,
        arrows: false,
        dots: true,
        infinite: false,
        responsive: [
          {
            breakpoint: 1023,
            settings: "unslick"
          }
        ]
      });
    });
  }

  // replace for simple scroll
  // let participantSlider = $('.participant-slider');
  // // slick with Mobile First
  // participantSlider.slick({
  //   slide: '.participant-card-slide',
  //   mobileFirst: true,
  //   slidesToShow: 1,
  //   arrows: false,
  //   dots: false,
  //   infinite: false,
  //   responsive: [
  //     {
  //       breakpoint: 767,
  //       settings: {
  //         slidesToShow: 2,
  //         sledesToScroll: 1,
  //       }
  //     },
  //     {
  //       breakpoint: 1023,
  //       settings: "unslick"
  //     }
  //   ]
  // });

  $('.pc__add').on('click', function (e) {
    let ths = $(this);
    let card = ths.closest('.participant-card');
    card.addClass('select-mode');
    e.preventDefault();
  });
  $('.js__remove-participant').on('click', function (e) {
    let ths = $(this);
    let card = ths.closest('.participant-card');
    card.addClass('remove-mode');
    let mobilePopup = $('.mobile-remove-participant-popup');
    if (windowWidth < 768) {
      mobilePopup.fadeIn(300);
    }
    e.preventDefault();
  });
  $('.js__remove-participant-cancel').on('click', function (e) {
    let ths = $(this);
    let card = ths.closest('.participant-card');
    card.removeClass('remove-mode');
    let mobilePopup = $('.mobile-remove-participant-popup');
    if (windowWidth < 768) {
      mobilePopup.fadeOut(300);
    }

    e.preventDefault();
  });

  $('.js__set-part-mode').on('click', function (e) {
    let ths = $(this);
    let card = ths.closest('.participant-card');
    setParticipantEditorMode(card);
    e.preventDefault();
  });
  $('.js__remove-part-mode').on('click', function (e) {
    removeParticipantEditorMode(300);
    e.preventDefault();
  });

  function setParticipantEditorMode(thsCard) {
    $('html').addClass('participant-editor-mode');
    thsCard.addClass('editor-mode');
    if (windowWidth < 768) {
      disableScroll();
    }
  }
  function removeParticipantEditorMode(durationScroll) {
    if (!durationScroll) durationScroll = 0;
    let headerHeight = $('.header').outerHeight();
    let partSlider = $('.participant-slider');

    if (windowWidth < 768) {
      enableScroll();
    }

    $([document.documentElement, document.body]).animate({
      scrollTop: partSlider.offset().top - headerHeight
    }, durationScroll, function () {
      $('html').removeClass('participant-editor-mode');
      let partCard = $('.participant-card');
      partCard.removeClass('editor-mode select-mode');
    });
  }

  $('.m_pay-info__dark').on('click', function (e) {

    // on click need to revert to 3 step
    $(this).closest('.mobile-pay-info').fadeOut(300);
    e.preventDefault();
  });
}

function customSelect() {
  $('.custom-select__head').on('click', function (e) {
    let ths = $(this);
    let customSelect = ths.closest('.custom-select');
    let customList = customSelect.find('.custom-select__body');

    if (!ths.hasClass('active')) {
      closeAllSelects();
      ths.addClass('active');
      customList.fadeIn(300);
    } else {
      ths.removeClass('active');
      customList.fadeOut(200);
    }
    e.preventDefault();
  });

  $('.custom-select__list li').on('click', function (e) {
    let ths = $(this);
    let thsOption = ths.data('option');
    let thsName = ths.children().html();
    let customSelect = ths.closest('.custom-select');
    let customList = ths.closest('.custom-select__body');
    let customInput = customSelect.find('.custom-select__input');
    let customHead = customSelect.find('.custom-select__head');


    customHead.find('.custom-select__name').html(thsName);
    customInput.val(thsOption);
    customHead.removeClass('active');
    customList.fadeOut(200);
    customList.find('.current').removeClass('current');
    ths.addClass('current');
    e.preventDefault();
  });



  $(document).on('click', function (e) {
    if (!$(e.target).closest('.custom-select__main').length) {
      closeAllSelects();
    }
  });

  function closeAllSelects() {
    let customSelect = $('.custom-select');
    customSelect.find('.active').removeClass('active');
    customSelect.find('.custom-select__body').fadeOut(200);
  }
}

function organizersFunctions() {
  $('.close-organizer').on('click', function (e) {
    let ths = $(this);
    ths.closest('.organizer-one').removeClass('hovered');
    enableScroll();
    e.preventDefault();
  });
  $('.organizer-one').on('click', function (e) {
    let ths = $(this);
    if (!$(e.target).closest('.organizer-one__details').length) {
      removeHoveredFromOrganizers();
      ths.addClass('hovered');

      if (windowWidth < 768) {
        disableScroll();
      }
    }
  });

  function removeHoveredFromOrganizers() {
    $('.organizers-list').find('.hovered').removeClass('hovered');
  }
}

function reportsFunctions() {
  $('.js__show-social').on('click', function (e) {
    let ths = $(this);
    let socialList = ths.next('.social-share__wrap');

    socialList.addClass('visible');
    e.preventDefault();
  });
  $('.js__show-social-mobile').on('click', function (e) {
    let ths = $(this);
    let socialShareBlock = ths.next('.social-share');

    socialShareBlock.fadeIn();
    e.preventDefault();
  });
  $('.close-share-mobile').on('click', function (e) {
    let ths = $(this);
    let socialShareBlock = ths.closest('.social-share');

    socialShareBlock.fadeOut();
    e.preventDefault();
  });
  $('.report-filter__toggle').on('click', function (e) {
    let ths = $(this);
    let filterBlock = ths.closest('.report-filter__wrap').find('.report-filter');

    filterBlock.fadeIn();
    e.preventDefault();
  });
  $('.js__close-report-filter').on('click', function (e) {
    let ths = $(this);
    let filterBlock = ths.closest('.report-filter__wrap').find('.report-filter');

    filterBlock.fadeOut();
    e.preventDefault();
  });
}

function participantsFunctions() {
  $('.participant-details__show-more').on('click', function (e) {
    let ths = $(this);
    let textWrap = ths.closest('.participant-details__text');
    textWrap.addClass('show-all');
    e.preventDefault()
  });

  $('.js__add-to-favorite').on('click', function (e) {
    let ths = $(this);
    ths.toggleClass('activated');
    e.preventDefault();
  });
}

function mediaFunctions() {
  var fancySetting = {
    infobar: false,
    hideScrollbar: false,
    preventCaptionOverlap: true,
    mobile: {
      preventCaptionOverlap: true,
    },
    buttons: [
      // "zoom",
      //"share",
      // "slideShow",
      //"fullScreen",
      //"download",
      // "thumbs",
      "close"
    ],
    btnTpl: {
      close:
          '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}">' +
          '<svg class="icon"><use xlink:href="#close-icon"></use></svg>' +
          "</button>",
      arrowLeft:
          '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}">' +
          '<div><svg class="icon"><use xlink:href="#left-arrow"></use></svg></div>' +
          "</button>",

      arrowRight:
          '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}">' +
          '<div><svg class="icon"><use xlink:href="#right-arrow"></use></svg></div>' +
          "</button>",
    },
    baseTpl:
        '<div class="fancybox-container" role="dialog" tabindex="-1">' +
        '<div class="fancybox-bg"></div>' +
        '<div class="fancybox-inner">' +
        '<div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div>' +
        '<div class="fancybox-toolbar">{{buttons}}</div>' +
        '<div class="fancybox-navigation">{{arrows}}</div>' +
        '<div class="fancybox-stage"></div>' +
        '<div class="fancybox-caption"><div class="fancybox-caption__body"></div></div>' +
        '</div>' +
        '</div>',
    beforeShow: function( instance, current ) {
      disableScroll();
    },
    afterClose: function( instance, current ) {
      enableScroll();
    },
    caption : function( instance, item ) {
      return $(this).closest('.media-figure').find('figcaption').html();
    }
  }
  $('[data-fancybox]').fancybox(fancySetting);
}

function disableScroll() {
  stopHeaderChangesOnScroll = true;
  constWindowScrollTop = $(document).scrollTop();

  $('html').addClass('scroll-lock');
  $('.layout').css('margin-top',-constWindowScrollTop);
}

function enableScroll() {
  $('html').removeClass('scroll-lock');

  $('.layout').css('margin-top',0);

  $('html').scrollTop( constWindowScrollTop );
  stopHeaderChangesOnScroll = false;
}

function isMobile() {
  var check = false;
  (function(a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
}

function isTablet() {
  return (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
}
