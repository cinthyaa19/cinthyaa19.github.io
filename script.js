/* filepath: c:\Users\cinthya\intelix\script.js */
let selectedNumber = null;

function selectNumber(num) {
  selectedNumber = num;
  document.getElementById("numberInput").value = num;
  updateDisplay(num);
}

function updateDisplay(value) {
  const displayText = document.getElementById("displayText");
  if (value && value.toString().trim() !== "") {
    displayText.textContent = value;
    displayText.style.color = "#2196f3";
    displayText.classList.remove("placeholder-text");
  } else {
    displayText.textContent = "Ketik atau pilih angka";
    displayText.style.color = "rgba(33, 150, 243, 0.4)";
    displayText.classList.add("placeholder-text");
  }
}

function clearNumber() {
  selectedNumber = null;
  document.getElementById("numberInput").value = "";
  updateDisplay("");
}

function focusInput() {
  document.getElementById("numberInput").focus();
}

function generatePattern() {
  const input = document.getElementById("numberInput").value.trim();
  const outputDiv = document.getElementById("output");

  // Validasi input
  if (!input) {
    outputDiv.innerHTML = `
        <div class="empty-state">
            <svg class="empty-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <p>Masukkan angka terlebih dahulu</p>
        </div>
    `;
    showNotification("Masukkan angka dulu ya!", "error");
    return;
  }

  // Cek apakah input adalah angka valid dan dalam rentang 1-9
  const num = parseFloat(input);
  if (isNaN(num) || !Number.isInteger(num) || num < 1 || num > 9) {
    outputDiv.innerHTML = `
        <div class="empty-state">
            <svg class="empty-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>
            <p>Input tidak valid!</p>
        </div>
    `;
    showNotification("Input tidak valid! Masukkan angka 1-9.", "error");
    return;
  }

  const n = parseInt(num);
  let result = `Input = ${n}\n\nOutput:\n`;

  // Membuat pola sesuai aturan
  for (let i = 1; i <= n; i++) {
    let line = "";
    for (let j = 1; j <= i; j++) {
      line += i;
      if (j < i) line += " ";
    }
    result += line + "\n";
  }

  outputDiv.textContent = result;
  showNotification("Pola berhasil dibuat! 🎉", "success");
}

function clearOutput() {
  const outputDiv = document.getElementById("output");

  outputDiv.innerHTML = `
          <div class="empty-state">
              <svg class="empty-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <p>Pola akan muncul di sini</p>
          </div>
      `;
  clearNumber();
}

function showNotification(text, type) {
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = text;

  document.body.appendChild(notification);

  setTimeout(() => notification.classList.add("show"), 100);

  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 400);
  }, 3000);
}

// Event listeners
document.addEventListener("DOMContentLoaded", function() {
  // Keyboard support dan real-time input handling
  document
    .getElementById("numberInput")
    .addEventListener("input", function (e) {
      const value = e.target.value;
      selectedNumber = value;
      updateDisplay(value);
    });

  document
    .getElementById("numberInput")
    .addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        generatePattern();
      }
    });

  // Focus handling untuk input
  document
    .getElementById("numberInput")
    .addEventListener("focus", function () {
      document.getElementById("numberDisplay").style.borderColor = "#2196f3";
      document.getElementById("numberDisplay").classList.add("cursor-active");
    });

  document
    .getElementById("numberInput")
    .addEventListener("blur", function () {
      document.getElementById("numberDisplay").style.borderColor = "#bbdefb";
      document.getElementById("numberDisplay").classList.remove("cursor-active");
    });
});