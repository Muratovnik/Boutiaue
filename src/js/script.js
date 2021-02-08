$(".write-us__custom-scroll").niceScroll({
    cursorcolor: "#F08B98",
    cursorwidth: "4px",
    background: "#FAD8DD",
    cursorborder: "none",
    cursorborderradius: "24px",
    autohidemode: false,
    railoffset: { top: 30 },
    enablekeyboard: true,
    sensitiverail: true,
    truetouch: true,
});

let windowCheker = window.matchMedia("(min-width: 599px)");
let catalog = document.querySelector(".catalog");
let introBottom = document.querySelector(".intro__bottom");
let intro = document.querySelector(".intro");

const catalogMover = () => {
    if (windowCheker.matches) {
        introBottom.append(catalog);
    } else {
        intro.after(catalog);
    }
};
window.onload = function () {
    catalogMover();
};
window.addEventListener("resize", function () {
    catalogMover();
});

/* SLIDE UP */
let slideUp = (target, duration = 500) => {
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.boxSizing = "border-box";
    target.style.height = target.offsetHeight + "px";
    target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.style.zIndex = 12;
    window.setTimeout(() => {
        target.style.display = "none";
        target.style.removeProperty("height");
        target.style.removeProperty("padding-top");
        target.style.removeProperty("padding-bottom");
        target.style.removeProperty("margin-top");
        target.style.removeProperty("margin-bottom");
        target.style.removeProperty("overflow");
        target.style.removeProperty("transition-duration");
        target.style.removeProperty("transition-property");
        //alert("!");
    }, duration);
    return duration;
};

/* SLIDE DOWN */
let slideDown = (target, duration = 500) => {
    target.style.removeProperty("display");
    let display = window.getComputedStyle(target).display;
    if (display === "none") display = "block";
    target.style.display = display;
    let height = target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.boxSizing = "border-box";
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = height + "px";
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    target.style.zIndex = 15;
    window.setTimeout(() => {
        target.style.removeProperty("height");
        target.style.removeProperty("overflow");
        target.style.removeProperty("transition-duration");
        target.style.removeProperty("transition-property");
    }, duration);
    return duration;
};

/* TOOGLE */
var slideToggle = (target, duration = 500) => {
    if (window.getComputedStyle(target).display === "none") {
        return slideDown(target, duration);
    } else {
        return slideUp(target, duration);
    }
};

let headerMenuListItem = document.querySelectorAll(
    ".main-header__goods-list-wrap > .main-header__nav-item"
);
const headerMenuLinks = document.querySelectorAll(
    ".main-header__goods-list-wrap .main-header__nav-link"
);
let dropdownBg = document.querySelector(".main-header__dropdown");
let innerLists = document.querySelectorAll(".inner-lists");
let fuse = true;

for (let i = 0; i < headerMenuLinks.length; i++) {
    headerMenuLinks[i].addEventListener("click", function (e) {
        let currentLink = null;
        if(headerMenuLinks[i].classList.contains("main-header__nav-link--active")) {
          currentLink = headerMenuLinks[i]
        }
        showMenu(i, currentLink);
    });
}

function showMenu(i, currentLink) {
    if (fuse) {
        fuse = false;
        headerMenuLinks[i].classList.toggle("main-header__nav-link--active");

        Array.from(headerMenuLinks).forEach((item) => {
            if (item != headerMenuLinks[i]) {
                item.classList.remove("main-header__nav-link--active");
            }
        });

        Array.from(headerMenuListItem).forEach((item) => {
            if (item != headerMenuListItem[i]) {
                item.classList.remove("main-header__nav-item--active");
            }
        });
        Array.from(innerLists).forEach((item) => {
            if (item != innerLists[i]) {
                slideUp(item);
            }
        });

        if (getComputedStyle(innerLists[i]).display == "none") {
            slideDown(innerLists[i]);
        } else {
            slideUp(innerLists[i]);
            removeDropBg();
        }
        function removeDropBg() {
            if (dropdownBg.classList.contains("main-header__dropdown--active")) {
                dropdownBg.style.top = "-20vh";
                setTimeout(function () {
                    dropdownBg.classList.remove("main-header__dropdown--active");
                    dropdownBg.style.top = "";
                }, 200);
            }
        }

        dropdownBg.classList.add("main-header__dropdown--active");
        headerMenuListItem[i].classList.toggle("main-header__nav-item--active");

        window.addEventListener("keydown", function (evt) {
            let keyCode = evt.keyCode;
            if (keyCode === 27 && fuse) {
                evt.preventDefault();
                slideUp(innerLists[i]);
                removeDropBg();
                headerMenuListItem[i].classList.remove("main-header__nav-item--active");
                headerMenuLinks[i].classList.remove("main-header__nav-link--active");
            }
        });

        for (let i = 0; i < headerMenuLinks.length; i++) {
          if(headerMenuLinks[i].classList.contains("main-header__nav-link--active")) {
            currentLink = headerMenuLinks[i]
          }
        }

        setTimeout(function () {
            fuse = true;
        }, 500);
    }
}
