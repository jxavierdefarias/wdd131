document.getElementById("currentyear").textContent = new Date().getFullYear();

const mod = new Date(document.lastModified);
document.getElementById("lastModified").textContent = `Última modificação: ${mod.toLocaleString("pt-BR")}`;