
import React, { useState, useEffect, useContext } from 'react';
import { PokemonFetchContext } from '../../../context/ListPokemonContext';
import { getPokemonById } from '../../../services/getPokemons.js';
import ListaPokemon from "../ListaPokemon";

import Modal from '../../../elements/Modal';
import Mensaje from '../../../elements/Mensaje';
import Paginacion from '../../../elements/Paginacion';

const ListAllPokemons = () => {

    // ESTADO GLOBAL
    // variable 'fetchedPokemons' con el valor []
    // funcion asociada del useContext: updateFetchedPokemons()
    const { fetchedPokemons, updateFetchedPokemons } = useContext(PokemonFetchContext);

    // ESTADO
    // variable 'loading' con el valor 'false'
    // funcion asociada del Estado: setLoading()
    const [loading, setLoading] = useState(true);

    // ESTADO para mostrar el mensaje de error
    // variable 'errorMessage' con el valor ''
    // funcion asociada del Estado: setErrorMessage()
    const [errorMessage, setErrorMessage] = useState('');

	// ESTADO para paginacion
    // variable 'currentPage' con el valor '1'
    // funcion asociada del Estado: setCurrentPage()
    const [currentPage, setCurrentPage] = useState(1);

	// Pokémons por página
    const itemsPerPage = 25; 

	 // Total de Pokémon
    const totalItems = 1025;

    // calculamos el rango según la página actual
	// cada vez que cambian los valores de currentPage, 
	// actualizamos los valores de start y end que lanzan useEfeect nuevamente
    const start = ((currentPage - 1) * itemsPerPage) + 1; // ( (1-1) * 25) + 1 => 0 + 1 => 1
    const end = currentPage * itemsPerPage; // 1 * 25 => 25

    useEffect(() => {
		
        const fetchPokemons = async () => {
            setLoading(true);
            setErrorMessage('');

            try {
                const arr_fetchs = []; // array de fetchs
                for (let id = start; id <= end; id++) {
                    arr_fetchs.push(getPokemonById(id));
                }

                // realizamos todas las promesas
                const resultados = await Promise.all(arr_fetchs);
                updateFetchedPokemons(resultados); // fetchedPokemons = resultados

            } catch (error) {
                setErrorMessage('Error al cargar los Pokémon');
            } finally {
                // escondemos el indicador de cargando
                setLoading(false);
            }
        };

        fetchPokemons();
    }, [start, end]);

    if (errorMessage) {
        return <Mensaje tipo="error" texto={errorMessage}/>;
    }

    return (
        <>
            <div>
                <div className="boxInfo">
                    <h3>Lista de Pokémon del {start} al {end} de {1025}, Página {currentPage}/{Math.ceil(1025/itemsPerPage)}</h3>
                </div>

				<Paginacion
					currentPage={currentPage}
					itemsPerPage={itemsPerPage}
					totalItems={totalItems}
					onPageChange={(cPage) => setCurrentPage(cPage)}
				/>

                <ListaPokemon listaPokemons={fetchedPokemons} showBackButton={false} />

				<Paginacion
					currentPage={currentPage}
					itemsPerPage={itemsPerPage}
					totalItems={totalItems}
					onPageChange={(page) => setCurrentPage(page)}
				/>
            </div>

            {
				// si estamos cargando datos, mostramos la capa Modal
				loading && <Modal style="white"/>
			}
        </>
    );
};

export default ListAllPokemons;