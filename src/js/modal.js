// *** Скролл в форме ***
function activateCustomScroll() {
    $(".write-us__custom-scroll").niceScroll({
        grabcursorenabled: false,
        cursorcolor: "#F08B98",
        cursorwidth: "4px",
        background: "#FAD8DD",
        cursorborder: "none",
        cursorborderradius: "24px",
        autohidemode: false,
        railoffset: { top: 30 },
        enablekeyboard: true,
        sensitiverail: true,
        cursordragontouch: true,
    });
}

// *** Валидация и открытие/закрытие ***
let inputName = document.querySelector("#name");
let inputEmail = document.querySelector("#email");
let inputTel = document.querySelector("#tel");
let inputPrivacy = document.querySelector("#privacyPolicy");
let elem,
    item;

function checkValidate(elem) {
    if (elem.parentElement.classList.contains("invalid") || elem.value == "") {
        return false;
    } else {
        return true;
    }
}
function canSubmit() {
    let btn = document.querySelector("#disabledBtn");
    if (
        checkValidate(inputName) &&
        checkValidate(inputEmail) &&
        checkValidate(inputTel) &&
        inputPrivacy.checked
    ) {
        btn.removeAttribute("disabled");
    } else if (!btn.disabled || !inputPrivacy.checked) {
        btn.setAttribute("disabled", "disabled");
    }
}

function initModal() {
    activateCustomScroll();
    let writeUsTriggers = document.querySelectorAll(".write-us-trigger");
    let modal = document.querySelector(".write-us");
    let counter = 0;
    Array.from(writeUsTriggers).forEach((item) => {
        item.addEventListener("click", () => {
            modalToggle(modal);
            counter++;
        });
    });
    // *** Откзыть/закрыть ***
    function modalToggle(modal) {
        let wrap = modal.parentElement;
        let body = document.body;
        let mainHeader = document.querySelector(".main-header");

        mainHeader.classList.toggle("main-header--active-modal");
        wrap.classList.toggle("open");
        if (counter % 2 == 0) {
            body.style.overflowY = "hidden";
        } else {
            body.style.overflowY = "auto";
        }
    }

    // *** Валидация ***
    class Validator {
        isEmail(str) {
            return str.match(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.[A-Z]{2,4}$/i) ? true : false;
        }
        isPhone(str) {
            return str.match(/^[\d-\s]+$/) ? true : false;
        }
        isText(str) {
            return str.match(/^[\sА-я]+$/);
        }
    }
    const validator = new Validator();

    let form = document.forms.writeUs;

    let inputs = [inputName, inputEmail];

    Array.from(inputs).forEach((item) => {
        item.addEventListener("blur", function (e) {
            e.stopPropagation();
            formValid(e);
        });
    });

    function formValid(e) {
        let value = e.target.value;
        let wrapper = e.target.parentElement;
        let wrapperClass = wrapper.classList;
        let parent, label;
        parent = wrapper.parentElement;
        label = parent.querySelector("label");
        let result = false;

        let error = document.createElement("span");
        error.className = "errorText";
        error.innerHTML = "Неверно заполнен";

        switch (e.target.id) {
            case "name":
                result = validator.isText(value);
                error.innerHTML += "о имя";
                checker();
                break;
            case "email":
                result = validator.isEmail(value);
                error.innerHTML += "а почта";
                checker();
                break;
        }

        function valid(elem) {
            if (elem.contains("invalid")) {
                elem.remove("invalid");
                label.querySelector(".errorText").remove();
            }
            if (!elem.contains("valid")) {
                elem.add("valid");
            }
        }
        function invalid(elem) {
            if (!elem.contains("invalid")) {
                elem.add("invalid");
                label.prepend(error);
            }
            if (elem.contains("valid")) {
                elem.remove("valid");
            }
        }

        function checker() {
            if (result) {
                valid(wrapperClass);
            } else {
                invalid(wrapperClass);
            }
        }
        canSubmit();
    }
}
