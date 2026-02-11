const passwordInput = document.getElementById("password");
const strengthFill = document.getElementById("strengthFill");
const strengthText = document.getElementById("strengthText");
const generatedPassword = document.getElementById("generatedPassword");

const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");

// Function to check strength
function checkStrength(password) {
  let score = 0;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  return score;
}

// Update UI based on strength
function updateStrengthUI(score) {
  if (score === 0) {
    strengthFill.style.width = "0%";
    strengthText.textContent = "Strength: --";
    strengthFill.style.background = "transparent";
  }
  else if (score === 1) {
    strengthFill.style.width = "25%";
    strengthFill.style.background = "red";
    strengthText.textContent = "Strength: Weak";
  }
  else if (score === 2) {
    strengthFill.style.width = "50%";
    strengthFill.style.background = "orange";
    strengthText.textContent = "Strength: Medium";
  }
  else if (score === 3) {
    strengthFill.style.width = "75%";
    strengthFill.style.background = "#00c6ff";
    strengthText.textContent = "Strength: Strong";
  }
  else if (score === 4) {
    strengthFill.style.width = "100%";
    strengthFill.style.background = "lime";
    strengthText.textContent = "Strength: Very Strong";
  }
}

// Event: When user types password
passwordInput.addEventListener("input", () => {
  const password = passwordInput.value;
  const score = checkStrength(password);
  updateStrengthUI(score);
});

// Generate strong password
function generatePassword() {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}[]<>?";
  let pass = "";

  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    pass += chars[randomIndex];
  }

  return pass;
}

// Button: Generate password
generateBtn.addEventListener("click", () => {
  const newPass = generatePassword();
  generatedPassword.textContent = "Generated Password: " + newPass;
  passwordInput.value = newPass;

  const score = checkStrength(newPass);
  updateStrengthUI(score);
});

// Button: Copy password
copyBtn.addEventListener("click", () => {
  const textToCopy = passwordInput.value;

  if (textToCopy.trim() === "") {
    alert("Nothing to copy!");
    return;
  }

  navigator.clipboard.writeText(textToCopy);
  alert("Password copied!");
});
