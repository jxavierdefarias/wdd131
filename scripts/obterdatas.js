// ano atual
document.getElementById("currentyear").textContent = new Date().getFullYear();

// ultima modificação em português
const dataMod = new Date(document.lastModified);
const formatada = dataMod.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
});


document.getElementById("lastModified").textContent = `Última modificação: ${formatada}`;