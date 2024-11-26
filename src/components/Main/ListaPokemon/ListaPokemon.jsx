
import React from 'react';
import Card from './Card';
import { v4 as uuidv4 } from 'uuid';
import { useLocation, useNavigate } from 'react-router-dom';

const ListaPokemon = ({ listaPokemons = [], showBackButton = true }) => {

	const location = useLocation();
	const pokemon = location.pokemon; // Obtener los datos del Pokémon

	const navigate = useNavigate();

	const handleVolver = () => {
		navigate(-1); // Volver a la página anterior
	};

	return (
		<>
			{
				showBackButton && (
                	<div className="boxBotonera">
                    	<button onClick={handleVolver}>Volver</button>
                	</div>
            	)
			}
			
			<div className="card-container">
				{
					listaPokemons.map((item, index) => (
						<Card key={uuidv4()} data={item} />
					))
				}
			</div>
		</>
	);
};

export default ListaPokemon;
