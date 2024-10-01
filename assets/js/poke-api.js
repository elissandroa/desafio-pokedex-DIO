const pokeApi = {};
const urlPokemon = "https://pokeapi.co/api/v2/pokemon";

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.name = pokeDetail.name;
    pokemon.number = pokeDetail.id;


    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    return pokemon;

}

function convertToPokemonDetailCard(pokemon) {
    const pokemonDetail = new PokemonDetail();
    pokemonDetail.number = pokemon.id;
    pokemonDetail.name = pokemon.name;
    pokemonDetail.height = pokemon.height;
    pokemonDetail.weight = pokemon.weight;
    const types = pokemon.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;
    pokemonDetail.types = types;
    pokemonDetail.abilities = pokemon.abilities;
    pokemonDetail.stats = pokemon.stats;
    pokemonDetail.photo = pokemon.sprites.other.dream_world.front_default;
    pokemonDetail.stats = pokemon.stats;
    return pokemonDetail;
}

pokeApi.getPokemonsDeltails = async (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon);
}

pokeApi.getPokemons = async (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
        .then((response) => response.json()
            .then((jsonBody) => jsonBody.results)
            .then((pokemons) => pokemons.map(pokeApi.getPokemonsDeltails))
            .then((detailRequest) => Promise.all(detailRequest))
            .then((pokemonDetails) => pokemonDetails)
        ).catch((err) => console.error(err));
}

pokeApi.getPokemon = (id) => {
    return fetch(`${urlPokemon}/${id}`)
        .then((response) => response.json())
        .then(convertToPokemonDetailCard)
        .then((pokemon) => pokemon)
}
