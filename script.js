const clearBtn = document.getElementById("clearBtn")
const deleteBtn = document.getElementById("deleteBtn")
const btnNumbers = document.querySelectorAll('[data-value]');
const operationBtns = document.querySelectorAll('[data-operation]')
const equalBtn = document.getElementById("equalBtn")
const pointBtn = document.querySelector('[data-point]')
const currentOperationDisplay = document.querySelector('[data-current-operation]')
const lastOperationDisplay = document.querySelector('[data-previous-operation]')
const alert = document.querySelector('.alert')

let firstOperand = '';
let secondOperand = '';
let currentOperator = null;
let resetScreen = false
let result;

clear();

clearBtn.onclick = () => clear();
deleteBtn.onclick = () => deleteDigit();
equalBtn.onclick = () => validation();
pointBtn.onclick = () => addPoint();

btnNumbers.forEach((btn) => {
    btn.addEventListener('click', btn => setValue(btn.target.dataset.value));
});

operationBtns.forEach((btn) => {
    btn.addEventListener('click', btn => setOperation(btn.target.textContent));
});

function setValue(newDigit) {
    if (currentOperationDisplay.textContent === "0" || resetScreen) reset()
    if (alert.style.visibility === "visible") alert.style.visibility = "hidden";
    currentOperationDisplay.innerHTML += newDigit;
}

function setOperation(operator) {
    if (currentOperator !== null) validation()
    firstOperand = currentOperationDisplay.textContent
    currentOperator = operator
    lastOperationDisplay.textContent = `${firstOperand} ${currentOperator}`
    resetScreen = true;
}

function validation() {
    if (currentOperator === null || resetScreen) return
    if (currentOperator === "÷" && currentOperationDisplay.textContent === "0") {
        alert.style.visibility = "visible";
        return
    }
    secondOperand = currentOperationDisplay.textContent
    currentOperationDisplay.textContent = operate(firstOperand, secondOperand, currentOperator)
    lastOperationDisplay.textContent = `${firstOperand} ${currentOperator} ${secondOperand} =`
    currentOperator = null
    resetScreen = true;
}

function clear() {
    if (alert.style.visibility === "visible") alert.style.visibility = "hidden";
    lastOperationDisplay.innerHTML = "";
    currentOperationDisplay.innerHTML = "0";
    firstOperand = ''
    secondOperand = ''
    currentOperator = null
}

function deleteDigit() {
    if (currentOperationDisplay.innerHTML === '0') return
    currentOperationDisplay.innerHTML = currentOperationDisplay.textContent.toString().slice(0, -1)
}

function reset() {
    currentOperationDisplay.innerHTML = "";
    resetScreen = false;
}

function addPoint() {
    if (resetScreen) reset()
    if (currentOperationDisplay.textContent === '') currentOperationDisplay.textContent = '0'
    if (currentOperationDisplay.textContent.includes('.')) return
    currentOperationDisplay.textContent += '.'
}

function operate(a, b, operator) {
    a = Number(a);
    b = Number(b);
    if (operator === "+") {
        result = a + b
    }
    else if (operator === "-") {
        result = a - b
    }
    else if (operator === "×") {
        result = a * b
    }
    else if (operator === "÷") {
        if (b === 0) return null
        result = a / b
    }
    else return null
    result = Math.round(result * 1000) / 1000
    return result
}