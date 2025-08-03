const expression = document.querySelector("#expression");
const result = document.querySelector("#result");
const buttons = document.querySelector("#buttons");
const controls = document.querySelector("#controls");

buttons.addEventListener("click", e => {
  if (e.target.classList.contains("num"))
    expression.textContent += e.target.textContent;
});
controls.addEventListener("click", e => {
  if (e.target.id === "clear")
  expression.textContent = "";
})
