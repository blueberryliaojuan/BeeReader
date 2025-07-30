document
  .getElementById("searchBtn")
  .addEventListener("click", async function () {
    const query = document.getElementById("searchInput").value.trim();
    // if (!query) return;

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

      libraryBooks.forEach((book) => {
        const div = document.createElement("div");
        div.className = "book-card";
        div.setAttribute("data-book-id", book.id);

        div.innerHTML = `
    <button class="add-btn" title="Add to Reading List">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        width="20"
        height="20"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 4v16m8-8H4"
        />
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

//click + icon to add into reading list
//Bind the event listener to the parent .book-scroll-container using event delegation.
//After fetching and rendering the list from a search, no longer need to attach event listeners to each child element individually.

const container = document.querySelector(".book-scroll-container");
const userId = window.userId;
container.addEventListener("click", async (e) => {
  if (e.target.closest(".add-btn")) {
    const button = e.target.closest(".add-btn");
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
      console.log("result", result);
      console.log("response", response);
      if (response.ok) {
        alert("Added to Reading List!");
        await fetchAndRenderReadingList();
      } else {
        alert(`Failed: ${result.msg}`);
      }
    } catch (err) {
      console.error("Add to reading list error:", err);
      alert("Error adding book");
    }
  }
});

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

    // Create container for the list
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
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
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

//delete from the reading list

const readingListContainer = document.getElementById("readingListContainer");

readingListContainer.addEventListener("click", async (e) => {
  const removeBtn = e.target.closest(".remove-btn");

  if (!removeBtn) return; // Not a remove button

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
      await fetchAndRenderReadingList(); // reload
    } else {
      alert(`Failed to remove:${result.msg} `);
    }
  } catch (err) {
    console.error("Delete book failed:", err);
    alert("Something went wrong");
  }
});
