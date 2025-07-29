let isLogin = true;
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const form = document.getElementById("authForm");
const emailField = document.getElementById("email");

function openModal() {
  modal.classList.remove("hidden");
  updateForm();
}

function closeModal() {
  modal.classList.add("hidden");
  form.reset();
  isLogin = true;
  updateForm();
}

function toggleAuth() {
  isLogin = !isLogin;
  updateForm();
}

function updateForm() {
  modalTitle.innerText = isLogin ? "Login" : "Register";
  const toggleText = form.querySelector("p");
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

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const email = document.getElementById("email").value;

  if (isLogin) {
    alert(`Logging in user: ${username}`);
    // TODO: Replace with actual login logic
  } else {
    alert(`Registering user: ${username} (${email})`);
    // TODO: Replace with actual register logic
  }

  closeModal();
});

// Dynamic utilities (if needed)
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
