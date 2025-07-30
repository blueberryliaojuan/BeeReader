const signInBtn = document.getElementById("signIn");
const signUpBtn = document.getElementById("signUp");
const fistForm = document.getElementById("form1");
const secondForm = document.getElementById("form2");
const container = document.querySelector(".container");

const emailInput = document.getElementById("email");
const emailError = document.getElementById("email-error");

const usernameInput = document.getElementById("username");
const usernameError = document.getElementById("username-error");

const passwordInput = document.getElementById("password");
const passwordError = document.getElementById("password-error");

const signInEmail = document.getElementById("signInEmail");
const signInPassword = document.getElementById("signInPassword");

signInBtn.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

signUpBtn.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

emailInput.addEventListener("blur", async (e) => {
  const email = e.target.value.trim();
  if (!email) {
    emailError.textContent = "";
    return;
  }
  // Validate email format
  const formatError = validateEmailFormat(email);
  if (formatError) {
    emailError.textContent = formatError;
    return;
  }
  // Check email availability
  await checkEmailAvailability(email);
});
function checkEmailAvailability(email) {
  return fetch("/api/users/checkEmailAvailability", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.state === "0") {
        emailError.textContent = "This email is already registered.";
        return false; // Email is taken
      } else {
        emailError.textContent = "";
        return true; // Email is available
      }
    })
    .catch((error) => {
      emailError.textContent = "Unable to check email. Please try again later.";
      console.error("Error checking email availability:", error);
      return false; // Assume not available on error
    });
}

// Validate email format
function validateEmailFormat(email) {
  if (!email) return "Email is required.";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address.";
  }

  return ""; // if valid, return empty string
}

usernameInput.addEventListener("blur", () => {
  const username = usernameInput.value.trim();
  const formatError = validateUsernameFormat(username);
  if (formatError) {
    usernameError.textContent = formatError;
    return;
  } else {
    usernameError.textContent = "";
  }
});
usernameInput.addEventListener("input", () => {
  const username = usernameInput.value.trim();
  const formatError = validateUsernameFormat(username);
  if (!formatError) {
    usernameError.textContent = ""; // ✅
  }
});
function validateUsernameFormat(username) {
  if (!username) return "Username is required.";
  if (username.length < 3 || username.length > 16) {
    return "Username must be 3–16 characters.";
  }
  if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
    return "Username can only contain letters, numbers, _ and -.";
  }
  return ""; // good format
}

passwordInput.addEventListener("blur", () => {
  const password = passwordInput.value.trim();
  const error = validatePassword(password);
  passwordError.textContent = error || "";
});
function validatePassword(password) {
  if (password.length < 8) {
    return "Password must be at least 8 characters long.";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter.";
  }
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter.";
  }
  if (!/[0-9]/.test(password)) {
    return "Password must contain at least one number.";
  }
  if (!/[!@#$%^&*()_\-+=<>?/[\]{}|\\]/.test(password)) {
    return "Must contain at least one special character.";
  }
  return ""; // 合格时返回空字符串
}

//sign up
fistForm.addEventListener("submit", async (e) => {
  // console.log("e", e);
  // console.log("e.target", e.target);
  e.preventDefault();
  const email = emailInput.value.trim();
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();
  emailError.textContent = "";
  usernameError.textContent = "";
  passwordError.textContent = "";

  // Validate inputs
  let hasError = false;
  const emailFormatError = validateEmailFormat(email);
  if (emailFormatError) {
    emailError.textContent = emailFormatError;
    hasError = true;
  }
  const usernameFormatError = validateUsernameFormat(username);
  if (usernameFormatError) {
    usernameError.textContent = usernameFormatError;
    hasError = true;
  }
  const passwordFormatError = validatePassword(password);
  if (passwordFormatError) {
    passwordError.textContent = passwordFormatError;
    hasError = true;
  }
  if (hasError) return;

  const formData = new FormData();
  formData.append("email", email);
  formData.append("username", username);
  formData.append("password", password);
  console.log("formData", formData);
  try {
    const response = await fetch("/api/users/signup", {
      method: "POST",
      body: formData, // browser automatically sets Content-Type to multipart/form-data
    });
    const result = await response.json();
    console.log("result", result);
    if (result.state === "1") {
      // window.location.href = "/home";
      //to login
      container.classList.remove("right-panel-active");
      alert("Registration successful! You can now log in.");
    } else {
      alert(`Failed to register: ${result.msg}`);
    }
  } catch {}
});

//sign in
secondForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("Sign in Form Submitted");
  const email = signInEmail.value.trim();
  const password = signInPassword.value.trim();

  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);
  console.log("formData", formData);
  // Make a POST request to login endpoint
  try {
    const response = await fetch("/api/users/signin", {
      method: "POST",
      body: formData, // browser automatically sets Content-Type to multipart/form-data
      credentials: "include",
    });
    const result = await response.json();
    console.log("result", result);
    if (result.state === "1") {
      //besides of saving the user info in localstorage, I stored it in req.session.user
      localStorage.setItem("user_id", JSON.stringify(result.data.id));
      window.location.href = "/library";
    } else {
      alert(`Failed to login: ${result.msg}`);
    }
  } catch (error) {
    console.error("Error during sign-in:", error);
  }
});
