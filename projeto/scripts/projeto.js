// projeto.js
const produtos = [
    {id:1, nome:"Cabide Terno Luxo", tipo:"Terno", preco:3.5, img:"imagens/hero-modelit.webp"},
    {id:2, nome:"Cabide Botton Saia", tipo:"Botton", preco:4.9, img:"imagens/botonpresilhas.webp"},
    {id:3, nome:"Cabide Boutique Giratório", tipo:"Boutique", preco:2.80, img:"imagens/boutiquegiratorio.webp"},
    {id:4, nome:"Cabide      Hotel ", tipo:"Hotel", preco:5.60, img:"imagens/cabidehotel.webp"},
    {id:5, nome:"Cabide  magazine preto", tipo:"Magazine", preco:1.85, img:"imagens/magazinepr.webp"},
    {id:6, nome:"Cabide  magazine Transparente", tipo:"Magazine", preco:2.10, img:"imagens/magazinetr.webp"}
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
    document.getElementById("total-favoritos").textContent = favoritos.length;
}



function filtrar(tipo){
    let filtrados = tipo === "todos" ? produtos : produtos.filter(p => p.tipo === tipo);
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
    if(menuBtn){ menuBtn.addEventListener("click", ()=> nav.classList.toggle("open")); }

    
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

    document.getElementById("currentyear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = `Última Modificação: ${document.lastModified}`;
});