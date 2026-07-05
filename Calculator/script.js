// ==============================
// Select Elements
// ==============================

const display = document.getElementById("display");
const historyList = document.getElementById("historyList");

// ==============================
// Append Value
// ==============================

function append(value) {
    display.value += value;
}

// ==============================
// Clear Display
// ==============================

function clearDisplay() {
    display.value = "";
}

// ==============================
// Delete Last Character
// ==============================

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// ==============================
// Calculate Result
// ==============================

function calculate() {

    if (display.value.trim() === "")
        return;

    try {

        const expression = display.value;

        const result = eval(expression);

        addHistory(expression, result);

        display.value = result;

    } catch (err) {

        display.value = "Error";

        setTimeout(() => {

            display.value = "";

        }, 1200);

    }

}

// ==============================
// Add History
// ==============================

function addHistory(expression, result) {

    const li = document.createElement("li");

    li.textContent = `${expression} = ${result}`;

    historyList.prepend(li);

    // Keep only latest 10 calculations

    while (historyList.children.length > 10) {

        historyList.removeChild(historyList.lastChild);

    }

}

// ==============================
// Keyboard Support
// ==============================

document.addEventListener("keydown", (e) => {

    const key = e.key;

    // Numbers
    if (!isNaN(key)) {

        append(key);

    }

    // Operators
    else if (["+", "-", "*", "/", ".", "%"].includes(key)) {

        append(key);

    }

    // Enter
    else if (key === "Enter") {

        e.preventDefault();

        calculate();

    }

    // Backspace
    else if (key === "Backspace") {

        deleteLast();

    }

    // Escape
    else if (key === "Escape") {

        clearDisplay();

    }

});