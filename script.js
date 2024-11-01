let display = document.getElementById("display");
let historyPanel = document.getElementById("historyPanel");
let historyList = document.getElementById("historyList");

let currentInput = "";
let shouldClearDisplay = false;
let history = [];

function appendNumber(number) {
    if (shouldClearDisplay) {
        currentInput = "";
        shouldClearDisplay = false;
    }
    currentInput += number;
    updateDisplay();
}

function appendSymbol(symbol) {
    if (shouldClearDisplay && symbol !== ".") {
        currentInput = display.innerText;
        shouldClearDisplay = false;
    }
    currentInput += symbol;
    updateDisplay();
}

function clearDisplay() {
    currentInput = "";
    updateDisplay();
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function calculateResult() {
    try {
        let result = eval(currentInput.replace(/÷/g, '/').replace(/×/g, '*'));
        display.classList.add("flash");
        display.addEventListener("animationend", () => display.classList.remove("flash"), { once: true });

        display.innerText = result;
        
        // Store the calculation in history
        addToHistory(`${currentInput} = ${result}`);

        currentInput = result.toString();
        shouldClearDisplay = true;
    } catch {
        display.innerText = "Error";
        shouldClearDisplay = true;
    }
}

function updateDisplay() {
    display.innerText = currentInput || "0";
}

// Add calculation to history and limit to 10 entries
function addToHistory(calculation) {
    if (history.length >= 10) {
        history.shift(); // Remove the oldest entry
    }
    history.push(calculation);
    updateHistoryPanel();
}

// Update the history panel with latest entries
function updateHistoryPanel() {
    historyList.innerHTML = history.map(entry => `<li>${entry}</li>`).join('');
}

// Toggle the visibility of the history panel
function toggleHistory() {
    historyPanel.style.display = historyPanel.style.display === "none" ? "block" : "none";
}
