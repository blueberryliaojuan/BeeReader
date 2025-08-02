/**
 * @file auth.js
 * @description Handles client-side login,logout, registration, validation, and UI switching
 *              - Email / username / password validation
 *              - Form submissions for sign-up and sign-in
 *              - Email availability check (AJAX)
 *              - DOM toggle between login and registration panel
 *
 * Dependencies: fetch API, session-based auth, FormData API
 * @author Juan
 * @created 2025-08-02
 */

// -------------------- DOM Elements --------------------
const signInBtn = document.getElementById("signIn");
const signUpBtn = document.getElementById("signUp");
const fistForm = document.getElementById("form1"); // Sign Up
const secondForm = document.getElementById("form2"); // Sign In
const container = document.querySelector(".container");

// Form fields
const emailInput = document.getElementById("email");
const emailError = document.getElementById("email-error");

const usernameInput = document.getElementById("username");
const usernameError = document.getElementById("username-error");

const passwordInput = document.getElementById("password");
const passwordError = document.getElementById("password-error");

const signInEmail = document.getElementById("signInEmail");
const signInPassword = document.getElementById("signInPassword");

const confirmPasswordInput = document.getElementById("conform-password");
const confirmPasswordError = document.getElementById("conform-password-error");

// -------------------- UI Toggle: Switch Panels --------------------
signInBtn.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});
signUpBtn.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

// -------------------- Email Validation & Availability --------------------
emailInput.addEventListener("blur", async (e) => {
  const email = e.target.value.trim();
  if (!email) {
    emailError.textContent = "";
    return;
  }

  const formatError = validateEmailFormat(email);
  if (formatError) {
    emailError.textContent = formatError;
    return;
  }

  await checkEmailAvailability(email);
});

// Format validation
function validateEmailFormat(email) {
  if (!email) return "Email is required.";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Please enter a valid email address.";
  return "";
}

// AJAX check if email is available
function checkEmailAvailability(email) {
  return fetch("/api/users/checkEmailAvailability", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.state === "0") {
        emailError.textContent = "This email is already registered.";
        return false;
      } else {
        emailError.textContent = "";
        return true;
      }
    })
    .catch((err) => {
      console.error("Error checking email availability:", err);
      emailError.textContent = "Unable to check email. Please try again later.";
      return false;
    });
}

// -------------------- Username Validation --------------------
usernameInput.addEventListener("blur", () => {
  const error = validateUsernameFormat(usernameInput.value.trim());
  usernameError.textContent = error || "";
});
usernameInput.addEventListener("input", () => {
  const error = validateUsernameFormat(usernameInput.value.trim());
  if (!error) usernameError.textContent = "";
});
function validateUsernameFormat(username) {
  if (!username) return "Username is required.";
  if (username.length < 3 || username.length > 16)
    return "Username must be 3–16 characters.";
  if (!/^[a-zA-Z0-9_-]+$/.test(username))
    return "Only letters, numbers, _ and - allowed.";
  return "";
}

// -------------------- Password Validation --------------------
passwordInput.addEventListener("blur", () => {
  const error = validatePassword(passwordInput.value.trim());
  passwordError.textContent = error || "";
});
function validatePassword(password) {
  if (password.length < 8)
    return "Password must be at least 8 characters long.";
  if (!/[A-Z]/.test(password)) return "At least one uppercase letter required.";
  if (!/[a-z]/.test(password)) return "At least one lowercase letter required.";
  if (!/[0-9]/.test(password)) return "At least one number required.";
  if (!/[!@#$%^&*()_\-+=<>?/[\]{}|\\]/.test(password))
    return "Must include a special character.";
  return "";
}
// -------------------- Validate Confirm Password --------------------
function validateConfirmPassword(password, confirmPassword) {
  if (confirmPassword === "") return "Please confirm your password.";
  if (password !== confirmPassword) return "Passwords do not match.";
  return "";
}
//when blur, validate the confirm password
confirmPasswordInput.addEventListener("blur", () => {
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();
  const error = validateConfirmPassword(password, confirmPassword);
  confirmPasswordError.textContent = error || "";
});
//clear error
confirmPasswordInput.addEventListener("input", () => {
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();
  const error = validateConfirmPassword(password, confirmPassword);
  if (!error) {
    confirmPasswordError.textContent = "";
  }
});

// -------------------- Sign Up Form Submission --------------------
fistForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();

  // Clear all previous error messages
  emailError.textContent = "";
  usernameError.textContent = "";
  passwordError.textContent = "";
  confirmPasswordError.textContent = "";

  // Validate all fields
  let hasError = false;
  const emailErr = validateEmailFormat(email);
  const usernameErr = validateUsernameFormat(username);
  const passwordErr = validatePassword(password);
  const confirmPasswordErr = validateConfirmPassword(password, confirmPassword);

  if (emailErr) {
    emailError.textContent = emailErr;
    hasError = true;
  }
  if (usernameErr) {
    usernameError.textContent = usernameErr;
    hasError = true;
  }
  if (passwordErr) {
    passwordError.textContent = passwordErr;
    hasError = true;
  }
  if (confirmPasswordErr) {
    confirmPasswordError.textContent = confirmPasswordErr;
    hasError = true;
  }
  if (hasError) return;

  const formData = new FormData();
  formData.append("email", email);
  formData.append("username", username);
  formData.append("password", password);

  try {
    const res = await fetch("/api/users/signup", {
      method: "POST",
      body: formData,
    });
    const result = await res.json();

    if (result.state === "1") {
      container.classList.remove("right-panel-active");
      alert("Registration successful! You can now log in.");
    } else {
      alert(`Failed to register: ${result.msg}`);
    }
  } catch (err) {
    console.error("Sign-up error:", err);
    alert("Something went wrong during registration.");
  }
});

// -------------------- Sign In Form Submission --------------------
secondForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("Sign in Form Submitted");

  const email = signInEmail.value.trim();
  const password = signInPassword.value.trim();

  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);

  try {
    const res = await fetch("/api/users/signin", {
      method: "POST",
      body: formData,
      credentials: "include", // keep session cookie
    });
    const result = await res.json();

    if (result.state === "1") {
      localStorage.setItem("user_id", JSON.stringify(result.data.id));
      window.location.href = "/library";
    } else {
      alert(`Failed to login: ${result.msg}`);
    }
  } catch (err) {
    console.error("Error during sign-in:", err);
    alert("Something went wrong while logging in.");
  }
});
