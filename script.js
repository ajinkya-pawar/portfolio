const backendBaseURL = "https://portfolio-backend-rp78.onrender.com";

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const email = document.getElementById("email").value.trim();

  const endpoint = isLogin ? "/login" : "/register";
  const payload = isLogin
    ? { username, password }
    : { username, email, password };

  try {
    const response = await fetch(`${backendBaseURL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      alert(`❌ Error: ${result.detail || result.message || "Something went wrong"}`);
    } else {
      alert(`✅ Success: ${result.message}`);
      console.log("Token:", result.token || "No token returned");
      closeModal(); // Close modal on success
    }
  } catch (error) {
    console.error("❌ Network error:", error);
    alert("❌ Network error. Try again later.");
  }

  if (!response.ok) {
  alert(`❌ Error: ${result.detail || result.message || "Something went wrong"}`);
} else {
  alert(`✅ Success: ${result.message}`);
  
  if (result.token) {
    localStorage.setItem("authToken", result.token);
    localStorage.setItem("username", username);
    console.log("Token stored in localStorage:", result.token);
  }

  closeModal();
}
});

window.addEventListener("DOMContentLoaded", () => {
  const storedUser = localStorage.getItem("username");
  if (storedUser) {
    document.getElementById("loginBtn").innerText = `Logout (${storedUser})`;
    document.getElementById("loginBtn").onclick = () => {
      localStorage.removeItem("authToken");
      localStorage.removeItem("username");
      alert("Logged out successfully!");
      window.location.reload(); // Refresh page
    };
  }
});
