// const expression = document.querySelector("#expression");
// const result = document.querySelector("#result");
const buttons = document.querySelector("#buttons");
const controls = document.querySelector("#controls");
const operators = document.querySelector("#operators")
const evaluate = document.querySelector(".evaluate");

buttons.addEventListener("click", e => {
  if (e.target.classList.contains("num")) {
    if (res != "") res = "";
    appendToCurrentOperand(e.target.textContent);
  }
});

buttons.addEventListener("click", e => {
  if (e.target.classList.contains("point"))
    if (!getCurrentOperand().value.includes("."))
      appendToCurrentOperand(".");
});

controls.addEventListener("click", e => {
  if (e.target.id === "clear")
    clear();
  if (e.target.id === "backspace") {
    let s = getCurrentOperand();
    s.value = s.value.slice(0, -1);
  }
});

operators.addEventListener("click", e => {
  if (e.target.classList.contains("operator")) {
    if (res != "") {
      appendToCurrentOperand(res);
      res = "";
    }
    if (operator === "" ||
      (operator != "" && rightOperand.value === "")) {
      operator = e.target.dataset.operator;
    }
    if (rightOperand.value != "") {
      evaluateExpression();
      appendToCurrentOperand(res);
      res = "";
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

function clear() {
  leftOperand.value = "";
  operator = "";
  rightOperand.value = "";
  res = "";
}

function updateDisplay() {
  display.textContent = leftOperand.value + operator + rightOperand.value + res;
}

function appendToCurrentOperand(text) {
  if (text.length >= 10)
    text = text.slice(0,9);
  if (getCurrentOperand().value.length + text.length < 10)
    getCurrentOperand().value += text;
}

function getCurrentOperand() {
  return operator === "" ? leftOperand : rightOperand;
}

function evaluateExpression() {
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

let leftOperand = { value: "" };
let rightOperand = { value: "" };
let operator = "";
let res = "";