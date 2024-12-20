// data fetch stuff
let apiUrl = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon`;

const getAllPokemon = () => {
  return fetch(apiUrl).then((res) => res.json());
};

const getPokemonBySearch = (searchTerm) => {
  return fetch(`${apiUrl}/${searchTerm}`).then((res) => res.json());
};

// functionality stuff
let searchButton = document.getElementById("search-button");
let searchInput = document.getElementById("search-input");
let pokeImgContainer = document.getElementById("poke-img-container");
let pokemonName = document.getElementById("pokemon-name");
let pokemonId = document.getElementById("pokemon-id");
let weight = document.getElementById("weight");
let height = document.getElementById("height");
let types = document.getElementById("types");
let hp = document.getElementById("hp");
let attack = document.getElementById("attack");
let defense = document.getElementById("defense");
let speed = document.getElementById("speed");
let specialAttack = document.getElementById("special-attack");
let specialDefense = document.getElementById("special-defense");
let baseExperience = document.getElementById("base-experience");

searchButton.addEventListener("click", (e) => {
  e.preventDefault();

  let searchString = searchInput.value.trim().toLowerCase();

  getPokemon(searchString);
}); // end of click event listener

//clears all display data
const clearDisplay = () => {
  searchInput.value = "";
  pokemonName.innerText = "";
  baseExperience.innerHTML = "";
  pokeImgContainer.innerHTML = "";
  pokemonId.innerText = "";
  weight.innerText = "";
  height.innerText = "";
  types.innerText = "";
  hp.innerText = "";
  attack.innerText = "";
  defense.innerText = "";
  specialAttack.innerText = "";
  specialDefense.innerText = "";
  speed.innerText = "";
  baseExperience.innerText = '';
};

// fetches API and displays data
const getPokemon = async (string) => {
  try {
    const pokemon = await getPokemonBySearch(string);
    console.log(pokemon);

    //set all pokemon info on screen
    pokeImgContainer.innerHTML = `<img id="sprite" src="${pokemon.sprites.front_default}" alt="${pokemon.name} shiny"/>`;
    pokemonId.innerText = ` #${pokemon.id}`;
    pokemonName.innerText = pokemon.name.toUpperCase();
    baseExperience.innerText = `Base Exp:${pokemon.base_experience}`;
    weight.innerText = pokemon.weight;
    height.innerText = pokemon.height;
    types.innerHTML = pokemon.types.map((type) => {
      let typeStr = type.type.name[0].toUpperCase() + type.type.name.slice(1);
      return `<div class="type-div ${typeStr}"><p class="type">${typeStr}</p></div>`;
    }).join("");

    hp.innerText = pokemon.stats[0].base_stat;
    attack.innerText = pokemon.stats[1].base_stat;
    defense.innerText = pokemon.stats[2].base_stat;
    specialAttack.innerText = pokemon.stats[3].base_stat;
    specialDefense.innerText = pokemon.stats[4].base_stat;
    speed.innerText = pokemon.stats[5].base_stat;
    searchInput.value = "";
  } catch (err) {
    clearDisplay();
    window.alert("Pokémon not found");
    console.log(`Not Found: ${err}`);
  }
};
