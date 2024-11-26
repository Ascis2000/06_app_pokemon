
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import { getPokemonById } from '../../../services/getPokemons.js';
import { ListPokemonContext } from '../../../context/ListPokemonContext';

import "./SearchDebounce.css";
import Modal from '../../../elements/Modal';
import Mensaje from '../../../elements/Mensaje';
import logoPokemon from '../../../assets/logo_pokemon.png'

// VER: https://www.npmjs.com/package/react-debounce-input

const SearchDebounce = ({ onSearch }) => {
	const navigate = useNavigate();

	// ESTADO GLOBAL
	// variable 'listPokemons' con el valor []
	// funcion asociada del useContext: updateListPokemons()
	const { listPokemons, updateListPokemons } = useContext(ListPokemonContext);

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

	// DEBOUNCE
	const debounceTimeout = 1000;
	let debounceTimer = null;

	// actualizamos el valor de 'searchTerm' 
	const handle_searchChange = (e) => {
		const { value } = e.target;
		setSearchTerm(value);
	};

	// función para realizar la búsqueda con debounce
	useEffect(() => {
		// si el campo de búsqueda está vacío, no hacemos nada
		if (searchTerm.trim() === '') {
			return;
		}

		// limpiamos los tiempos del debounce
		if (debounceTimer) {
			clearTimeout(debounceTimer);
		}

		// generamos un timeout cuando el usuario deja de escribir
		debounceTimer = setTimeout(async () => {
			setErrorMessage(''); // limpiamos mensajes de error
			setLoading(true); // mostramos el mensaje de cargando

			// obtenemos el campo de busqueda
			const pokemonValue = searchTerm.toLowerCase().trim();

			try {
				alert("length=" + listPokemons.length + " y " + (listPokemons[0]?.id ?? 'sin ID'));
				const pokemonValue = searchTerm.toLowerCase().trim();  // Asegúrate de que 'pokemonValue' sea un string

				const foundPokemon = listPokemons.find((item) => {
					console.log(item.name.toLowerCase() + " " + pokemonValue)
					// Asegurándonos de que 'item.name' esté definido antes de hacer la comparación
					return item.name?.toLowerCase() === pokemonValue;
				});

				if (foundPokemon) {
					alert(`¡Pokémon encontrado: ${foundPokemon.name} (ID: ${foundPokemon.id})!`);
				} else {
					alert("Pokémon no encontrado.");
				}


				console.log("listPokemons=====", listPokemons, "pokemonValue", pokemonValue)
				// buscamos si el valor ya existe en la variable context
				// devuelve true o false
				const existsInList = listPokemons.some(
					(item) => item.name === pokemonValue || item.id === pokemonValue
				);
				console.log("existsInList=====", existsInList)
				if (existsInList) {
					setLoading(false);
					setImagenDefault(false);
					onSearch(listPokemons); // enviamos los datos
					navigate('/listapokemonsbuscados', { pokemon: listPokemons });
				
				} else {

					// llamamos al fetch
					const dataPoke = await getPokemonById(pokemonValue);
					updateListPokemons(dataPoke); // actualizamos el context global

					setImagenDefault(false); 
					setLoading(false); 
					onSearch([dataPoke]); // enviamos el Pokémon al componente padre
					navigate('/listapokemonsbuscados', { pokemon: dataPoke });
				}
			} catch (error) {
				setLoading(false);
				setErrorMessage('Error. El Pokémon no existe en la API');
				console.error("Error", error);
			}
		}, debounceTimeout);

		// Limpiar timeout cuando el componente se desmonte
		return () => clearTimeout(debounceTimer);
	}, [searchTerm, listPokemons, onSearch, navigate]);

	// Función para manejar la búsqueda cuando el input está vacío
	const handle_arrListPokemons = async () => {
		setErrorMessage('');
		if (listPokemons.length > 0) {
			onSearch(listPokemons);
			navigate('/listapokemonsbuscados', { pokemon: listPokemons });
		} else {
			setErrorMessage('Error. El listado de Pokemons está vacío');
		}
	};

	return (
		<>
			<div className="boxSearch">
				<div className="search">
					<input
						type="text"
						value={searchTerm}
						onChange={handle_searchChange}
						placeholder="Buscar por nombre o por número"
					/>
					<button onClick={handle_arrListPokemons}>Mostrar Pokemons Buscados</button>
				</div>
				<div className="search-info">Buscar pokemons (hasta 1.025)</div>
			</div>

			{
				// si estamos cargando datos, mostramos la capa Modal
				loading && <Modal />
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

export default SearchDebounce;

