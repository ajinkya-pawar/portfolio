// --- Global Variables & API Endpoints ---
let isLogin = true;
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const authForm = document.getElementById("authForm"); // Renamed from 'form' to avoid conflict
const emailField = document.getElementById("email");

// Get the contact form
const contactForm = document.querySelector("#contact form");

// Backend API Endpoints
const API_BASE_URL = "https://portfolio-backend-rp78.onrender.com";
const REGISTER_API_URL = `${API_BASE_URL}/register`;
const LOGIN_API_URL = `${API_BASE_URL}/login`;
const CONTACT_API_URL = `${API_BASE_URL}/contact`;

// --- Modal Functions (Login/Register) ---
function openModal() {
  modal.classList.remove("hidden");
  updateAuthForm(); // Use updateAuthForm to reflect the current state
}

function closeModal() {
  modal.classList.add("hidden");
  authForm.reset();
  isLogin = true; // Reset to login state when closing
  updateAuthForm();
}

function toggleAuth() {
  isLogin = !isLogin;
  updateAuthForm();
}

function updateAuthForm() {
  modalTitle.innerText = isLogin ? "Login" : "Register";
  const toggleText = authForm.querySelector("p");
  toggleText.innerText = isLogin
    ? "Don’t have an account? Register"
    : "Already have an account? Login";

  if (!isLogin) {
    emailField.classList.remove("hidden");
    emailField.required = true;
  } else {
    emailField.classList.add("hidden");
    emailField.required = false;
  }
}

// --- Event Listener for Login/Register Form Submission ---
authForm.addEventListener("submit", async function (e) {
  e.preventDefault(); // Prevent default form submission

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const email = document.getElementById("email").value; // Only used for registration

  let apiUrl = "";
  let requestBody = {};

  if (isLogin) {
    apiUrl = LOGIN_API_URL;
    requestBody = {
      username: username,
      password: password,
    };
  } else {
    apiUrl = REGISTER_API_URL;
    requestBody = {
      username: username,
      email: email,
      password: password,
    };
  }

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json(); // Parse JSON response

    if (response.ok) {
      // Check for successful HTTP status (200-299)
      if (isLogin) {
        alert(data.message + " Redirecting to welcome page..."); // Optional: show a quick alert
        localStorage.setItem('loggedInUser', username); // Store username in localStorage
        // If your backend also returns a token (e.g., JWT), store it here:
        // localStorage.setItem('authToken', data.token);
        window.location.href = 'welcome.html'; // Redirect to welcome page
      } else {
        alert(data.message); // For registration, just show success message
        closeModal(); // Close modal after successful registration
      }
    } else {
      // Handle API errors (e.g., 400, 401, 500)
      alert(`Error: ${data.detail || data.message || "Something went wrong."}`); // Display error message from backend
    }
  } catch (error) {
    // Handle network errors (e.g., server unreachable)
    console.error("Fetch error:", error);
    alert("Network error. Please try again later.");
  }
});

// --- Event Listener for Contact Form Submission ---
contactForm.addEventListener("submit", async function (e) {
  e.preventDefault(); // Prevent default form submission

  // Get values from contact form inputs
  const name = contactForm.querySelector('input[placeholder="Your Name"]').value;
  const email = contactForm.querySelector(
    'input[placeholder="Your Email"]'
  ).value;
  const message = contactForm.querySelector(
    'textarea[placeholder="Your Message"]'
  ).value;

  const requestBody = {
    name: name,
    email: email,
    message: message,
  };

  try {
    const response = await fetch(CONTACT_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Message sent successfully!");
      contactForm.reset(); // Clear the form after successful submission
    } else {
      alert(`Error sending message: ${data.detail || data.message || "Please try again."}`);
    }
  } catch (error) {
    console.error("Contact form fetch error:", error);
    alert("Network error. Could not send message.");
  }
});

// --- Dynamic Utilities (from your original script, keep as is) ---
// These functions are not directly related to API calls but were part of your original script.
// They can be used to dynamically update parts of your portfolio page if needed.

function updateAboutSection(text) {
  const about = document.getElementById("about-text");
  if (about) about.innerText = text;
}

function addSkill(skillName) {
  const skillsGrid = document.getElementById("skills-grid");
  if (skillsGrid) {
    const div = document.createElement("div");
    div.className = "bg-white shadow p-4 rounded";
    div.innerText = skillName;
    skillsGrid.appendChild(div);
  }
}

function addCertification(title, link) {
  const certs = document.getElementById("certifications-list");
  if (certs) {
    const li = document.createElement("li");
    li.innerHTML = `<a href="${link}" class="text-blue-600 underline" target="_blank">${title}</a>`;
    certs.appendChild(li);
  }
}

// Initial form update when the page loads (ensures correct modal state if opened immediately)
document.addEventListener('DOMContentLoaded', updateAuthForm);

// Optional: Hide the login button if user is already logged in (only useful if you don't redirect on page load)
// For your current setup where login redirects to welcome.html, this is less critical
// but if you ever make an SPA or want to keep user on same page, uncomment and adapt.
/*
document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.querySelector('button[onclick="openModal()"]');
    if (localStorage.getItem('loggedInUser')) {
        if (loginButton) {
            loginButton.style.display = 'none'; // Or replace with a "Dashboard" button
        }
    }
});
*/