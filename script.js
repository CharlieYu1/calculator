const display = document.querySelector('.display');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const allClearButton = document.querySelector('#all-clear');
const dotButton = document.querySelector('#dot');
const backspaceButton = document.querySelector('#backspace');

const add = (a, b) => {return a + b};
const subtract = (a, b) => {return a - b};
const multiply = (a, b) => {return a * b};
const divide = (a, b) => {return a / b};

const operate = function (operator, a, b) {
    const operator_table = {
        'add': add, 
        'subtract': subtract, 
        'multiply': multiply, 
        'divide': divide
    }
    return operator_table[operator](a, b);
}

let currentValue = '';
let previousValue = '';
let currentOperator = '';

function updateValue(val) {
    if (val === '') {
        display.textContent = '0';
    } else if (val[0] == '0' && val.length > 1 && val[1] !== '.') {
        val = val.slice(1);
        updateValue(val);
    } else {
        console.log('updateValue', val);
        display.textContent = val;
    };
}

function handleClickNumbers (e) {
    currentValue += e.target.textContent;
    updateValue(currentValue);
}

function handleClear (e) {
    currentValue = '';
    previousValue = '';
    currentOperator = '';
}

function handleClickOperator(e) {
    let operator = e.target.id;
    console.log(currentOperator, previousValue, currentValue);
    if (operator === 'equal' && currentValue === ''){
        currentOperator = '';
        return;
    }
    if (operator === 'equal'){
        previousValue = operate(currentOperator, +previousValue, +currentValue);
        updateValue(previousValue);
        console.log(previousValue);        
        currentValue = '';
        currentOperator = '';
        return;
    }
    if (currentOperator !== '' && currentValue !== '') {
        previousValue = operate(currentOperator, +previousValue, +currentValue);
        updateValue(previousValue);
        currentValue = '';
        if (operator !== "equal") {
            currentOperator = operator;
        } else {
            currentOperator = '';
        }
        return;
    }
    if (currentOperator === '' && currentValue === '') {
        currentOperator = operator;
        return;
    }
    if (currentOperator === '') {
        previousValue = currentValue;
        currentValue = '';
        if (operator !== "equal") {
            currentOperator = operator;
        }
        return;
    }
}

function handleBackspaceButton (e) {
    if (currentValue != '') {
        currentValue = currentValue.slice(0, -1);
        updateValue(currentValue);
    }
}

function handleDot (e) {
    if (currentValue.indexOf('.') > -1) {return;}
    if (currentValue === '') {currentValue = '0';}
    currentValue += '.';
    updateValue(currentValue);
}

numberButtons.forEach(
    btn => btn.addEventListener('click', handleClickNumbers)
);

operatorButtons.forEach(
    btn => btn.addEventListener('click', handleClickOperator)
);

allClearButton.addEventListener('click', function(e){
    currentOperator = '';
    currentValue = '';
    previousValue = '';
    updateValue(currentValue);
})

dotButton.addEventListener('click', handleDot);

backspaceButton.addEventListener('click', handleBackspaceButton);

window.addEventListener('keydown', function (e){
    console.log(e);
    if (e.key >= '0' && e.key <= '9') { 
        console.log('here');
        document.querySelector(`[id='${e.key}']`).click(); 
    }
    if (e.key === 'Backspace') {backspaceButton.click()};
    if (e.key === '.') {dotButton.click()};
    if (e.key === '+') {document.querySelector('#add').click()};
    if (e.key === '-') {document.querySelector('#subtract').click()};
    if (e.key === '*') {document.querySelector('#multiply').click()};
    if (e.key === '/') {document.querySelector('#divide').click()};
    if (e.key === 'Enter') {
        document.querySelector('#equal').click()
        e.preventDefault();
    };
})