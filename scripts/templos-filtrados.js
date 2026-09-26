document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Ultima Modificação: ${document.lastModified}`;

const btn = document.getElementById("menu");
const nav = document.querySelector(".navigation");
btn.addEventListener("click", () => {
    nav.classList.toggle("open");
    btn.classList.toggle("open");
});

const templos = [
  {
    nomeDoTemplo: "Aba Nigeria",
    localizacao: "Aba, Nigéria",
    consagracao: "2005, 7 de agosto",
    area: 11500,
    urlDaImagem: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    nomeDoTemplo: "Manti Utah",
    localizacao: "Manti, Utah, Estados Unidos",
    consagracao: "1888, 21 de maio",
    area: 74792,
    urlDaImagem: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    nomeDoTemplo: "Payson Utah",
    localizacao: "Payson, Utah, Estados Unidos",
    consagracao: "2015, 7 de junho",
    area: 96630,
    urlDaImagem: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    nomeDoTemplo: "Yigo Guam",
    localizacao: "Yigo, Guam",
    consagracao: "2020, 2 de maio",
    area: 6861,
    urlDaImagem: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    nomeDoTemplo: "Washington D.C.",
    localizacao: "Kensington, Maryland, Estados Unidos",
    consagracao: "1974, 19 de novembro",
    area: 156558,
    urlDaImagem: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    nomeDoTemplo: "Lima Peru",
    localizacao: "Lima, Peru",
    consagracao: "1986, 10 de janeiro",
    area: 9600,
    urlDaImagem: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    nomeDoTemplo: "Cidade do México, México",
    localizacao: "Cidade do México, México",
    consagracao: "1983, 2 de dezembro",
    area: 116642,
    urlDaImagem: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
    {
    nomeDoTemplo: "Bismarck Dakota do Norte",
    localizacao: "Bismarck, Dakota do Norte, Estados Unidos",
    consagracao: "1999, 19 de setembro",
    area: 8500,
    urlDaImagem: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    nomeDoTemplo: "Salt Lake City Utah",
    localizacao: "Salt Lake City, Utah, Estados Unidos",
    consagracao: "1893, 6 de abril",
    area: 156558,
    urlDaImagem: "https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-15669-main.jpg"
  },
  {
    nomeDoTemplo: "Nauvoo Illinois",
    localizacao: "Nauvoo, Illinois, Estados Unidos",
    consagracao: "1846, 29 de julho",
    area: 12000,
    urlDaImagem: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/nauvoo-illinois/400x250/nauvoo-temple-756499-wallpaper.jpg"
  }
];

const container = document.querySelector(".grid");
const titulo = document.querySelector("#titulo-pagina");

function exibir(lista) {
  container.innerHTML = "";
  lista.forEach(templo => {
    const card = document.createElement("section");
    const h3 = document.createElement("h3");
    const pLocal = document.createElement("p");
    const pCons = document.createElement("p");
    const pArea = document.createElement("p");
    const img = document.createElement("img");
    h3.textContent = templo.nomeDoTemplo;
    pLocal.innerHTML = `<span class="label">Localização:</span> ${templo.localizacao}`;
    pCons.innerHTML = `<span class="label">Dedicado:</span> ${templo.consagracao}`;
    pArea.innerHTML = `<span class="label">Tamanho:</span> ${templo.area} sq ft`;
    img.setAttribute("src", templo.urlDaImagem);
    img.setAttribute("alt", templo.nomeDoTemplo);
    img.setAttribute("loading", "lazy");
    card.append(h3, pLocal, pCons, pArea, img);
    container.appendChild(card);
  });
}

function getAno(str) { return parseInt(str.split(",")[0]); }

function filtrar(tipo) {
  let lista = templos;
  if (tipo === "antigos") lista = templos.filter(t => getAno(t.consagracao) < 1900);
  if (tipo === "novos") lista = templos.filter(t => getAno(t.consagracao) > 2000);
  if (tipo === "grandes") lista = templos.filter(t => t.area > 90000);
  if (tipo === "pequenos") lista = templos.filter(t => t.area < 10000);
  if (titulo) {
    if (tipo === "inicio") titulo.textContent = "Página Inicial";
    if (tipo === "antigos") titulo.textContent = "Antigo";
    if (tipo === "novos") titulo.textContent = "Novo";
    if (tipo === "grandes") titulo.textContent = "Grande";
    if (tipo === "pequenos") titulo.textContent = "Pequeno";
  }
  exibir(lista);
  nav.classList.remove("open");
  btn.classList.remove("open");
}

document.getElementById("inicio").addEventListener("click", (e) => { e.preventDefault(); filtrar("inicio"); });
document.getElementById("antigos").addEventListener("click", (e) => { e.preventDefault(); filtrar("antigos"); });
document.getElementById("novos").addEventListener("click", (e) => { e.preventDefault(); filtrar("novos"); });
document.getElementById("grandes").addEventListener("click", (e) => { e.preventDefault(); filtrar("grandes"); });
document.getElementById("pequenos").addEventListener("click", (e) => { e.preventDefault(); filtrar("pequenos"); });

exibir(templos);