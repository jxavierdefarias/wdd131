document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

const menuBtn = document.getElementById("menuBtn");
const mainNav = document.getElementById("mainNav");
if(menuBtn){
    menuBtn.addEventListener("click", () => mainNav.classList.toggle("open"));
}

function calculateWindChill(tempC, windKmh) {
    let wc = 13.12 + 0.6215 * tempC - 11.37 * Math.pow(windKmh, 0.16) + 0.3965 * tempC * Math.pow(windKmh, 0.16);
    return wc.toFixed(1) + " °C";
}
async function getWeather() {
  const url = "https://api.open-meteo.com/v1/forecast?latitude=-23.55&longitude=-46.63&current=temperature_2m,wind_speed_10m,weather_code&timezone=America%2FSao_Paulo";
  try {
    const res = await fetch(url);
    const data = await res.json();
    const cur = data.current;
    if(!document.querySelector("#temp")) return;
    document.querySelector("#temp").textContent = Math.round(cur.temperature_2m);
    document.querySelector("#wind").textContent = cur.wind_speed_10m;
    document.querySelector("#windchill").textContent = calculateWindChill(Math.round(cur.temperature_2m), cur.wind_speed_10m);
    const codes = {0:"Céu Limpo",1:"Pred. Limpo",2:"Parcial. Nublado",3:"Encoberto",45:"Nevoeiro",51:"Chuvisco",61:"Chuva Leve",80:"Pancadas",95:"Trovoada"};
    document.querySelector("#condicoes").textContent = codes[cur.weather_code] || "Parcial. Nublado";
  } catch(e){}
}
getWeather();

// --- CATÁLOGO DINÂMICO ---
const products = [
    { nome: "Cabide Acrílico Cristal", material: "acrilico", preco: "R$ 3,50", img: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=300" },
    { nome: "Cabide Acrílico Preto", material: "acrilico", preco: "R$ 3,80", img: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=300" },
    { nome: "Cabide Veludo Preto", material: "veludo", preco: "R$ 2,80", img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300" },
    { nome: "Cabide Veludo Rosa", material: "veludo", preco: "R$ 2,80", img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300" },
    { nome: "Cabide Madeira Nobre", material: "madeira", preco: "R$ 5,50", img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=300" },
    { nome: "Cabide Infantil", material: "madeira", preco: "R$ 4,00", img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=300" }
];

const grid = document.getElementById("product-grid");
function renderProducts(filtro = "todos"){
    if(!grid) return;
    grid.innerHTML = "";
    const filtrados = filtro === "todos" ? products : products.filter(p => p.material === filtro);
    filtrados.forEach(p => {
        grid.innerHTML += `
        <div class="card">
            <img src="${p.img}" alt="${p.nome}" style="width:100%; height:150px; object-fit:cover;">
            <h3 style="margin-top:0.5rem;">${p.nome}</h3>
            <p>${p.preco} / un.</p>
            <small>${p.material.toUpperCase()}</small>
        </div>`;
    });
}
renderProducts();

document.querySelectorAll(".filters button").forEach(btn => {
    btn.addEventListener("click", (e) => {
        document.querySelectorAll(".filters button").forEach(b=>b.classList.remove("active"));
        e.target.classList.add("active");
        renderProducts(e.target.dataset.filter);
    });
});

// --- FORMULÁRIO DINÂMICO ---
const form = document.getElementById("formOrcamento");
if(form){
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const nome = document.getElementById("nome").value;
        const qtd = document.getElementById("qtd").value;
        const tipo = document.getElementById("tipo").value;
        const msgDiv = document.getElementById("mensagemSucesso");
        msgDiv.style.display = "block";
        msgDiv.innerHTML = `Obrigado, ${nome}! <br> Seu pedido de ${qtd} cabides de ${tipo} foi recebido. Entraremos no WhatsApp em 2h!`;
        form.reset();
        localStorage.setItem("ultimoOrcamento", JSON.stringify({nome, qtd, tipo, data: new Date()}));
    });
}