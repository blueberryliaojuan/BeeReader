document
  .getElementById("searchBtn")
  .addEventListener("click", async function () {
    const query = document.getElementById("searchInput").value.trim();
    // if (!query) return;

    try {
      const response = await fetch(
        `/api/books?search=${encodeURIComponent(query)}`
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
        div.innerHTML = `
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
