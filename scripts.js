const display = document.getElementById("display");
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
    let beforeError = display.value;
    display.value = `You entered ${input} which is the same as ${lastChar}`;
    setTimeout(() => {
      display.value = beforeError;
      getLastChar();
    }, 1500);
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
