"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
    railoffset: {
      top: 30
    },
    enablekeyboard: true,
    sensitiverail: true,
    cursordragontouch: true
  });
} // *** Валидация и открытие/закрытие ***


var inputName = document.querySelector("#name");
var inputEmail = document.querySelector("#email");
var inputTel = document.querySelector("#tel");
var inputPrivacy = document.querySelector("#privacyPolicy");
var elem, item;

function checkValidate(elem) {
  if (elem.parentElement.classList.contains("invalid") || elem.value == "") {
    return false;
  } else {
    return true;
  }
}

function canSubmit() {
  var btn = document.querySelector("#disabledBtn");

  if (checkValidate(inputName) && checkValidate(inputEmail) && checkValidate(inputTel) && inputPrivacy.checked) {
    btn.removeAttribute("disabled");
  } else if (!btn.disabled || !inputPrivacy.checked) {
    btn.setAttribute("disabled", "disabled");
  }
}

function initModal() {
  activateCustomScroll();
  var writeUsTriggers = document.querySelectorAll(".write-us-trigger");
  var modal = document.querySelector(".write-us");
  var counter = 0;
  Array.from(writeUsTriggers).forEach(function (item) {
    item.addEventListener("click", function () {
      modalToggle(modal);
      counter++;
    });
  }); // *** Откзыть/закрыть ***

  function modalToggle(modal) {
    var wrap = modal.parentElement;
    var body = document.body;
    var mainHeader = document.querySelector(".main-header");
    mainHeader.classList.toggle("main-header--active-modal");
    wrap.classList.toggle("open");

    if (counter % 2 == 0) {
      body.style.overflowY = "hidden";
    } else {
      body.style.overflowY = "auto";
    }
  } // *** Валидация ***


  var Validator = /*#__PURE__*/function () {
    function Validator() {
      _classCallCheck(this, Validator);
    }

    _createClass(Validator, [{
      key: "isEmail",
      value: function isEmail(str) {
        return str.match(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.[A-Z]{2,4}$/i) ? true : false;
      }
    }, {
      key: "isPhone",
      value: function isPhone(str) {
        return str.match(/^[\d-\s]+$/) ? true : false;
      }
    }, {
      key: "isText",
      value: function isText(str) {
        return str.match(/^[\sА-я]+$/);
      }
    }]);

    return Validator;
  }();

  var validator = new Validator();
  var form = document.forms.writeUs;
  var inputs = [inputName, inputEmail];
  Array.from(inputs).forEach(function (item) {
    item.addEventListener("blur", function (e) {
      e.stopPropagation();
      formValid(e);
    });
  });

  function formValid(e) {
    var value = e.target.value;
    var wrapper = e.target.parentElement;
    var wrapperClass = wrapper.classList;
    var parent, label;
    parent = wrapper.parentElement;
    label = parent.querySelector("label");
    var result = false;
    var error = document.createElement("span");
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