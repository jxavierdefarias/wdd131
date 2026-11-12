// OBJETOS + ARRAY
const produtos = [
    {id:1, nome:"Cabide Veludo Preto", tipo:"veludo", preco:2.5, img:"images/cabide-veludo.webp"},
    {id:2, nome:"Cabide Madeira Nobre", tipo:"madeira", preco:4.9, img:"images/cabide-madeira.webp"},
    {id:3, nome:"Cabide Veludo Rosa", tipo:"veludo", preco:2.7, img:"images/cabide-veludo.webp"}
];

let favoritos = JSON.parse(localStorage.getItem("favoritosModelit")) || [];

// FUNÇÃO 1 - Renderizar com TEMPLATE LITERAL + ARRAY METHODS
function renderizarProdutos(lista = produtos){
    const container = document.getElementById("lista-produtos");
    if(!container) return;
    container.innerHTML = "";
    lista.forEach(prod => {
        const card = document.createElement("div");
        card.className = "card";
        // TEMPLATE LITERAL OBRIGATÓRIO
        card.innerHTML = `
            <img src="${prod.img}" alt="${prod.nome}" loading="lazy" width="300" height="200">
            <h3>${prod.nome}</h3>
            <p>R$ ${prod.preco.toFixed(2)}</p>
            <button data-id="${prod.id}" class="btn-fav">${favoritos.includes(prod.id) ? "★ Remover" : "☆ Favoritar"}</button>
        `;
        container.appendChild(card);
    });
    document.querySelectorAll(".btn-fav").forEach(btn => btn.addEventListener("click", toggleFavorito));
    document.getElementById("total-favoritos").textContent = favoritos.length;
}

// FUNÇÃO 2 - Interação DOM + CONDICIONAL + localStorage
function toggleFavorito(e){
    const id = parseInt(e.target.dataset.id);
    // BRANCH CONDICIONAL
    if(favoritos.includes(id)){
        favoritos = favoritos.filter(f => f !== id);
    } else {
        favoritos.push(id);
    }
    localStorage.setItem("favoritosModelit", JSON.stringify(favoritos));
    renderizarProdutos(document.querySelectorAll("[data-filtro].ativo") ? produtos : produtos);
    // Atualiza filtro atual
    const filtroAtivo = document.querySelector(".filtros button.ativo")?.dataset.filtro || "todos";
    filtrar(filtroAtivo);
}

function filtrar(tipo){
    let filtrados = tipo === "todos" ? produtos : produtos.filter(p => p.tipo === tipo);
    renderizarProdutos(filtrados);
}

// EVENTOS DOM
document.addEventListener("DOMContentLoaded", ()=>{
    renderizarProdutos();
    // Menu mobile
    const menuBtn = document.getElementById("menu");
    const nav = document.querySelector(".navegacao");
    if(menuBtn){ menuBtn.addEventListener("click", ()=> nav.classList.toggle("open")); }

    // Filtros
    document.querySelectorAll("[data-filtro]").forEach(b=>{
        b.addEventListener("click", (e)=>{
            document.querySelectorAll("[data-filtro]").forEach(x=>x.classList.remove("ativo"));
            e.target.classList.add("ativo");
            filtrar(e.target.dataset.filtro);
        });
    });

    // localStorage visitas
    let visitas = parseInt(localStorage.getItem("visitasModelit") || "0") + 1;
    localStorage.setItem("visitasModelit", visitas);
    const elVisitas = document.getElementById("visitas");
    if(elVisitas) elVisitas.textContent = visitas;

    // Última visita com condicional
    const ultima = localStorage.getItem("ultimaVisita");
    const msgEl = document.getElementById("mensagem-visita");
    if(msgEl){
        if(ultima){
            msgEl.textContent = `Bem-vindo de volta! Última visita em ${ultima}`;
        } else {
            msgEl.textContent = "Bem-vindo! Essa é sua primeira visita.";
        }
        localStorage.setItem("ultimaVisita", new Date().toLocaleDateString("pt-BR"));
    }

    document.getElementById("currentyear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = `Última Modificação: ${document.lastModified}`;
});