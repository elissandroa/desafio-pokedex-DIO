

const pokemonList = document.getElementById("pokemon-list");
const loadMoreButton = document.getElementById("loadMoreButton");
const maxRecords = 151;
const limit = 10;
let offset = 0;


async function pokemonCard(id) {
    let pokemon = await pokeApi.getPokemon(id);
    loadMoreButton.parentElement.removeChild(loadMoreButton)
    pokemonList.innerHTML = `
    <div class="pokemon-container fire pokemon-detail">
            <div class="pokemon-header">
                <i class="bi bi-arrow-left arrow" onClick={location.reload()}></i>
                <i class="bi bi-heart"></i>
            </div>
            <div class="title-container">
                <div class="pokemon-title">
                    <h2>${pokemon.name}</h2>
                    <div class="pokemon-types">
                        ${pokemon.types.map((type) => `<p class="pokemon-types type ${type}">${type}</p>`).join('')}
                    </div>
                </div>
                <div class="number">
                    #${pokemon.number}
                </div>
            </div>
            <div class="pokemon-image">
                <img src="${pokemon.photo}"
                    alt="Pokemon">
            </div>
            <div class="features-container">
                <ul class="nav-features">
                    <div>
                        <li class="isNotActive">About</li>
                    </div>
                    <div>
                        <li>Base stats</li>
                    </div>
                    <div>
                        <li class="isNotActive">Evolution</li>
                    </div>
                    <div>
                        <li class="isNotActive">Moves</li>
                    </div>
                </ul>
                ${pokemon.stats.map((stat) => `<div class="features">
                    
                    <p>${stat.stat.name}</p><span>${stat.base_stat}</span><span><progress id="progress" value="${stat.base_stat}" max="100"> ${stat.base_stat}% </progress></span>
                </div>`).join('')}
                <p class="footer-title">Type Defenses</p>
                <p class="footer-content">The Efectiveness of each type on Charmander</p>
            </div>
        </div>
`
}


function loadPokemonItems(offset, limit) {

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type} pokemonCard" onClick={pokemonCard(${pokemon.number})}>
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>
                    <div class="detail">
                        <ol class="types">
                         ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                        <img src="${pokemon.photo}"
                            alt="${pokemon.name}">
                    </div>
                </li>
        `).join('')

        pokemonList.innerHTML += newHtml;
    })
}

loadPokemonItems(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordNextPage = offset + limit;
    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItems(offset, newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItems(offset, limit)
    }
})


