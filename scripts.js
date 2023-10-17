const solutionText = document.getElementById("solution-text");
const typingArea = document.getElementById("typing-area");
const keypad = document.getElementById("keypad");


const validDigits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const validOperators = ["+", "-", "*", "/", "%"];
const btnTextContents = [
    "AC", "+/-", "%", "/",
    "7", "8", "9", "*",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    ".", "0", "Del", "="];

let num1Str = "";
let num2Str = "";
let solution = "";

let operatorIndex;
let oldOperatorIndex;
let operator = "";

let keysEntered = "";
let solutions = [];
let equalUsed = false;

document.addEventListener("keyup", getKeys)

for (let i = 0; i < btnTextContents.length; i++) {
    const keypadItem = document.createElement("button");
    keypadItem.classList.add("btn");
    
    if (btnTextContents[i] == "=") keypadItem.classList.add("equal");
    else if (btnTextContents[i] == "Del" || btnTextContents[i] == "AC") {
        keypadItem.classList.add("del");
    }
    else if (!parseInt(btnTextContents[i]) && btnTextContents[i] != "0" &&
    btnTextContents[i] != ".") {
        keypadItem.classList.add("notNum");
    }

    keypadItem.textContent = btnTextContents[i];
    keypad.appendChild(keypadItem).a;
}

solutionText.textContent = "";

function getKeys(e) {

    if (validDigits.includes(Number(e.key))) {
        keysEntered += e.key;
        typingArea.textContent = keysEntered;
        if (!operator){
            num1Str += e.key;
            solution = solutionText.textContent += e.key;
        } else  if (operator){
            num2Str += e.key;
            solution = solutionText.textContent = operate();
        }
        solutions.push(Number(solution));
    }
    else if (validOperators.includes(e.key)) {
        keysEntered += e.key;
        typingArea.textContent = keysEntered;
        
        if (operator) {
            num1Str = solution;
            num2Str = "";
        }
        operator = e.key;
        operatorIndex = (keysEntered.length - 1);
    }
    else if (e.key === "Backspace") {
        let keyDeleted = keysEntered[keysEntered.length - 1];
        keysEntered = keysEntered.slice(0, -1);
        typingArea.textContent = keysEntered;

        getLastOperatorIndex();
        operator = keysEntered[operatorIndex];

        

        if (operatorIndex < (keysEntered.length - 1)) {
            num2Str = keysEntered.slice((operatorIndex + 1), keysEntered.length);
            if (validDigits.includes(Number(keyDeleted))) { 
                solutions.pop();
                num1Str = num1Str;
            } else num1Str = solutions[(solutions.length - num2Str.length) - 1];
            
            solution = solutions[solutions.length - 1];
        }
        if (operatorIndex == (keysEntered.length - 1)) {
            num2Str = "";
            solutions.pop();
            num1Str = solutions[solutions.length - 1];
            solution = solutions[solutions.length - 1];
        }
        
        if (!operator) {
            solution = num1Str = keysEntered;
            operatorIndex = null;
        }
        solutionText.textContent = solution;
    }
}

function getLastOperatorIndex() {
    for (let i = 0; i < keysEntered.length; i++) {
        if (validOperators.includes(keysEntered[i])) {
            operatorIndex = i;
        }
    }
}

function operate() {
    if (operator == "+") return (Number(num1Str) + Number(num2Str));
    if (operator == "-") return (Number(num1Str) - Number(num2Str));
    if (operator == "*") return (Number(num1Str) * Number(num2Str));
    if (operator == "/") return (Number(num1Str) / Number(num2Str));
    if (operator == "%") return (Number(num1Str) % Number(num2Str));
}