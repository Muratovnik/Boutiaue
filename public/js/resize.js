"use strict";

window.addEventListener('resize', function () {
  checkHeader();

  if ($(".write-us__custom-scroll")) {
    $(".write-us__custom-scroll").getNiceScroll().resize();
  }

  windowChecker = window.matchMedia('(min-width: 599px)');
});