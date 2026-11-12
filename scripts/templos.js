
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Ultima Modificação: ${document.lastModified}`;

const btn = document.getElementById("menu");
const nav = document.querySelector(".navigation");
btn.addEventListener("click", () => {
    nav.classList.toggle("open");
    btn.classList.toggle("open");
});