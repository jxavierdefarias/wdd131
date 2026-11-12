const produtos = [
    { id: "cab-vel-preto", name: "Cabide de Veludo Preto - Premium" },
    { id: "cab-vel-rosa", name: "Cabide de Veludo Rosa" },
    { id: "cab-mad-nobre", name: "Cabide de Madeira Nobre" },
    { id: "cab-plast-transp", name: "Cabide Plástico Cristal" },
    { id: "cab-infantil", name: "Cabide Infantil Colorido" },
    { id: "cab-plast-preto", name: "Cabide Plástico Preto Reforçado" }
];

const selectEl = document.getElementById("produto");
produtos.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p.id;
    opt.textContent = p.name;
    selectEl.appendChild(opt);
});

document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Última Modificação: ${document.lastModified}`;