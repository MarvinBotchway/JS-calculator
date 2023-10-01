const solutionText = document.getElementById("solution-text");
const inputText = document.getElementById("input-text");
const keypad = document.getElementById("keypad");


const validDigits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const validOperators = ["+", "-", "*", "/"];
const btnTextContents = [
    "AC", "+/-", "%", "/",
    "7", "8", "9", "*",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    ".", "0", "Del", "="];

let num1Str = "0";
let num2Str = "0";
let operatorIndex = 0;
let operator = "";
let solution;

inputText.addEventListener("input", getInput);

for (let i = 0; i < btnTextContents.length; i++) {
    const keypadItem = document.createElement("button");
    
    keypadItem.classList.add("btn");
    if (btnTextContents[i] == "=") {
        keypadItem.classList.add("equal");
    }
    else if (btnTextContents[i] == "Del" ||
    btnTextContents[i] == "AC") {
        keypadItem.classList.add("del");
    }
    else if (!parseInt(btnTextContents[i]) &&
    btnTextContents[i] != "0" &&
    btnTextContents[i] != ".") {
        keypadItem.classList.add("notNum");
    }
    keypadItem.textContent = btnTextContents[i];
    keypad.appendChild(keypadItem).a;
}

function getInput(e) {
    let valueEntered = e.target.value;
    if (validOperators.includes(valueEntered[(valueEntered.length - 1)])) {
        operatorIndex = valueEntered.length - 1;
        operator = valueEntered[(valueEntered.length - 1)];
        
        if (solution != undefined) num1Str = solution;
        else num1Str = valueEntered.substring(0, (valueEntered.length - 1));
    }
    if (valueEntered[(valueEntered.length - 1)] == "=") {
        num2Str = valueEntered.substring((operatorIndex + 1), (valueEntered.length - 1));
        
        solutionText.textContent = solution = operate();
        
        inputText.value = valueEntered.substring(0, (valueEntered.length - 1));
    }
}

function operate() {
    if (operator == "+") return (Number(num1Str) + Number(num2Str));
    if (operator == "-") return (Number(num1Str) - Number(num2Str));
    if (operator == "*") return (Number(num1Str) * Number(num2Str));
    if (operator == "/") return (Number(num1Str) / Number(num2Str));
}