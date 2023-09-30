const solutionText = document.getElementById("solution-text");
const inputText = document.getElementById("input-text");

const validDigits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const validOperators = ["+", "-", "*", "/"];

let num1Str = "0";
let num2Str = "0";
let operatorIndex = 0;
let operator = "";
let solution = 0;

inputText.addEventListener("input", getInput);

function getInput(e) {
    let valueEntered = e.target.value;
    if (validOperators.includes(valueEntered[(valueEntered.length - 1)])) {
        operatorIndex = valueEntered.length - 1;
        operator = valueEntered[(valueEntered.length - 1)];
        
        if (solution > 0) num1Str = solution;
        else num1Str = valueEntered.substring(0, (valueEntered.length - 1));
    }
    if (valueEntered[(valueEntered.length - 1)] == "=") {
        num2Str = valueEntered.substring((operatorIndex + 1), (valueEntered.length - 1));
        
        solutionText.textContent = solution = operate();
        
        inputText.value = valueEntered.substring(0, (valueEntered.length - 1));
    }
}

function operate() {
    if (operator == "+") return (parseInt(num1Str) + parseInt(num2Str));
    if (operator == "-") return (parseInt(num1Str) - parseInt(num2Str));
    if (operator == "*") return (parseInt(num1Str) * parseInt(num2Str));
    if (operator == "/") return (parseInt(num1Str) / parseInt(num2Str));
}