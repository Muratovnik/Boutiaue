"use strict";

var windowChecker = window.matchMedia("(min-width: 599px)"); // *** IE 11 Отключение рваного скролла *** //

if (navigator.userAgent.match(/Trident\/7\./)) {
  $('body').on("mousewheel", function () {
    // remove default behavior
    event.preventDefault(); //scroll without smoothing

    var wheelDelta = event.wheelDelta;
    var currentScrollPosition = window.pageYOffset;
    window.scrollTo(0, currentScrollPosition - wheelDelta);
  });
}