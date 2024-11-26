
import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { ListPokemonContext, PokemonFetchContext } from './context/ListPokemonContext'

import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";

function App() {
	// Estado global para la lista de Pokémon
    const [listPokemons, setListPokemons] = useState([]);
    const [fetchedPokemons, setFetchedPokemons] = useState([]);

	 // función para actualizar la lista de Pokémon en Search
	 const updateListPokemons = (pokemon) => {
		setListPokemons([...listPokemons, pokemon]);
	};

	// función para actualizar los Pokémon obtenidos en ListAllpokemons
    const updateFetchedPokemons = (pokemons) => {
        setFetchedPokemons(pokemons);
    };

	return (
		<div>
			<BrowserRouter>
				<ListPokemonContext.Provider value={{ listPokemons, updateListPokemons }}>
					<PokemonFetchContext.Provider value={{ fetchedPokemons, updateFetchedPokemons }}>
						<Header />
						<Main />
						<Footer />
					</PokemonFetchContext.Provider>
				</ListPokemonContext.Provider>
			</BrowserRouter>
		</div>
	);
}

export default App;