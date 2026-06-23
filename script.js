const typeColors = {
    normal: '#A8A878', fire: '#F08030', water: '#6890F0', electric: '#F8D030',
    grass: '#78C850', ice: '#98D8D8', fighting: '#C03028', poison: '#A040A0',
    ground: '#E0C068', flying: '#A890F0', psychic: '#F85888', bug: '#A8B820',
    rock: '#B8A038', ghost: '#705898', dragon: '#7038F8', dark: '#705848',
    steel: '#B8B8D0', fairy: '#EE99AC'
};



function renderNavbar() {
  const navContainer = document.querySelector("nav");
  const navbarHTML = `
    <div class="navbar border-bottom border-body">
      <div class="container-fluid">
        <div class="navbar-brand d-flex align-items-center gap-3 mb-0 h1 nes-text text-white">
          <i class="nes-pokeball"></i>
          <span>POKÉDEX</span>
        </div>
      </div>
    </div>
  `;
  navContainer.innerHTML = navbarHTML;
}

renderNavbar();

async function loadPokedex() {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=20";
  try {
    const container = document.getElementById("pokedex-container");
    const bufferHTML = `
    <div class = "col-12 text-center mt-5"><span class="nes-text is-warning h2">LOADING DATABANKS...</span</div>
    `
    container.innerHTML = bufferHTML;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();

    const detailedPromises = result.results.map(async (pokemon) => {
      const new_url = pokemon.url;
      const new_response = await fetch(new_url);
      return new_response.json();
    });

    const detailedPokemonData = await Promise.all(detailedPromises);
    renderCards(detailedPokemonData);
  } catch (error) {
    console.log("Network Error:", error);
  }
}

loadPokedex();


function renderCards(pokemonList) {
  const container = document.getElementById("pokedex-container");
  const cardsHTML = pokemonList.map(pokemon => {
    const primaryType = pokemon.types[0].type.name;
    const cardTint = `${typeColors[primaryType]}26`
    const spriteURL = pokemon.sprites.front_default;

    const badgesHTML = pokemon.types.map(typeObj => {
      const typeName = typeObj.type.name;
      const badgeColor = typeColors[typeName];
      return `<span class = "badge" style = "background-color: ${badgeColor};color: white">${typeName}</span>`
    }).join('');

    return `
    <div class="col-12 col-md-6 col-lg-3">
                <div class="card h-100 text-center nes-pointer" style="background-color: ${cardTint}; border-color: var(--border);">
      <div class="card-body d-flex flex-column align-items-center justify-content-center">
      <img style="image-rendering: pixelated" src=${spriteURL} class = "w-50 mb-3">
      <h5 class = "text-white">${pokemon.name.toUpperCase()}</h5>
      <div class = "badges d-flex gap-2">
      ${badgesHTML}
    </div>
      </div>
                </div>
            </div>
    `;
  }).join('');

  container.innerHTML = cardsHTML;
}

