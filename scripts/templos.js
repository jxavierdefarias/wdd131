
const year = document.querySelector("#currentyear");
const lastMod = document.querySelector("#lastModified");

year.textContent = new Date().getFullYear();
lastMod.textContent = `Last Modification: ${document.lastModified}`;


const hamButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

hamButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
    hamButton.classList.toggle("open");
});