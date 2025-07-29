const backendBaseURL = "https://portfolio-backend-rp78.onrender.com/";

if (isLogin) {

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
      console.log("Token:", data.token);  
      closeModal();
    })
    .catch(err => {
      alert("Error: " + err.message);
    });
} else {
 
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
