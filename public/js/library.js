// Delete
document.querySelectorAll(".delete-btn").forEach((button) => {
  button.addEventListener("click", function () {
    const li = this.closest("li"); // safer
    const bookId = li.getAttribute("data-id");

    // dialog
    const confirmed = confirm("Are you sure you want to delete this book?");
    if (!confirmed) return;

    fetch(`/api/books/${bookId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          li.remove(); // delete the book from the page
          alert("Deletion successful");
        } else {
          alert("Delete failed");
        }
      })
      .catch((err) => {
        console.error("Delete error:", err);
        alert("Delete error");
      });
  });
});

// add new
document.getElementById("new-btn").addEventListener("click", () => {
  window.location.href = `/addNewBook`;
});

//edit

document.querySelectorAll(".edit-btn").forEach((button) => {
  button.addEventListener("click", function () {
    const li = this.closest("li"); // safer
    const bookId = li.getAttribute("data-id");
    window.location.href = `/editBook/${bookId}`;
  });
});
