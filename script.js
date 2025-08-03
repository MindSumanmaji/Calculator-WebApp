document.addEventListener("DOMContentLoaded", function () {
  const output = document.getElementById("output");
  const history = document.getElementById("history");

  let current = "";
  let previous = "";
  let operator = null;

  function formatNumber(num) {
  if (num === "-") return "";
  if (num === "" || isNaN(Number(num))) return num;
  const n = Number(num);
  return n.toLocaleString("en");
  }

  function unformatNumber(num) {
    return Number(num.replace(/,/g, ""));
  }

  function updateOutput(value) {
    if (value === "") {
      output.innerText = "";
    } else {
      output.innerText = formatNumber(value);
    }
  }

  function updateHistory(value) {
    history.innerText = value;
  }

  function clearAll() {
    current = "";
    previous = "";
    operator = null;
    updateOutput("");
    updateHistory("");
  }

  function deleteLast() {
    if (current !== "") {
      // Delete last digit from current input
      current = current.toString().slice(0, -1);
      updateOutput(current);
    } else if (operator !== null && previous !== "") {
      // Delete the operator if present
      operator = null;
      updateHistory(formatNumber(previous));
    } else if (operator === null && previous !== "") {
      // If operator is gone, delete last digit from previous
      previous = previous.toString().slice(0, -1);
      updateHistory(formatNumber(previous));
    }
  }

  function calculate() {
    const prev = parseFloat(previous);
    const curr = parseFloat(current);
    let result = "";

    if (isNaN(prev) || isNaN(curr)) return;

    switch (operator) {
      case "+":
        result = prev + curr;
        break;
      case "-":
        result = prev - curr;
        break;
      case "×":
        result = prev * curr;
        break;
      case "÷":
        if (curr === 0) {
          updateOutput("Error");
          updateHistory("");
          current = "";
          previous = "";
          operator = null;
          return;
        }
        result = prev / curr;
        break;
      case "%":
        result = prev % curr;
        break;
      default:
        return;
    }

    current = result.toString();
    operator = null;
    previous = "";
    updateOutput(current);
    updateHistory("");
  }


  // Number key events
  const numbers = document.getElementsByClassName("num__key");
  for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener("click", function () {
      const digit = this.id;
      // If operator is null, current is empty, and previous exists, move previous to current
      if (operator === null && current === "" && previous !== "") {
        current = previous;
        previous = "";
      }
      current += digit;
      updateOutput(current);
    });
  }

  // Operator key events
  const operators = document.getElementsByClassName("op__key");
  for (let i = 0; i < operators.length; i++) {
    operators[i].addEventListener("click", function () {
      const id = this.id;

      switch (id) {
        case "clear":
          clearAll();
          break;
        case "backspace":
          deleteLast();
          break;
        case "=":
          if (current !== "" && previous !== "") {
            calculate();
          }
          break;
        default:
          // Allow changing operator if previous exists, current is empty, and operator is null
          if (current === "" && previous !== "" && operator === null) {
            operator = id;
            updateHistory(`${formatNumber(previous)} ${operator}`);
            updateOutput("");
            return;
          }
          if (current === "") return;

          if (previous !== "") {
            calculate();
          }

          operator = id;
          previous = current;
          current = "";
          updateHistory(`${formatNumber(previous)} ${operator}`);
          updateOutput("");
          break;
      }
    });
  }
});





const themeBtn = document.getElementById('themeToggle');
const body = document.body;

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
  themeBtn.textContent = "🌙";
}

// Toggle theme
themeBtn.addEventListener("click", () => {
  body.classList.toggle("dark");
  const isDark = body.classList.contains("dark");
  themeBtn.textContent = isDark ? "🌙" : "🌞";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});
//for sound
const clickSound = document.getElementById('clickSound');
const themeSound = document.getElementById('themeSound');


document.querySelectorAll('.number, .operator').forEach(btn => {
  btn.addEventListener('click', () => {
    clickSound.currentTime = 0;
    clickSound.play();
  });
});


document.getElementById('themeToggle').addEventListener('click', () => {
  themeSound.currentTime = 0;
  themeSound.play();
});

