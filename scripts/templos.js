// Rodapé dinâmico igual da semana passada
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Última modificação: ${document.lastModified}`;

// Menu hamburguer
const menuButton = document.getElementById("menu");
const nav = document.querySelector("nav");
menuButton.addEventListener("click", () => {
    nav.classList.toggle("open");
    menuButton.classList.toggle("open");
});