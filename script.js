const modal = document.getElementById("authModal");
const authTitle = document.getElementById("authTitle");
const authForm = document.getElementById("authForm");
let isLogin = true;

function openLogin() {
  modal.style.display = "block";
}

function closeLogin() {
  modal.style.display = "none";
  authForm.reset();
}

function toggleAuth() {
  isLogin = !isLogin;
  authTitle.innerText = isLogin ? "Login" : "Register";
  document.querySelector(".switch").innerText = isLogin
    ? "Don't have an account? Register"
    : "Already have an account? Login";
}

authForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  alert(isLogin ? `Logging in ${username}` : `Registering ${username}`);
  closeLogin();
});
