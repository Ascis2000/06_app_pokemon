
import React, { useState } from "react";
import { Route, Routes, Navigate } from 'react-router-dom'
import Search from "./Search";
import SearchDebounce from "./SearchDebounce";
import ListaPokemon from "./ListaPokemon";
import ListaAllPokemons from "./ListaAllPokemons";

import "./Main.css"

function Main() {

	// ESTADO
	// variable 'pokemons' con el valor '[]'
	// Funcion asociada del Estado: setPokemons()
	const [pokemons, setPokemons] = useState([]);

	const handle_searchResults = (results) => {

		console.log("results=====", results); // esto deberia devolver el objeto

		if (results.length > 0) {
			setPokemons(results);
		} else {
			console.warn("No se encontraron Pokémon");
		}
	};

	return (
		<main>
			<div className='dataMain'>
				{
					/* 
					path: define la URL que debe coincidir para que se renderice esta ruta
					element: especifica el componente que se mostrará cuando la ruta coincida 
					*/
				}

					<Routes>
						<Route path="/" element={<Navigate to="/search" />} />
						<Route path="/search" element={<Search onSearch={handle_searchResults} />} />
						<Route path="/searchdebounce" element={<SearchDebounce onSearch={handle_searchResults} />} />
						<Route path="/listall" element={<ListaAllPokemons listaPokemons={pokemons}  start={10} end={50}  />} />
						<Route path="/listapokemonsbuscados" element={<ListaPokemon listaPokemons={pokemons} />} />
						<Route path="*" element={<Navigate to="/search" />} />
					</Routes>
			</div>
		</main>
	);
}

export default Main;
