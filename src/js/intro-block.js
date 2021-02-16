// *** Центровщик блока intro__center
function introCenterer() {
    // Центрирование центрального элемента
    function calcBottomForCenteredIntroElement() {
        if (windowChecker.matches) {
            return (
                ($(window).height() -
                    $(".intro__bottom-container").height() -
                    $(".main-header").height() -
                    $(".intro__center").height()) /
                    2 +
                $(".intro__bottom-container").height()
            );
        } else {
            return $(".intro__bottom-container").height() + ($(window).height() * 0.1162)
        }
        
    }
    function setValue() {
        $(".intro__center").css({
            bottom: calcBottomForCenteredIntroElement(),
        });
    }
    $(window).on("resize", function () {
        setValue();
    });
    setValue();
}

// *** Осветление фона и поднятие блока intro__bottom ***
$(window).on("scroll", function () {
    let scrollCoef,
        opacityCoef;
        // Коэффициенты в зависимости от высоты экрана
        if (windowChecker.matches) {
            scrollCoef = $(window).height() * 0.00065;
            opacityCoef = $(".intro__center").height() * 0.0000131;
        } else {
            scrollCoef = $(window).height() * 0.002;
            opacityCoef = $(".intro__center").height() * 0.000035;
        }
    $("#intro__bg").css({
        opacity: 1 - $(window).scrollTop() * opacityCoef,
    });
    $(".intro__center").css({
        opacity: 1 - $(window).scrollTop() * opacityCoef,
    });
    $(".intro__bottom-container").css({
        paddingBottom: $(window).scrollTop() * scrollCoef,
    });
});