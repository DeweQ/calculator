const buttons = document.querySelector("#buttons");
const controls = document.querySelector("#controls");
const operators = document.querySelector("#operators")
const evaluate = document.querySelector(".evaluate");

//#region Event Listeners
document.body.addEventListener("keyup", keyupEventHandler);
document.body.addEventListener("keyup", e => updateDisplay())
document.querySelector("#container").addEventListener("click", e => updateDisplay());

buttons.addEventListener("click", e => {
  if (e.target.classList.contains("num"))
    inputDigit(e.target.textContent);

  if (e.target.classList.contains("point"))
    inputPoint();
});

controls.addEventListener("click", e => {
  if (e.target.id === "clear")
    clear();

  if (e.target.id === "backspace")
    removeDigit();
});

operators.addEventListener("click", e => {
  if (e.target.classList.contains("operator"))
    inputOperator(e.target.dataset.operator)
});

evaluate.addEventListener("click", evaluateExpression);
//#endregion

//#region Event Handlers
function inputDigit(digit) {
  if (res != "") res = "";
  appendToCurrentOperand(digit);
}

function inputPoint() {
  if (!getCurrentOperand().value.includes("."))
    appendToCurrentOperand(".");
}

function inputOperator(op) {
  if (res != "") {
    appendToCurrentOperand(res);
    res = "";
  }
  if ((operator === "" && leftOperand.value != "") ||
    (operator != "" && rightOperand.value === "")) {
    operator = op;
  }
  if (rightOperand.value != "") {
    evaluateExpression();
    appendToCurrentOperand(res);
    res = "";
    operator = op;
  }
}

function clear() {
  leftOperand.value = "";
  operator = "";
  rightOperand.value = "";
  res = "";
}

function removeDigit() {
  let s = getCurrentOperand();
  s.value = s.value.slice(0, -1);
}

function updateDisplay() {
  display.textContent = leftOperand.value + operator + rightOperand.value + res;
}

function evaluateExpression() {
  if (leftOperand.value != "" &&
    rightOperand.value != "" &&
    operator != "") {
    let left = leftOperand.value.includes(".") ? parseFloat(leftOperand.value) : parseInt(leftOperand.value);
    let right = rightOperand.value.includes(".") ? parseFloat(rightOperand.value) : parseInt(rightOperand.value);
    switch (operator) {
      case "+":
        res = String(left + right);
        break;
      case "-":
        res = String(left - right);
        break;
      case "*":
        res = String(left * right);
        break;
      case "/":
        res = String(left / right);
        break;
    }
    if (!Number.isFinite(parseInt(res))) {
      alert("The MATH GODS banned me from doing this");
      clear();
      return;
    }
    leftOperand.value = "";
    rightOperand.value = "";
    operator = "";
  }
}

function keyupEventHandler(event) {
  // if (["0","1","2","3","4","5","6","7","8","9",".","*","/","+","-","=","Enter","Escape","Backspace"].indexOf(event.key)>=0)
  //   console.log(event.key);
  switch (event.key) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      inputDigit(event.key);
      break;
    case "+":
    case "-":
    case "*":
    case "/":
      inputOperator(event.key);
      break;
    case "=":
    case "Enter":
      evaluateExpression();
      break;
    case "Escape":
      clear();
      break;
    case "Backspace":
      removeDigit();
      break;
  }
  //console.log("Key pressed: ", event.key);
  // console.log("Key code: ", event.code);

}
//#endregion

function appendToCurrentOperand(text) {
  if (text.length >= 10)
    text = text.slice(0, 9);
  if (getCurrentOperand().value.length + text.length < 10)
    getCurrentOperand().value += text;
}

function getCurrentOperand() {
  return operator === "" ? leftOperand : rightOperand;
}

let leftOperand = { value: "" };
let rightOperand = { value: "" };
let operator = "";
let res = "";