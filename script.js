function renderNavbar() {
 const navContainer = document.querySelector("nav");
 const navbarHTML = `
 <div class = "navbar border-bottom border-body">
 <div class = "container-fluid">
 <div class = "navbar-brand d-flex align-items-center gap-3 mb-0 h1 nes-text text-white">
 <i class ="nes-pokeball"></i>
 <span>POKEDEX</span></div>
 </div>
 </div>
 `
 navContainer.innerHTML = navbarHTML;
 }

renderNavbar();

async function loadPokedex() {
 const url = "https://pokeapi.co/api/v2/pokemon?limit=20";
 try {
 const response = await fetch(url);
 if (!response.ok) {
 throw new Error(`Response status: ${response.status}`);
 }
 const result = await response.json();
 console.log(result);
 } catch (error) {
 console.log("Network Error:", error);
 }
 }

loadPokedex();
