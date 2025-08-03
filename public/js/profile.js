import {
  validateUsernameFormat,
  validatePassword,
  validateEmailFormat,
  validatePhone,
  validateProfilePicture,
} from "./validations.js";

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
  const addressInput = document.getElementById("address");
  const profilePictureInput = document.getElementById("profile_picture");
  const existingImage = document.getElementById("existingImage");

  const nameError = document.getElementById("username-error");
  const phoneError = document.getElementById("phone-error");
  const profilePictureError = document.getElementById("profile_picture-error");

  function setError(elem, message) {
    elem.textContent = message;
  }

  function clearError(elem) {
    elem.textContent = "";
  }

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

  form.addEventListener("submit", async (e) => {
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
      e.preventDefault();
      console.log("Form blocked due to validation errors");
    } else {
      e.preventDefault();
      //API
      const userId = form.dataset.userid;
      console.log("userId", userId);

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
        console.log("updateUser", updateUser);
        const result = await updateUser.json();
        console.log("result", result.data);

        if (result.state === "1") {
          alert("Update successful! ");
          const updatedUser = result.data;

          // Update UI with new data
          nameInput.value = updatedUser.username || "";
          phoneInput.value = updatedUser.phone || "";
          addressInput.value = updatedUser.address || "";
          existingImage.value = updatedUser.profile_picture || "";

          // update avatar image
          const avatarImg = document.getElementById("avatar-image");
          if (avatarImg && updatedUser.profile_picture) {
            avatarImg.src = updatedUser.profile_picture;
          }
        } else {
          alert(`Failed to update: ${result.message}`);
        }
      } catch (err) {
        console.error("Sign-up error:", err);
        alert("Something went wrong when update the profile.");
      }
    }
  });
});
