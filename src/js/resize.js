window.addEventListener('resize', () => {
    checkHeader();
    if ($(".write-us__custom-scroll")) {
        $(".write-us__custom-scroll").getNiceScroll().resize();
    }
    windowChecker = window.matchMedia('(min-width: 599px)');
})