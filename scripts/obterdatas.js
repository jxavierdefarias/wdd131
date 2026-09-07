document.ge// pega o ano atual - usando seu id anoatual
const ano = document.getElementById("anoatual");
if (ano) {
    ano.textContent = new Date().getFullYear();
}


// pega ultima modificação em português
const lastMod = document.getElementById("lastModified");
if (lastMod) {
    const data = new Date(document.lastModified);
    lastMod.textContent = `Última modificação: ${data.toLocaleString("pt-BR")}`;
}