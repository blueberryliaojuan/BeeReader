/**
 * @file readingList.js
 * @description Handles book searching, reading list rendering, and add/remove interactions
 *              Includes:
 *              - Live book search via API
 *              - Adding books to personal reading list
 *              - Deleting books from reading list
 *              - Dynamic DOM updates without page reload
 *
 * Dependencies: fetch API, session-based user auth, DOM event delegation
 * @author Juan Liao
 * @created 2025-06-09
 */

// -------------------- Book Search Handler --------------------
document
  .getElementById("searchBtn")
  .addEventListener("click", async function () {
    const query = document.getElementById("searchInput").value.trim();
    // if (!query) return; // Optional: require input

    try {
      const response = await fetch(
        `/api/books?search=${encodeURIComponent(query)}`,
        { credentials: "include" }
      );

      if (!response.ok) {
        throw new Error(`Search failed: ${response.status}`);
      }

      const result = await response.json();
      const libraryBooks = result.data;

      const container = document.querySelector(".book-scroll-container");
      container.innerHTML = "";

      if (libraryBooks.length === 0) {
        container.innerHTML = "<p style='margin-left:1em;'>No books found.</p>";
        return;
      }

      // Render book cards
      libraryBooks.forEach((book) => {
        const div = document.createElement("div");
        div.className = "book-card";
        div.setAttribute("data-book-id", book.id);

        div.innerHTML = `
          <button class="add-btn" title="Add to Reading List">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 4v16m8-8H4" />
            </svg>
          </button>
          <img src="${book.image_url}" alt="${book.title}" />
          <h4>${book.title}</h4>
          <p>${book.author}</p>
        `;

        container.appendChild(div);
      });
    } catch (err) {
      console.error("Search error:", err);
    }
  });

// -------------------- Add to Reading List (delegated click) --------------------
const container = document.querySelector(".book-scroll-container");
const userId = window.userId; // Injected from EJS template

container.addEventListener("click", async (e) => {
  const button = e.target.closest(".add-btn");
  if (!button) return;

  const bookCard = button.closest(".book-card");
  const bookId = bookCard.getAttribute("data-book-id");

  console.log("bookId", bookId);
  console.log("userId", userId);

  try {
    const response = await fetch("/api/userBooks", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        book_id: bookId,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      alert("Added to Reading List!");
      await fetchAndRenderReadingList(); // Re-render reading list
    } else {
      alert(`Failed: ${result.message}`);
    }
  } catch (err) {
    console.error("Add to reading list error:", err);
    alert("Error adding book");
  }
});

// -------------------- Fetch + Render Reading List --------------------
async function fetchAndRenderReadingList() {
  try {
    const res = await fetch("/api/userBooks", { credentials: "include" });
    if (!res.ok) throw new Error("Failed to fetch reading list");

    const json = await res.json();
    const readingList = json.data;

    const container = document.getElementById("readingListContainer");
    container.innerHTML = "";

    if (readingList.length === 0) {
      container.innerHTML = `
        <p style="margin: 1em; font-size: 1em; color: #555">
          There are no books in your reading list. Would you like to add some?
        </p>
      `;
      return;
    }

    // Build DOM for reading list
    const listDiv = document.createElement("div");
    listDiv.className = "reading-list-container";

    readingList.forEach((book) => {
      const card = document.createElement("div");
      card.className = "reading-card";
      card.setAttribute("data-book-id", book.id);

      card.innerHTML = `
        <button class="remove-btn" title="Remove from Reading List" aria-label="Remove ${book.title}">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" width="18" height="18" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        <img src="${book.image_url}" alt="${book.title}" />
        <div class="reading-info">
          <h3>${book.title}</h3>
          <p class="author">${book.author}</p>
        </div>
      `;

      listDiv.appendChild(card);
    });

    container.appendChild(listDiv);
  } catch (err) {
    console.error("Failed to render reading list", err);
  }
}

// -------------------- Remove from Reading List --------------------
const readingListContainer = document.getElementById("readingListContainer");

readingListContainer.addEventListener("click", async (e) => {
  const removeBtn = e.target.closest(".remove-btn");
  if (!removeBtn) return;

  const card = removeBtn.closest(".reading-card");
  if (!card) return;

  const bookId = card.getAttribute("data-book-id");

  try {
    const response = await fetch(`/api/userBooks/${bookId}`, {
      method: "DELETE",
      credentials: "include",
    });

    const result = await response.json();

    if (response.ok) {
      alert("Removed from Reading List!");
      await fetchAndRenderReadingList(); // Re-render after delete
    } else {
      alert(`Failed to remove: ${result.message}`);
    }
  } catch (err) {
    console.error("Delete book failed:", err);
    alert("Something went wrong");
  }
});
