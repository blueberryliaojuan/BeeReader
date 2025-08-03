// validationUtils.js - common validation functions

export function validateUsernameFormat(username) {
  if (!username) return "Username is required.";
  if (username.length < 3 || username.length > 16)
    return "Username must be 3–16 characters.";
  if (!/^[a-zA-Z0-9_-]+$/.test(username))
    return "Only letters, numbers, _ and - allowed.";
  return "";
}
export function validatePassword(password) {
  if (password.length < 8)
    return "Password must be at least 8 characters long.";
  if (!/[A-Z]/.test(password)) return "At least one uppercase letter required.";
  if (!/[a-z]/.test(password)) return "At least one lowercase letter required.";
  if (!/[0-9]/.test(password)) return "At least one number required.";
  if (!/[!@#$%^&*()_\-+=<>?/[\]{}|\\]/.test(password))
    return "Must include a special character.";
  return "";
}

export function validateEmailFormat(email) {
  if (!email) return "Email is required.";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Please enter a valid email address.";
  return "";
}

export function validatePhone(phone) {
  if (!phone) return "";
  // Remove all whitespace characters for validation
  const normalized = phone.replace(/\s+/g, "");

  // Standard 10-digit phone number formats with optional delimiters
  const regex = /^\(?\d{3}\)?[-.]?\d{3}[-.]?\d{4}$/;

  if (!regex.test(normalized)) return "Invalid phone number.";
  return "";
}

// Validate profile picture file type and size (optional field)
export function validateProfilePicture(fileInput) {
  if (fileInput.files.length === 0) return "";
  const file = fileInput.files[0];
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (!allowedTypes.includes(file.type)) {
    return "Only JPG, PNG, GIF files are allowed.";
  }
  if (file.size > 2 * 1024 * 1024) {
    return "Maximum file size is 2MB.";
  }
  return "";
}
