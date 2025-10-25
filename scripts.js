const display = document.getElementById("display");

function appendToDisplay(input) {
  if (display.value == 0) {
    if (input == "+" || input == "*" || input == "/") {
      display.value = "Enter A Number";
      setTimeout(clearDisplay, 1500);
    } else {
      display.value = input;
    }
  } else {
    display.value += input;
  }
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
