const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '0';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

function updateDisplay(value) {
  display.textContent = value;
}

function inputDigit(digit) {
  if (waitingForSecondOperand) {
    currentInput = digit;
    waitingForSecondOperand = false;
  } else {
    currentInput = currentInput === '0' ? digit : currentInput + digit;
  }

  updateDisplay(currentInput);
}

function inputDecimal() {
  if (waitingForSecondOperand) {
    currentInput = '0.';
    waitingForSecondOperand = false;
    updateDisplay(currentInput);
    return;
  }

  if (!currentInput.includes('.')) {
    currentInput += '.';
    updateDisplay(currentInput);
  }
}

function handleOperator(nextOperator) {
  const inputValue = Number(currentInput);

  if (operator && waitingForSecondOperand) {
    operator = nextOperator;
    return;
  }

  if (firstOperand === null) {
    firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);
    currentInput = String(result);
    firstOperand = result;
  }

  waitingForSecondOperand = true;
  operator = nextOperator;
}

function calculate(first, second, op) {
  switch (op) {
    case '+':
      return first + second;
    case '-':
      return first - second;
    case '*':
      return first * second;
    case '/':
      return second === 0 ? 'Error' : first / second;
    case '%':
      return (first * second) / 100;
    default:
      return second;
  }
}

function performCalculation() {
  if (operator === null || waitingForSecondOperand) {
    return;
  }

  const secondValue = Number(currentInput);
  const result = calculate(firstOperand, secondValue, operator);

  currentInput = String(result);
  firstOperand = null;
  operator = null;
  waitingForSecondOperand = false;
  updateDisplay(currentInput);
}

function clearCalculator() {
  currentInput = '0';
  firstOperand = null;
  operator = null;
  waitingForSecondOperand = false;
  updateDisplay(currentInput);
}

function deleteLastDigit() {
  if (waitingForSecondOperand) {
    return;
  }

  currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : '0';
  updateDisplay(currentInput);
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.dataset.value;

    if (/^[0-9]$/.test(value)) {
      inputDigit(value);
      return;
    }

    switch (value) {
      case '.':
        inputDecimal();
        break;
      case '+':
      case '-':
      case '*':
      case '/':
      case '%':
        handleOperator(value);
        break;
      case '=':
        performCalculation();
        break;
      case 'AC':
        clearCalculator();
        break;
      case 'DEL':
        deleteLastDigit();
        break;
      default:
        break;
    }
  });
});

updateDisplay(currentInput);
