
import { useNavigate } from 'react-router-dom'; 
import React, { useState, useContext } from 'react';
import { ListPokemonContext } from '../../../context/ListPokemonContext';
import { getPokemonById } from '../../../services/getPokemons.js';

import "./Search.css";
import Modal from '../../../elements/Modal';
import Mensaje from '../../../elements/Mensaje';
import logoPokemon from '../../../assets/logo_pokemon.png'

const Search = ({ onSearch }) => {

	const navigate = useNavigate();

	// ESTADO GLOBAL
	// variable 'listPokemons' con el valor []
	// funcion asociada del useContext: updateListPokemons()
	const { listPokemons, updateListPokemons } = useContext(ListPokemonContext);

	// ESTADO
	// variable 'imagenDefault' con el valor ''
	// funcion asociada del Estado: setImagenDefault()
	const [imagenDefault, setImagenDefault] = useState(true);

	// ESTADO
	// variable 'searchTerm' con el valor ''
	// funcion asociada del Estado: setSearchTerm()
	const [searchTerm, setSearchTerm] = useState('');

	// ESTADO
	// variable 'loading' con el valor 'false'
	// funcion asociada del Estado: setLoading()
	const [loading, setLoading] = useState(false);

	// ESTADO para mostrar el mensaje de error
	// variable 'errorMessage' con el valor ''
	// funcion asociada del Estado: setErrorMessage()
	const [errorMessage, setErrorMessage] = useState('');

	// actualizamos el valor de 'searchTerm' 
	const handle_searchChange = (e) => {
		const { value } = e.target;
		setSearchTerm(value);
	};

	// llamada a la función fetch cuando se pulsa el boton 'Buscar'
	const handle_searchClick = async () => {

		setErrorMessage(''); // errorMessage = ''
		setLoading(true); // activamos el estado cargando
		
		// obtenemos el campo de busqueda
		const pokemonValue = searchTerm.toLowerCase().trim();

		// si el campo de busqueda no está vacio
		if (pokemonValue !== "") {
			try {
				// realizamos el fetch
				await getPokemonById(pokemonValue).then(dataPoke => {

					// comparamos si el Pokémon de 'dataPoke'
					// existe en listPokemons.item, devuelve true o false
					const existeValor = listPokemons.some(item => 
						item.name === dataPoke.name || item.id === dataPoke.id
					);
	
					// si no existe el pokemon, lo agregamos al estado global de listPokemons
					if (!existeValor) {
						updateListPokemons(dataPoke);
					}
					
					setSearchTerm('');
					setImagenDefault(false); // ocultamos la imagen
					setLoading(false); // loading = false, desactivamos el estado de carga
					onSearch([dataPoke]); // enviamos el Pokémon al Componente padre
					
					// redirigimos al listado ListaPokemon con los datos del Pokémon
					navigate('/listapokemonsbuscados', { pokemon: dataPoke } );
				})
			} catch (error) {
				setLoading(false); // loading = false
				setErrorMessage('Error. El Pokémon no existe en la API');
				console.error("Error. El Pokémon no existe en la API", error);
			}
		} else {
			setLoading(false); // loading = false
			setErrorMessage('Error. Introduce un nombre o número de Pokemon');
		}
	}

	// llamada a la función fetch cuando se pulsa el boton 'Buscar'
	const handle_arrListPokemons = async () => {

		setErrorMessage(''); // errorMessage = ''

		// si el campo de busqueda no está vacio
		if (listPokemons.length > 0) {
			try {
				console.log("Pokemons ya buscados=", listPokemons);
				onSearch(listPokemons); // enviamos los pokemons de contexto al Componente padre

				// redirigimos al formulario con los datos del Pokémon
				navigate('/listapokemonsbuscados', { pokemon: listPokemons } );

			} catch (error) {
				setErrorMessage('Warning. No hay Pokemons');
				console.warn("Error. No hay Pokemons", error);
			}
		} else {
			setErrorMessage('Error. El listado de Pokemons esta vacio');
		}
	}

	return (
		<>
			<div className="boxSearch">
				<div className="search">
					<input
						type="text"
						value={searchTerm}
						onChange={handle_searchChange}
						placeholder="Buscar por nombre o por numero"
					/>
					<button onClick={handle_searchClick}>Buscar Pokemon</button>
					<button onClick={handle_arrListPokemons}>Mostrar Pokemons Buscados</button>
				</div>
				<div className="search-info">Buscar pokemons (hasta 1.025)</div>
			</div>

			{
				// si estamos cargando datos, mostramos la capa Modal
				loading && <Modal style="white"/>
			}

			{
				// imagen del logo
				imagenDefault && 
					<div className="boxLogo">
						<img width="300" src={logoPokemon} alt="Logo" />
					</div>
			}
			
			{
				// capa de Mensajes
				errorMessage && <Mensaje tipo="error" texto={errorMessage}/>
			}
		</>
	);
};

export default Search; 
