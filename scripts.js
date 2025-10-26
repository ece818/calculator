const display = document.getElementById("display");
let parenthesisOn = false;
let lastChar = "0";
function appendToDisplay(input) {
  getLastChar();
  if (display.value === "0") {
    if (input == "+" || input == "*" || input == "/" || input == "0") {
      display.value = "Enter A Number";
      setTimeout(clearDisplay, 1500);
    } else if (input == ".") {
      display.value = "0.";
      getLastChar();
    } else {
      display.value = input;
      getLastChar();
    }
  } else if (
    (lastChar === "+" ||
      lastChar === "*" ||
      lastChar === "/" ||
      lastChar === "." ||
      lastChar === "-") &&
    (input === "+" ||
      input === "*" ||
      input === "/" ||
      input === "." ||
      input === "-")
  ) {
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
    }
  }
}
function getLastChar() {
  lastChar = display.value.at(-1);
  return lastChar;
}
function clearDisplay() {
  display.value = "0";
}

function calculate() {
  try {
    display.value = eval(display.value);
  } catch (error) {
    log.error(error);
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
