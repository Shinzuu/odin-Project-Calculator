let currentValue = "";
let storedValue = null;
let operator = null;
let isError = false;

const displaySymbol = document.querySelector(".display-upper-text .symbol");
const displayUpperText = document.querySelector(".display-upper-text .number");
const displayLowerText = document.querySelector(".display-lower-text");

const buttons = document.querySelectorAll(".keys button");
buttons.forEach(button => {
    button.addEventListener("click", function() {
        const key = this.textContent;
        handleButtonClick(key);
    });
});

function handleButtonClick(key) {
    if (isError && key !== "AC") return;
    switch (key) {
        case "AC":
            clear();
            enableButtons();
            break;
        case "+":
        case "-":
        case "*":
        case "/":
        case "%":
            if (storedValue === null) {
                storedValue = currentValue;
            } else {
                calculate();
                storedValue = currentValue;
            }
            operator = key;
            currentValue = "";
            updateDisplay(operator, currentValue, storedValue);
            break;
        case "=":
            if (operator && storedValue !== null) {
                calculate();
                updateDisplay("", currentValue, storedValue);
            }
            break;
        case "√":
            if (currentValue !== "" && parseFloat(currentValue) >= 0) {
                currentValue = Math.sqrt(parseFloat(currentValue)).toString();
                updateDisplay(operator, currentValue, storedValue);
            }
            break;
        default:
            if (!isNaN(parseInt(key)) || key === ".") {
                currentValue += key;
                updateDisplay(operator, currentValue, storedValue);
            }
            break;
    }
    if(isNaN(storedValue)) disableButtons();
}

function updateDisplay(symbol, lowerText, upperText) {
    if (symbol !== undefined) displaySymbol.textContent = symbol;
    
    if (upperText !== undefined) displayUpperText.textContent = upperText;
    
    if (lowerText !== undefined) displayLowerText.textContent = lowerText;
}

function clear() {
    currentValue = "";
    storedValue = null;
    operator = null;
    isError = false;
    updateDisplay("", currentValue, storedValue);
}

function calculate() {
    let num1 = parseFloat(storedValue);
    let num2 = parseFloat(currentValue);
    switch (operator) {
        case "+":
            currentValue = (num1 + num2).toString();
            break;
        case "-":
            currentValue = (num1 - num2).toString();
            break;
        case "*":
            currentValue = (num1 * num2).toString();
            break;
        case "/":
            if (num2 !== 0) {
                currentValue = (num1 / num2).toString();
            } else {
                currentValue = "Error";
                isError = true;
                disableButtons();
            }
            break;
        case "%":
            currentValue = ((num1 * num2) / 100).toString();
            break;
    }
    storedValue = null;
}

function disableButtons() {
    buttons.forEach(button => {
        if (button.textContent !== "AC") {
            button.disabled = true;
        }
    });
}

function enableButtons() {
    buttons.forEach(button => {
        button.disabled = false;
    });
}

window.onload = function() {
    setZoom(0.75);
};

function setZoom(zoomLevel) {
    document.body.style.zoom = zoomLevel;
}
