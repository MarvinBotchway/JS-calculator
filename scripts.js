const solutionText = document.getElementById("solution-text");
const typingArea = document.getElementById("typing-area");
const keypad = document.getElementById("keypad");


const validDigits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const validOperators = ["+", "-", "*", "/", "%"];
const btnTextContents = [
    "AC", "%", "/",
    "7", "8", "9", "*",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    ".", "0", "Del", "="];

let num1Str = "";
let num2Str = "";
let solution = "";

let operatorIndex;
let operator = "";

let keysEntered = "";
let solutions = [];

document.addEventListener("keyup", (e) => calculate(e.key));

for (let i = 0; i < btnTextContents.length; i++) {
    const keypadItem = document.createElement("button");
    keypadItem.classList.add("btn");
    
    if (btnTextContents[i] == "=") keypadItem.classList.add("equal");
    else if (btnTextContents[i] == "Del" || btnTextContents[i] == "AC") {
        keypadItem.classList.add("del");
        if (btnTextContents[i] == "AC") keypadItem.classList.add("ac");
    }
    else if (!parseInt(btnTextContents[i]) && btnTextContents[i] != "0" &&
    btnTextContents[i] != ".") {
        keypadItem.classList.add("notNum");
    }

    keypadItem.textContent = btnTextContents[i];
    keypad.appendChild(keypadItem).a;
    
    keypadItem.addEventListener("click", (e) => calculate(e.target.innerText));
    
    if (keysEntered == "") typingArea.textContent = "0";
}

solutionText.textContent = "";

function calculate(input) {
   if (validDigits.includes(Number(input)) || input === ".") {
        if (keysEntered.length > 21) {
            window.alert("You can not enter anymore digits!");

        } else if (!operator){
            if (!(input === "." && num1Str.includes("."))) {
                keysEntered += input;
                typingArea.textContent = keysEntered;
                num1Str += input;
                solution = solutionText.textContent += input;
            }

        } else if (operator){
            if (!(input === "." && num2Str.includes("."))) {
                keysEntered += input;
                typingArea.textContent = keysEntered;        
                num2Str += input;
                solution = solutionText.textContent = operate();
                if (solution.length > 20) {
                    solution = Number(solution).toFixed(20);
                    solutionText.textContent = solution;
                }
            }
        }
        solutions.push(Number(solution));

    } else if (validOperators.includes(input)) {
        if (keysEntered.length > 21) {
            window.alert("You can not enter anymore digits!");
        } else {
            keysEntered += input;
            typingArea.textContent = keysEntered;
            
            if (operator) {
                num1Str = solution;
                num2Str = "";
            }
            operator = input;
            operatorIndex = (keysEntered.length - 1);
        }
    } else if (input === "Backspace" || input == "Del") {
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
    
    } else if (input === "=") {
        keysEntered = num1Str = solution.toString();
        num2Str = "";
        operator = "";
        operatorIndex = null;

        typingArea.textContent = "";
    
    } else if (input === "AC" || input === "Delete") {
        keysEntered = "";
        num1Str = "";
        num2Str = "";
        operator = "";
        operatorIndex = null;
        typingArea.textContent = "";
        solutionText.textContent = "";
        solution = "";
        solutions = [];
    }
    if (keysEntered == "") typingArea.textContent = "0";
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