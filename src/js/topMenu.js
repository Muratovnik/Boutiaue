function initMenu() {
    // *** Переключатель на мобильной версии ***

    // Открыть меню
    let menuToggle = document.querySelector(".main-header__menu-toggle");
    let mainNavMenu = document.querySelector(".main-header__nav");
    let mainHeader = document.querySelector(".main-header");

    let menuToggleFuse = true;
    menuToggle.addEventListener("click", function (e) {
        let duration = 500;
        if (menuToggleFuse) {
            menuToggleFuse = false;
            if (mainHeader.classList.contains("main-header--active")) {
                slideToggle(mainNavMenu, duration);
                this.classList.toggle("main-header__menu-toggle--active");
                setTimeout(function () {
                    mainHeader.classList.toggle("main-header--active");
                    document.body.style.overflowY = 'auto'
                }, duration * 0.7);
            } else {
                this.classList.toggle("main-header__menu-toggle--active");
                mainHeader.classList.toggle("main-header--active");
                setTimeout(function () {
                    slideToggle(mainNavMenu, duration);
                    document.body.style.overflowY = 'hidden'
                }, duration * 0.7);
            }
            setTimeout(() => {
                menuToggleFuse = true;
            }, duration * 1.5);
        }
    });


    // *** Выпадающие списки ***

    let headerMenuListItem = document.querySelectorAll(
        ".main-header__goods-list-wrap > .main-header__nav-item"
    );
    let headerMenuLinks = document.querySelectorAll(
        ".main-header__goods-list-wrap .main-header__nav-link"
    );
    let dropdownBg = document.querySelector(".main-header__dropdown");
    let innerLists = document.querySelectorAll(".inner-lists");
    // Предохранитель повторного срабатывания
    let fuse = true;
    let fuseTime = 150;

    for (let i = 0; i < headerMenuLinks.length; i++) {
        headerMenuLinks[i].addEventListener("mouseover", function (e) {
            e.stopPropagation();
            showMenu(e.target, i);
        });
    }

    if (!windowChecker.matches) {
        for (let i = 0; i < headerMenuLinks.length; i++) {
            headerMenuLinks[i].addEventListener("click", function (e) {
                e.stopPropagation();
                showMenu(e.target, i);
            });
        }
    }
    
    

    // Классы
    let itemClass = "main-header__nav-item";
    let linkClass = "main-header__nav-link";
    let dropDownClass = "main-header__dropdown";
    let currentListItem = null;
    let currentList = null;

    function removeActiveClass(elem, className) {
        elem.classList.remove(`${className}--active`);
    }

    // Удаление фона для меню
    function removeDropBg(dropDownClass) {
        if (dropdownBg.classList.contains(`${dropDownClass}--active`)) {
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
            // Запрещаем клик на время выполнения скрипта
            fuse = false;
            currentListItem = currentLink.parentElement;
            currentList = innerLists[i];

            // ---------------
            //      Чистка
            // ---------------

            // Чистка классов
            function cleaner(item, currentElem, elemClass) {
                for (elem of item) {
                    if (
                        elem != currentElem &&
                        elem.classList.contains(`${elemClass}--active`)
                    ) {
                        removeActiveClass(elem, elemClass);
                    }
                }
            }

            // Чистка классов других ссылок
            cleaner(headerMenuLinks, currentLink, linkClass);

            // Чистка ромбов ромбы у других пунктов меню
            cleaner(headerMenuListItem, currentListItem, itemClass);

            // Скрывает другие списки
            for (item of innerLists) {
                if (item != currentList) {
                    slideUp(item, fuseTime);
                }
            }

            // Сокрытие всего
            function remover() {
                slideUp(currentList, fuseTime);
                removeDropBg(dropDownClass);
                removeActiveClass(currentListItem, itemClass);
                removeActiveClass(currentLink, linkClass);
            }

            // ---------------
            //      Показ
            // ---------------

            // Смена класса таргет ссылки
            currentLink.classList.add("main-header__nav-link--active");
            // Смена класса элемента списка
            currentListItem.classList.add("main-header__nav-item--active");
            // Показ бэкграунда
            dropdownBg.classList.add("main-header__dropdown--active");

            // Показ списка. При повторном клике - скрывает
            if (getComputedStyle(currentList).display == "none") {
                slideDown(currentList);
            } else if (!windowChecker.matches) {
                slideUp(currentList);
                currentLink.classList.remove("main-header__nav-link--active");
                currentListItem.classList.remove("main-header__nav-item--active");
            }
            

            // Закрытие по esc
            window.addEventListener("keydown", function (evt) {
                let keyCode = evt.keyCode;
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
}

// *** Прослушка размера экрана и изменение свойвств ***
function checkHeader() {
    let mainHeader = document.querySelector('.main-header');
    let mainHeaderNav = document.querySelector('.main-header__nav');
    let menuToggle = document.querySelector(".main-header__menu-toggle");

    if(windowChecker.matches && mainHeader.classList.contains('main-header--active')) {
        mainHeader.classList.toggle('main-header--active');
    }
    if(windowChecker.matches && mainHeaderNav.style.display == 'none') {
        mainHeaderNav.removeAttribute('style');
    }
    if (!windowChecker.matches && !mainHeader.classList.contains('main-header--active') && mainHeaderNav.style.display == 'block') {
        mainHeaderNav.removeAttribute('style');
        if (menuToggle.classList.contains('main-header__menu-toggle--active')) {
            menuToggle.classList.toggle('main-header__menu-toggle--active')
        }
        
    }

}