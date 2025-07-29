const backendBaseURL = "https://your-backend-url.onrender.com"; // ✅ Replace with actual URL

if (isLogin) {
  // Login fetch
  fetch(`${backendBaseURL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  })
    .then(res => {
      if (!res.ok) throw new Error("Login failed");
      return res.json();
    })
    .then(data => {
      alert("Login successful!");
      console.log("Token:", data.token); // Save token to localStorage if needed
      closeModal();
    })
    .catch(err => {
      alert("Error: " + err.message);
    });
} else {
  // Register fetch
  fetch(`${backendBaseURL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password, email })
  })
    .then(res => {
      if (!res.ok) throw new Error("Registration failed");
      return res.json();
    })
    .then(data => {
      alert("Registration successful!");
      closeModal();
    })
    .catch(err => {
      alert("Error: " + err.message);
    });
}
