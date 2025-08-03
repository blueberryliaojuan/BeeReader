document.getElementById("logout-btn").addEventListener("click", async () => {
  const confirmed = confirm("Are you sure you want to log out?");
  if (!confirmed) return;

  try {
    const response = await fetch("/api/users/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      window.location.href = "/login";
    } else {
      alert("Logout failed.");
    }
  } catch (error) {
    console.error("Logout error:", error);
    alert("An error occurred.");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("profile-form");

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");

  const nameError = document.getElementById("username-error");
  const emailError = document.getElementById("email-error");
  const phoneError = document.getElementById("phone-error");

  // Helper: email format check
  function validateEmail(email) {
    if (!email) return "Email is required.";
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) return "Invalid email format.";
    return "";
  }

  function validateUsername(name) {
    if (!name) return "Username is required.";
    if (name.length < 3 || name.length > 20) return "3–20 characters allowed.";
    return "";
  }

  function validatePhone(phone) {
    if (!phone) return "";
    const regex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    if (!regex.test(phone)) return "Invalid phone number.";
    return "";
  }

  // Submit event
  form.addEventListener("submit", (e) => {
    let hasError = false;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();

    nameError.textContent = validateUsername(name);
    emailError.textContent = validateEmail(email);
    phoneError.textContent = validatePhone(phone);

    if (
      nameError.textContent ||
      emailError.textContent ||
      phoneError.textContent
    ) {
      hasError = true;
    }

    if (hasError) {
      e.preventDefault(); // Stop form submission
    }
  });
});
