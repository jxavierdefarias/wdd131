// projeto.js - MODELIT WDD131
const produtos = [
    {id:1, nome:"Cabide Terno Luxo", tipo:"terno", preco:3.5, img:"imagens/hero-modelit.webp"},
    {id:2, nome:"Cabide Botton Saia", tipo:"terno", preco:4.9, img:"imagens/botonpresilhas.webp"},
    {id:3, nome:"Cabide Boutique Giratório", tipo:"acrilico", preco:2.80, img:"imagens/boutiquegiratorio.webp"},
    {id:4, nome:"Cabide Hotel", tipo:"hotel", preco:5.60, img:"imagens/cabidehotel.webp"},
    {id:5, nome:"Cabide Magazine Preto", tipo:"acrilico", preco:1.85, img:"imagens/magazinepr.webp"},
    {id:6, nome:"Cabide Magazine Transparente", tipo:"acrilico", preco:2.10, img:"imagens/magazinetr.webp"}
];

let favoritos = JSON.parse(localStorage.getItem("favoritosModelit")) || [];

function renderizarProdutos(lista = produtos){
    const container = document.getElementById("lista-produtos");
    if(!container) return;
    container.innerHTML = "";
    lista.forEach(prod => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${prod.img}" alt="${prod.nome}" loading="lazy" width="300" height="200">
            <h3>${prod.nome}</h3>
            <p>R$ ${prod.preco.toFixed(2)}</p>
            <button data-id="${prod.id}" class="btn-fav">${favoritos.includes(prod.id) ? "★ Remover" : "☆ Favoritar"}</button>
        `;
        container.appendChild(card);
    });
    document.querySelectorAll(".btn-fav").forEach(btn => btn.addEventListener("click", toggleFavorito));
    const totalEl = document.getElementById("total-favoritos");
    if(totalEl) totalEl.textContent = favoritos.length;
}

function filtrar(tipo){
    // correção: minúsculo + trim para não quebrar
    const filtrados = tipo === "todos" ? produtos : produtos.filter(p => p.tipo.trim().toLowerCase() === tipo.toLowerCase());
    renderizarProdutos(filtrados);
}

function toggleFavorito(e){
    const id = parseInt(e.target.dataset.id);
    if(favoritos.includes(id)){
        favoritos = favoritos.filter(f => f !== id);
    } else {
        favoritos.push(id);
    }
    localStorage.setItem("favoritosModelit", JSON.stringify(favoritos));
    const filtroAtivo = document.querySelector(".filtros button.ativo")?.dataset.filtro || "todos";
    filtrar(filtroAtivo);
}

document.addEventListener("DOMContentLoaded", ()=>{
    renderizarProdutos();
    
    const menuBtn = document.getElementById("menu");
    const nav = document.querySelector(".navegacao");
    if(menuBtn && nav){ 
        menuBtn.addEventListener("click", ()=> nav.classList.toggle("open")); 
    }
    
    document.querySelectorAll("[data-filtro]").forEach(b=>{
        b.addEventListener("click", (e)=>{
            document.querySelectorAll("[data-filtro]").forEach(x=>x.classList.remove("ativo"));
            e.target.classList.add("ativo");
            filtrar(e.target.dataset.filtro);
        });
    });

    let visitas = parseInt(localStorage.getItem("visitasModelit") || "0") + 1;
    localStorage.setItem("visitasModelit", visitas);
    const elVisitas = document.getElementById("visitas");
    if(elVisitas) elVisitas.textContent = visitas;

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

    const yearEl = document.getElementById("currentyear");
    if(yearEl) yearEl.textContent = new Date().getFullYear();
    const modEl = document.getElementById("lastModified");
    if(modEl) modEl.textContent = `Última Modificação: ${document.lastModified}`;
});