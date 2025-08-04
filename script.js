const expression = document.querySelector("#expression");
const result = document.querySelector("#result");
const buttons = document.querySelector("#buttons");
const controls = document.querySelector("#controls");
const operators = document.querySelector("#operators")
const evaluate = document.querySelector(".evaluate");

buttons.addEventListener("click", e => {
  if (e.target.classList.contains("num"))
      appendToCurrentOperand(e.target.textContent);
});

buttons.addEventListener("click", e => {
  if (e.target.classList.contains("point")) 
    if (!getCurrentOperand().value.includes("."))
      appendToCurrentOperand(".");
});

controls.addEventListener("click", e => {
  if (e.target.id === "clear") {
  leftOperand.value ="";
  operator="";
  rightOperand.value="";
  res = "";
  }
  if (e.target.id ==="backspace") {
    let s = getCurrentOperand();
    s.value = s.value.slice(0,-1);
  }
});

operators.addEventListener("click", e => {
  if (e.target.classList.contains("operator")) {
    if (operator === "") {
      operator = e.target.dataset.operator;
    }
  }
});

evaluate.addEventListener("click", e => {
  if (leftOperand.value != "" &&
  rightOperand.value != "" &&
  operator != "") {
    evaluateExpression();
  }
});

document.querySelector("#container").addEventListener("click", e => updateDisplay());

function updateDisplay() {
  expression.textContent = leftOperand.value+operator+rightOperand.value;
  result.textContent = res;
}

function appendToCurrentOperand(text) {
  getCurrentOperand().value += text;
}

function getCurrentOperand () {
  return operator === ""?leftOperand:rightOperand;
}

function evaluateExpression() {
  let left = leftOperand.value.includes(".")?parseFloat(leftOperand.value):parseInt(leftOperand.value);
  let right = rightOperand.value.includes(".")?parseFloat(rightOperand.value):parseInt(rightOperand.value);
  switch (operator){
    case "+":
      res = String(left+right);
      break;
      case "-":
        res =String(left-right);
      break;
      case "*":
        res = String(left*right);
      break;
      case "/":
        res = String(left/right);
      break;
  }
}

let leftOperand = {value:""};
let rightOperand = {value:""};
let operator = "";
let res ="";