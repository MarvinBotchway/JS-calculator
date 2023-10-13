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

let num1Str = "0";
let num2Str = "0";
let operatorIndex;
let oldOperatorIndex;
let operator = "";
let keysEntered = "";
let solution;
let positionsAndSolutions = [];
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

function getKeys(e) {
    if (validDigits.includes(Number(e.key))) {
        keysEntered += e.key;
        typingArea.textContent = keysEntered;
        oldOperatorIndex = undefined;
    }
    else if (validOperators.includes(e.key) || e.key == "=") {
        if (validOperators.includes(keysEntered[keysEntered.length - 1])) {
            return;
        }
        
        keysEntered += e.key;
        if (e.key == "=") {
            typingArea.textContent = keysEntered.substring(0, (keysEntered.length - 1));
        } else typingArea.textContent = keysEntered;

        if (operator != "") oldOperatorIndex = operatorIndex;
        operatorIndex = keysEntered.length - 1;
        operator = oldOperatorIndex ? keysEntered[oldOperatorIndex] : keysEntered[operatorIndex];
        
        if (solution && oldOperatorIndex) { 
            num1Str = solution;
            num2Str = keysEntered.substring((oldOperatorIndex + 1), (keysEntered.length - 1));
        } else num1Str = keysEntered.substring(0, (keysEntered.length - 1));
            
        if (!equalUsed) {
            solution = solutionText.textContent = operate();
            let lastIndexOfExpression = operatorIndex - 1;
            positionsAndSolutions.push({lastIndexOfExpression, solution});
            equalUsed = false;
        }

        if (e.key == "=") {
            equalUsed = true;
            keysEntered = keysEntered.substring(0, (keysEntered.length - 1));
            operator = "";
            operatorIndex = oldOperatorIndex;
        } else if (validOperators.includes(e.key)) equalUsed = false;
    }
    if (e.key === "Backspace") {
        keysEntered = keysEntered.slice(0, -1);
        typingArea.textContent = keysEntered;
        
        if (keysEntered.length < 1) {
            solution = solutionText.textContent = "0";
            num1Str = num2Str = "0";
            operatorIndex = oldOperatorIndex = undefined;
            keysEntered = "";
            operator = "";
            equalUsed = false;
            return;
        }
        
        for (let i = 0; i < keysEntered.length; i++) {
            if (validOperators.includes(keysEntered[i])){
                oldOperatorIndex = operatorIndex = i;
            }
        }
        operator = keysEntered[oldOperatorIndex];
        
        if ((keysEntered.length - 1) <=
        positionsAndSolutions[positionsAndSolutions.length - 1].lastIndexOfExpression) {
            if (positionsAndSolutions.length > 1) {
                positionsAndSolutions.pop();
            }
        }
        solution = positionsAndSolutions[positionsAndSolutions.length -1].solution;

        if (keysEntered.length - 1 > oldOperatorIndex) {
            num1Str = solution;
            num2Str = keysEntered.substring((oldOperatorIndex + 1), keysEntered.length);
            solution = operate();
        }
        if (!operator) {
            solution = solutionText.textContent = keysEntered;
            num1Str = solution;
        }
        solutionText.textContent = solution;

        

    }
}


function operate() {
    if (operator == "+") return (Number(num1Str) + Number(num2Str));
    if (operator == "-") return (Number(num1Str) - Number(num2Str));
    if (operator == "*") return (Number(num1Str) * Number(num2Str));
    if (operator == "/") return (Number(num1Str) / Number(num2Str));
    if (operator == "%") return (Number(num1Str) % Number(num2Str));
}