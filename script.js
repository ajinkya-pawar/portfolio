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
  if (toggleText) {
    toggleText.innerText = isLogin
      ? "Don’t have an account? Register"
      : "Already have an account? Login";
  }

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
    // TODO: Replace with backend logic or Firebase
  } else {
    alert(`Registering user: ${username} (${email})`);
    // TODO: Replace with backend logic or Firebase
  }

  closeModal();
});

// Dynamic content update helpers
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

// Ensure fallback sections exist
window.addEventListener("DOMContentLoaded", () => {
  const anchor = document.getElementById("contact") || document.body;

  if (!document.getElementById("about-text")) {
    const aboutSection = document.createElement("section");
    aboutSection.id = "about";
    aboutSection.innerHTML = `
      <h3>About Me</h3>
      <p id="about-text">I’m a developer with a passion for AI-powered solutions...</p>
    `;
    anchor.parentNode.insertBefore(aboutSection, anchor);
  }

  if (!document.getElementById("skills-grid")) {
    const skillSection = document.createElement("section");
    skillSection.id = "skills";
    skillSection.innerHTML = `
      <h3>Skills</h3>
      <div id="skills-grid" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-center"></div>
    `;
    anchor.parentNode.insertBefore(skillSection, anchor);
  }

  if (!document.getElementById("certifications-list")) {
    const certSection = document.createElement("section");
    certSection.id = "certifications";
    certSection.innerHTML = `
      <h3>Certifications</h3>
      <ul id="certifications-list" class="list-disc ml-6 space-y-2"></ul>
    `;
    anchor.parentNode.insertBefore(certSection, anchor);
  }
});
