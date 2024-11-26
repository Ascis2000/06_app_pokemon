
import React from 'react';
import "./Card.css"

const Card = ({ data }) => {

	// Asegúrate de que `data` tenga los datos que esperas
	if (!data) {
		return <p>No se han encontrado datos del Pokémon.</p>;
	}

	// Si los datos contienen una imagen y nombre, los mostramos
	const { name, id } = data; // desestructuracion

	// datos de la card
	const pData = {
		name: name,
		id: String(id).padStart(3, '0'),
		imageSmall: data.sprites.front_default,
		imageBig: data.sprites.other['official-artwork'].front_default,
		height: data.height,
		weight: data.weight,
		experience: data.base_experience,
		types: data.types.map((type) => type.type.name),
		abilities: data.abilities.map((ability) => ability.ability.name),
		hp: data.stats[0].base_stat,
		attack: data.stats[1].base_stat,
		defense: data.stats[2].base_stat
	};

	return (
		<>
			<div className="card">
				<div className={`card-header ${pData.types[0]}`}>
					<img
						width="100"
						src={pData.imageBig}
						alt={pData.name}
						className="pokemon-image"
					/>
				</div>
				<div className="card-name">
					<div className="pokemon-name">{pData.name}</div>
				</div>
				<div className="card-body">
					<p className="pokemon-number">#{pData.id}</p>
					<ul className="pokemon-stats">
						<li><strong>Height:</strong>{pData.height}</li>
						<li><strong>Weight:</strong>{pData.weight}</li>
						<li><strong>Base Experience:</strong>{pData.experience}</li>
						<li><strong>Type:</strong>{pData.types.join(", ")}</li>
						<li><strong>Abilities:</strong>{pData.abilities.join(", ")}</li>
						<li><strong>HP: {pData.hp}</strong><progress id="file-progress" value={pData.hp} max="100">{pData.hp}</progress></li>
						<li><strong>Attack: {pData.attack}</strong><progress id="file-progress" value={pData.attack} max="100">{pData.attack}</progress></li>
						<li><strong>Defense: {pData.defense}</strong><progress id="file-progress" value={pData.defense} max="100">{pData.defense}</progress></li>
					</ul>
				</div>
				{/* <div className="card-footer">
					<h4>Evoluciones:</h4>
					<p className="evolutions"></p>
				</div> */}
			</div>
		</>
	);
};

export default Card;
