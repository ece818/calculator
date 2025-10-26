const display = document.getElementById("display");
const selector = document.getElementById("selector");
const tempSub = document.getElementById("tempSub");
const mathBtns = document.getElementsByClassName("mathBtn");
const calculator = document.querySelector(".calculator");
selector.addEventListener("change", (event) => {
  selectorOption = event.target.value;
  tempDropdown();
});

let parenthesisOn = false;
let lastChar = "0";
// display.value = "0";

const displayBgClr = "rgba(0, 0, 0, 0.37)";
const displayBgDrk = "rgba(0, 0, 0, 1)";
const displayFontClr = "rgba(255, 255, 255, 1)";
const displayFontClrSwitch = "rgba(138, 131, 131, 1)";

let optSymbol = ["+", "*", "/", ".", "-", "("];

function tempDropdown() {
  const isTemp = selectorOption === "Temperature";
  tempSub.value = "F2C";
  tempSub.style.display = isTemp ? "flex" : "none";
  calculator.classList.toggle("disabled-mode", isTemp);
  for (let btn of mathBtns) {
    btn.disabled = isTemp;
  }
  if (isTemp) {
    btn.setAttribute("aria-disabled", "true");
  } else {
    btn.removeAttribute("aria-disabled");
  }
}

tempSub.addEventListener("change", (event) => {
  tempSub.value = event.target.value;

  console.log(tempSub);
});

function appendToDisplay(input) {
  getLastChar();
  if (display.value.length < 11) {
    if (display.value === "0") {
      flashScreen(input);
      if (input == "+" || input == "*" || input == "/" || input == "0") {
        display.value = "Enter A Number";
        setTimeout(clearDisplay, 750);
      } else if (input == ".") {
        display.value = "0.";
        getLastChar();
      } else {
        display.value = input;
        getLastChar();
      }
    } else if (optSymbol.includes(lastChar) && optSymbol.includes(input)) {
      if (input == ".") {
        appendToDisplay(`0${input}`);
      } else {
        let beforeError = display.value;
        display.style.fontSize = "2.25rem";
        display.value = `Enter a number`;
        setTimeout(() => {
          display.style.fontSize = "3rem";
          display.value = beforeError;
          getLastChar();
        }, 1500);
      }
    } else {
      if (display.value === "0.") {
        display.value = `0.${input}`;
        getLastChar();
      } else {
        display.value += input;
        getLastChar();
        flashScreen(display.value);
      }
    }
  } else {
    currentValue = display.value;
    flashScreen("Number Too Long");
    setTimeout(() => flashScreen(currentValue), 1000);
  }
}
function getLastChar() {
  lastChar = display.value.at(-1);
  return lastChar;
}
function clearDisplay() {
  display.value = "";

  flashScreen("0");
}

function calculate() {
  if (selectorOption === "Temperature") {
    convert_weather();
  } else {
    try {
      display.value = eval(display.value);
    } catch (error) {
      log.error(error);
    }
  }
}
function subtractFromDisplay() {
  if (display.value.length === 1) {
    display.value = "0";
  } else {
    display.value = display.value.slice(0, -1);
  }
}
// if length is less that 1 and number is 0 do nothing

function addParenthesis() {
  // update lastChar first
  getLastChar();
  if (!parenthesisOn) {
    parenthesisOn = true;
    appendToDisplay("(");
  } else if (parenthesisOn && lastChar === "(") {
    const previous_display = display.value;
    display.value = "Enter a #";
    setTimeout(() => {
      display.value = previous_display;
      getLastChar();
    }, 3000);
  } else {
    appendToDisplay(")");
    parenthesisOn = false;
  }
}

function formatText() {
  display.addEventListener("input", (e) => {
    console.log(e.target.value);
  });
}

function flashScreen(displayValue) {
  display.style.backgroundColor = displayBgDrk;
  display.style.color = displayFontClrSwitch;
  display.value = displayValue;

  setTimeout(() => {
    display.style.backgroundColor = displayBgClr;
    display.style.color = displayFontClr;
  }, 150);
}

function convert_weather() {
  if (tempSub.value === "F2C") {
    display.value = (((display.value - 32) * 5) / 9).toFixed(3);
  } else {
    display.value = ((display.value * 9) / 5 + 32).toFixed(3);
  }
}
