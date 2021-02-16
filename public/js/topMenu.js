"use strict";

function initMenu() {
  // *** Переключатель на мобильной версии ***
  // Открыть меню
  var menuToggle = document.querySelector(".main-header__menu-toggle");
  var mainNavMenu = document.querySelector(".main-header__nav");
  var mainHeader = document.querySelector(".main-header");
  var menuToggleFuse = true;
  menuToggle.addEventListener("click", function (e) {
    var duration = 500;

    if (menuToggleFuse) {
      menuToggleFuse = false;

      if (mainHeader.classList.contains("main-header--active")) {
        slideToggle(mainNavMenu, duration);
        this.classList.toggle("main-header__menu-toggle--active");
        setTimeout(function () {
          mainHeader.classList.toggle("main-header--active");
          document.body.style.overflowY = 'auto';
        }, duration * 0.7);
      } else {
        this.classList.toggle("main-header__menu-toggle--active");
        mainHeader.classList.toggle("main-header--active");
        setTimeout(function () {
          slideToggle(mainNavMenu, duration);
          document.body.style.overflowY = 'hidden';
        }, duration * 0.7);
      }

      setTimeout(function () {
        menuToggleFuse = true;
      }, duration * 1.5);
    }
  }); // *** Выпадающие списки ***

  var headerMenuListItem = document.querySelectorAll(".main-header__goods-list-wrap > .main-header__nav-item");
  var headerMenuLinks = document.querySelectorAll(".main-header__goods-list-wrap .main-header__nav-link");
  var dropdownBg = document.querySelector(".main-header__dropdown");
  var innerLists = document.querySelectorAll(".inner-lists"); // Предохранитель повторного срабатывания

  var fuse = true;
  var fuseTime = 150;

  var _loop = function _loop(i) {
    headerMenuLinks[i].addEventListener("mouseover", function (e) {
      e.stopPropagation();
      showMenu(e.target, i);
    });
  };

  for (var i = 0; i < Array.from(headerMenuLinks).length; i++) {
    _loop(i);
  }

  if (!windowChecker.matches) {
    var _loop2 = function _loop2(_i) {
      headerMenuLinks[_i].addEventListener("click", function (e) {
        e.stopPropagation();
        showMenu(e.target, _i);
      });
    };

    for (var _i = 0; _i < Array.from(headerMenuLinks).length; _i++) {
      _loop2(_i);
    }
  } // Классы


  var itemClass = "main-header__nav-item";
  var linkClass = "main-header__nav-link";
  var dropDownClass = "main-header__dropdown";
  var currentListItem = null;
  var currentList = null;

  function removeActiveClass(elem, className) {
    elem.classList.remove("".concat(className, "--active"));
  } // Удаление фона для меню


  function removeDropBg(dropDownClass) {
    if (dropdownBg.classList.contains("".concat(dropDownClass, "--active"))) {
      dropdownBg.style.top = "-20vh";
      setTimeout(function () {
        removeActiveClass(dropdownBg, dropDownClass);
        dropdownBg.style.top = "";
      }, fuseTime);
    }
  }

  function timeout(duration) {
    // Таймаут на повторное срабатывание
    setTimeout(function () {
      fuse = true;
    }, duration);
  }

  function showMenu(currentLink, i) {
    if (fuse && currentLink.classList.contains('main-header__nav-link')) {
      // ---------------
      //      Чистка
      // ---------------
      // Чистка классов
      var cleaner = function cleaner(item, currentElem, elemClass) {
        Array.from(item).forEach(function (elem) {
          if (elem != currentElem && elem.classList.contains("".concat(elemClass, "--active"))) {
            removeActiveClass(elem, elemClass);
          }
        });
      }; // Чистка классов других ссылок


      // Сокрытие всего
      var remover = function remover() {
        slideUp(currentList, fuseTime);
        removeDropBg(dropDownClass);
        removeActiveClass(currentListItem, itemClass);
        removeActiveClass(currentLink, linkClass);
      }; // ---------------
      //      Показ
      // ---------------
      // Смена класса таргет ссылки


      // Запрещаем клик на время выполнения скрипта
      fuse = false;
      currentListItem = currentLink.parentElement;
      currentList = innerLists[i];
      cleaner(headerMenuLinks, currentLink, linkClass); // Чистка ромбов ромбы у других пунктов меню

      cleaner(headerMenuListItem, currentListItem, itemClass); // Скрывает другие списки

      Array.from(innerLists).forEach(function (item) {
        if (item != currentList) {
          slideUp(item, fuseTime);
        }
      });
      currentLink.classList.add("main-header__nav-link--active"); // Смена класса элемента списка

      currentListItem.classList.add("main-header__nav-item--active"); // Показ бэкграунда

      dropdownBg.classList.add("main-header__dropdown--active"); // Показ списка. При повторном клике - скрывает

      if (getComputedStyle(currentList).display == "none") {
        slideDown(currentList);
      } else if (!windowChecker.matches) {
        slideUp(currentList);
        currentLink.classList.remove("main-header__nav-link--active");
        currentListItem.classList.remove("main-header__nav-item--active");
      } // Закрытие по esc


      window.addEventListener("keydown", function (evt) {
        var keyCode = evt.keyCode;

        if (keyCode === 27 && fuse) {
          evt.preventDefault();
          remover();
        }
      });
      document.addEventListener("click", function (e) {
        e.stopPropagation();

        if (!currentListItem.contains(e.target) && fuse) {
          remover();
        }
      });
      timeout(fuseTime + 200);
    }
  }
} // *** Прослушка размера экрана и изменение свойвств ***


function checkHeader() {
  var mainHeader = document.querySelector('.main-header');
  var mainHeaderNav = document.querySelector('.main-header__nav');
  var menuToggle = document.querySelector(".main-header__menu-toggle");

  if (windowChecker.matches && mainHeader.classList.contains('main-header--active')) {
    mainHeader.classList.toggle('main-header--active');
  }

  if (windowChecker.matches && mainHeaderNav.style.display == 'none') {
    mainHeaderNav.removeAttribute('style');
  }

  if (!windowChecker.matches && !mainHeader.classList.contains('main-header--active') && mainHeaderNav.style.display == 'block') {
    mainHeaderNav.removeAttribute('style');

    if (menuToggle.classList.contains('main-header__menu-toggle--active')) {
      menuToggle.classList.toggle('main-header__menu-toggle--active');
    }
  }
}

$(window).on("scroll", function () {
  // Коэффициенты, зависящие от высоты экрана
  var scrollCoef, opacityCoef;

  if (windowChecker.matches) {
    scrollCoef = $(window).height() * 0.00065;
    opacityCoef = $(".intro__center").height() * 0.0000131;
  } else {
    scrollCoef = $(window).height() * 0.002;
    opacityCoef = $(".intro__center").height() * 0.000035;
  }

  $("#intro__bg").css({
    opacity: 1 - $(window).scrollTop() * opacityCoef
  });
  $(".intro__center").css({
    opacity: 1 - $(window).scrollTop() * opacityCoef
  });
  $(".intro__bottom-container").css({
    paddingBottom: $(window).scrollTop() * scrollCoef
  });
});