const expression = document.querySelector("#expression");
const result = document.querySelector("#result");
const buttons = document.querySelector("#buttons");
const controls = document.querySelector("#controls");

buttons.addEventListener("click", e => {
  if (e.target.classList.contains("num"))
      appendToCurrentOperand(e.target.textContent);
});

buttons.addEventListener("click", e => {
  if (e.target.classList.contains("point")) 
    if (!getCurrentOperand().value.includes("."))
      appendToCurrentOperand(".");
  
});

buttons.addEventListener("click", e => updateDisplayExpression());

controls.addEventListener("click", e => {
  if (e.target.id === "clear") {
  leftOperand.value ="";
  operator="";
  rightOperand.value="";
  }
  if (e.target.id ==="backspace") {
    let s = getCurrentOperand();
    s.value = s.value.slice(0,-1);
  }
  updateDisplayExpression();
});

function updateDisplayExpression() {
  expression.textContent = leftOperand.value+operator+rightOperand.value;
}

function appendToCurrentOperand(text) {
  getCurrentOperand().value += text;
}

function getCurrentOperand () {
  return operator === ""?leftOperand:rightOperand;
}
let leftOperand = {value:""};
let rightOperand = {value:""};
let operator = "";
