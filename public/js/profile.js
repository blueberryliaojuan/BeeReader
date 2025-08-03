/**
 * @file profile.js
 * @description Handles user profile form interactions, including input validation,
 *              profile updates via API, and logout functionality.
 *              Uses client-side validation for username, phone, and profile picture fields.
 * @author Juan
 * @created 2025-07-15
 */

import {
  validateUsernameFormat,
  validatePassword,
  validateEmailFormat,
  validatePhone,
  validateProfilePicture,
} from "./validations.js";

// ---------------------- Logout Handling ----------------------
document.getElementById("logout-btn").addEventListener("click", async () => {
  const confirmed = confirm("Are you sure you want to log out?");
  if (!confirmed) return;

  try {
    const response = await fetch(`${window.BASE_URL}/api/users/logout`, {
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

// ---------------------- Profile Form Handling ----------------------
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("profile-form");

  // Input elements
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const addressInput = document.getElementById("address");
  const profilePictureInput = document.getElementById("profile_picture");
  const existingImage = document.getElementById("existingImage");

  // Error message containers
  const nameError = document.getElementById("username-error");
  const phoneError = document.getElementById("phone-error");
  const profilePictureError = document.getElementById("profile_picture-error");

  /**
   * Displays an error message below the input.
   * @param {HTMLElement} elem - Element to show error message in.
   * @param {string} message - Error message.
   */
  function setError(elem, message) {
    elem.textContent = message;
  }

  /**
   * Clears the error message.
   * @param {HTMLElement} elem - Element to clear error message from.
   */
  function clearError(elem) {
    elem.textContent = "";
  }

  /**
   * Validates an input field using a given validation function.
   * @param {HTMLElement} input - Input element.
   * @param {HTMLElement} errorElem - Associated error display element.
   * @param {Function} validateFn - Function to validate input.
   * @returns {boolean} True if valid, false if invalid.
   */
  function validateField(input, errorElem, validateFn) {
    const msg = validateFn(input.value.trim());
    if (msg) {
      setError(errorElem, msg);
      return false;
    } else {
      clearError(errorElem);
      return true;
    }
  }

  // Real-time field validation
  nameInput.addEventListener("blur", () => {
    validateField(nameInput, nameError, validateUsernameFormat);
  });

  phoneInput.addEventListener("blur", () => {
    validateField(phoneInput, phoneError, validatePhone);
  });

  profilePictureInput.addEventListener("change", () => {
    const msg = validateProfilePicture(profilePictureInput);
    if (msg) {
      setError(profilePictureError, msg);
    } else {
      clearError(profilePictureError);
    }
  });

  // ---------------------- Form Submission ----------------------
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const isNameValid = validateField(
      nameInput,
      nameError,
      validateUsernameFormat
    );
    const isPhoneValid = validateField(phoneInput, phoneError, validatePhone);
    const picMsg = validateProfilePicture(profilePictureInput);

    if (picMsg) {
      setError(profilePictureError, picMsg);
    } else {
      clearError(profilePictureError);
    }

    if (!isNameValid || !isPhoneValid || picMsg) {
      console.log("Form blocked due to validation errors");
      return;
    }

    // Prepare data to send to backend
    const userId = form.dataset.userid;
    const formData = new FormData();
    formData.append("username", nameInput.value);
    formData.append("email", emailInput.value);
    formData.append("phone", phoneInput.value);
    formData.append("address", addressInput.value);
    formData.append("existingImage", existingImage.value);

    if (profilePictureInput.files[0]) {
      formData.append("profile_picture", profilePictureInput.files[0]);
    }

    try {
      const updateUser = await fetch(`/api/users/updateProfile/${userId}`, {
        method: "POST",
        body: formData,
      });

      const result = await updateUser.json();

      if (result.state === "1") {
        alert("Update successful!");

        const updatedUser = result.data;

        // Update UI fields
        nameInput.value = updatedUser.username || "";
        phoneInput.value = updatedUser.phone || "";
        addressInput.value = updatedUser.address || "";
        existingImage.value = updatedUser.profile_picture || "";

        // Update avatar image if available
        const avatarImg = document.getElementById("avatar-image");
        if (avatarImg && updatedUser.profile_picture) {
          avatarImg.src = updatedUser.profile_picture;
        }
      } else {
        alert(`Failed to update: ${result.message}`);
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Something went wrong while updating the profile.");
    }
  });
});
