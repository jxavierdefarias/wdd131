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
    urlDaImagem: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x250/payson-utah-temple-exterior-1416671-wallpaper.jpg"
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
    nomeDoTemplo: "Cidade do México México",
    localizacao: "Cidade do México, México",
    consagracao: "1983, 2 de dezembro",
    area: 116642,
    urlDaImagem: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    nomeDoTemplo: "St. George Utah",
    localizacao: "St. George, Utah, Estados Unidos",
    consagracao: "1877, 6 de abril",
    area: 11000,
    urlDaImagem: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/st-george-utah/400x250/st-george-temple-lds-149536-wallpaper.jpg"
  },
  {
    nomeDoTemplo: "Colonia Juarez México",
    localizacao: "Colonia Juarez, México",
    consagracao: "1999, 6 de março",
    area: 6800,
    urlDaImagem: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/colonia-juarez-mexico/400x250/colonia-juarez-mexico-temple-lds-941524-wallpaper.jpg"
  },
  {
    nomeDoTemplo: "Bismarck Dakota do Norte",
    localizacao: "Bismarck, Dakota do Norte, Estados Unidos",
    consagracao: "1999, 19 de setembro",
    area: 8500,
    urlDaImagem: "https://churchofjesuschristtemples.org/assets/img/temples/bismarck-north-dakota-temple/bismarck-north-dakota-temple-4070-main.jpg"
  }
];

const container = document.querySelector(".album") || document.querySelector("#album") || document.querySelector("main");

function mostrarTemplos(lista) {
  const albumDiv = document.querySelector(".album");
  if (albumDiv) albumDiv.innerHTML = "";
  else {
    const titulos = container.querySelectorAll("section");
    titulos.forEach(s => s.remove());
  }

  lista.forEach(templo => {
    let card = document.createElement("section");
    let nome = document.createElement("h3");
    let local = document.createElement("p");
    let data = document.createElement("p");
    let tamanho = document.createElement("p");
    let img = document.createElement("img");

    nome.textContent = templo.nomeDoTemplo;
    local.textContent = `Localização: ${templo.localizacao}`;
    data.textContent = `Dedicado: ${templo.consagracao}`;
    tamanho.textContent = `Tamanho: ${templo.area} sq ft`;
    img.setAttribute("src", templo.urlDaImagem);
    img.setAttribute("alt", templo.nomeDoTemplo);
    img.setAttribute("loading", "lazy");

    card.appendChild(nome);
    card.appendChild(local);
    card.appendChild(data);
    card.appendChild(tamanho);
    card.appendChild(img);

    if (albumDiv) albumDiv.appendChild(card);
    else container.appendChild(card);
  });
}

mostrarTemplos(templos);

document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const filtro = e.target.textContent.trim();
    document.querySelector("h2").textContent = filtro;

    if (filtro === "Página Inicial") mostrarTemplos(templos);
    else if (filtro === "Antigo") mostrarTemplos(templos.filter(t => parseInt(t.consagracao.split(",")[0]) < 1900));
    else if (filtro === "Novo") mostrarTemplos(templos.filter(t => parseInt(t.consagracao.split(",")[0]) > 2000));
    else if (filtro === "Grande") mostrarTemplos(templos.filter(t => t.area > 90000));
    else if (filtro === "Pequeno") mostrarTemplos(templos.filter(t => t.area < 10000));
  });
});