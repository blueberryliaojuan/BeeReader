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
