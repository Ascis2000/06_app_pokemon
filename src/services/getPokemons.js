
const API_URL = "https://pokeapi.co/api/v2/pokemon/";

// obtenemos un Pokémon por su nombre o número.
const getPokemonById = async (pokemon) => {
    try {
        const response = await fetch(`${API_URL}/${pokemon}`);
        
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - No se encontró el Pokémon "${pokemon}"`);
        }
        return await response.json();

    } catch (error) {
        console.error("ERROR al obtener el Pokémon:", error.message);
        throw error; // Re-lanzamos el error para manejarlo fuera.
    }
};

// recorrer el listado pasado por argumento para obtener los datos de cada pokemon
const getAllPokemons = async (arr_pokemons) => {
    const response = await fetch(`${API_URL}/${arr_pokemons}`);
    const data = await response.json();
    return data;
}

const getPokemonEvolutions = async (pokemonId) => {
    // Paso 1: Obtener los datos de la especie
    const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`;
    const speciesResponse = await fetch(speciesUrl);
    const speciesData = await speciesResponse.json();

    // Paso 2: Obtener la cadena de evolución desde los datos de la especie
    const evolutionChainUrl = speciesData.evolution_chain.url;
    const evolutionResponse = await fetch(evolutionChainUrl);
    const evolutionData = await evolutionResponse.json();

    // Paso 3: Recorrer la cadena de evolución para obtener los Pokémon involucrados
    const evolutions = [];
    let current = evolutionData.chain;

    // Mientras haya un Pokémon en la cadena de evolución, lo agregamos
    while (current) {
        evolutions.push(current.species.name); 
        current = current.evolves_to[0];
    }
    return evolutions;
};

export { getPokemonById, getAllPokemons, getPokemonEvolutions };