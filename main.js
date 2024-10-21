function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

function mul(a, b) {
  return a * b;
}

function div(a, b) {
  if (b == 0) {
    return "Cannot divide by 0!";
  }
  return a / b;
}

function operate(firstNumber, operator, secondNumber) {
  switch (operator) {
    case '+':
      return add(firstNumber, secondNumber);
    case '-':
      return sub(firstNumber, secondNumber);
    case '*':
      return mul(firstNumber, secondNumber);
    case '/':
      return div(firstNumber, secondNumber);
    default:
      return null;
  }
}

let firstNumber = '';
let secondNumber = '';
let currentOperator = null;
let shouldResetDisplay = false;

const display = document.getElementById('display');
const numberButtons = document.querySelectorAll('.btn:not(.operator):not(#equals):not(#clear)');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.getElementById('equals');
const clearButton = document.getElementById('clear');

function updateDisplay(value) {
  display.textContent = value;
}

for (var i = 0; i < numberButtons.length; i++) {
  numberButtons[i].addEventListener('click', function() {
    if (display.textContent === '0' || shouldResetDisplay) {
      display.textContent = '';
      shouldResetDisplay = false;
    }
    display.textContent += this.textContent;
  });
}

for (var i = 0; i < operatorButtons.length; i++) {
  operatorButtons[i].addEventListener('click', function() {
    if (firstNumber === '') {
      firstNumber = parseFloat(display.textContent);
    } else if (currentOperator) {
      secondNumber = parseFloat(display.textContent);
      let result = operate(firstNumber, currentOperator, secondNumber);
      updateDisplay(result);
      firstNumber = result;
    }
    currentOperator = this.textContent;
    shouldResetDisplay = true;
  });
}

equalsButton.addEventListener('click', function() {
  if (firstNumber !== '' && currentOperator) {
    secondNumber = parseFloat(display.textContent);
    let result = operate(firstNumber, currentOperator, secondNumber);
    updateDisplay(result);
    firstNumber = result;
    currentOperator = null;
    shouldResetDisplay = true;
  }
});

clearButton.addEventListener('click', function() {
  display.textContent = '0';
  firstNumber = '';
  secondNumber = '';
  currentOperator = null;
});

