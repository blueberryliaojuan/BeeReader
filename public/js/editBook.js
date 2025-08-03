/**
 * @file editBook.js
 * @description Handles the Edit Book form behavior:
 *              - Displays a live preview of uploaded cover image
 *              - Submits updated book info to backend via PUT request
 *              - Navigates user back to library page upon success
 *
 * @author Juan Liao
 * @created 2025-06-09
 */

// -------------------- DOM Elements --------------------
const form = document.getElementById("book-form"); // The form element
const coverInput = document.getElementById("cover"); // File input for book cover
const coverPreview = document.getElementById("cover-preview"); // Image preview element
const submitBtn = form.querySelector("button[type='submit']"); // Submit button

// -------------------- Global Data --------------------
const { id, image_url } = window.bookData || {}; // Book ID and existing cover URL from server

// -------------------- Cover Preview Handler --------------------
coverInput.addEventListener("change", () => {
  const file = coverInput.files[0];
  if (file) {
    // Read selected file and display as preview
    const reader = new FileReader();
    reader.onload = (e) => {
      coverPreview.src = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    // If no file selected, revert to original cover (if exists)
    coverPreview.src = image_url || "";
  }
});

// -------------------- Form Submission Handler --------------------
form.addEventListener("submit", async function (e) {
  e.preventDefault(); // Prevent full page reload

  const formData = new FormData(form); // Includes all input values and file
  submitBtn.disabled = true; // Disable submit to prevent duplicate requests

  try {
    const response = await fetch(`/api/books/${id}`, {
      method: "PUT",
      body: formData,
      credentials: "include", // Ensure cookies (session) are sent
    });

    const result = await response.json();

    if (result.state === "1") {
      alert("Book saved successfully!");
      window.location.href = "/library"; // Redirect after success
    } else {
      alert("Save failed: " + result.message);
    }
  } catch (error) {
    console.error("Submit error:", error);
    alert("Something went wrong.");
  } finally {
    submitBtn.disabled = false; // Re-enable submit button
  }
});
