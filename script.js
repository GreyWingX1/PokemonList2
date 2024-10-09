$(document).ready(function () {
    // Fetch and display all Pokémon cards on the main page
    fetch("pokedex.json")
        .then((rawData) => rawData.json())
        .then(pokedex => {
            let linkID = 0;
            pokedex.forEach(pokemon => {
                let id = pokemon["id"];
                let name = pokemon["name"]["english"];
                let image = pokemon["image"]["hires"];
                let types = pokemon["type"];
                let typesHtml = "";
  
                // Generate the HTML for Pokémon types
                types.forEach(type => {
                    typesHtml += `<span class="${type.toLowerCase()}">${type}</span>`;
                });
  
                // Append the Pokémon card to the container
                $('.pokemon-container').append(
                    `<div class="card">
                        <a href="pokemon.html?id=${linkID}"><img src="${image}" alt="${name}"></a>
                        <ul type="none">
                            <li class="pokemon-id">#${id}</li>
                            <li class="pokemon-name">
                                <a href="pokemon.html?id=${linkID++}">${name}</a>
                            </li>
                            <li class="pokemon-type">
                                ${typesHtml}
                            </li>
                        </ul>
                    </div>`
                );
            });
        });
  
    // Handle Pokémon details page
let urlParams = new URLSearchParams(window.location.search);
let pokemonId = urlParams.get('id'); // Extract 'id' from the URL

if (pokemonId) {
    // Fetch and display the selected Pokémon's details
    fetch('pokedex.json')
        .then(response => response.json())
        .then(data => {
            // Find the Pokémon data for the given id
            let pokemonData = data[pokemonId];
            if (!pokemonData) {
                console.error('Pokémon not found');
                return;
            }

            // get Pokémon information from pokedex.json names
            let pokemonName = pokemonData['name']['english'];
            let imageURL = pokemonData['image']['hires'];
            let abilities = pokemonData['profile']['ability'];
            let typeList = pokemonData['type'];
            let species = pokemonData['species'];
            let height = pokemonData['profile']['height'];
            let weight = pokemonData['profile']['weight'];
            let baseStats = pokemonData['base'];
            let nationalId = pokemonData['id'];

            // Display each basic Pokémon info 
            $('#pokemon-page-name').html(pokemonName);                                // This is for Pokemon Name
            $('.pokemon-page-national').html(nationalId.toString().padStart(4, '0')); // This is for National number with 4 digits by 0
            $('.pokemon-page-image').html(`<img src="${imageURL}" alt="${pokemonName}"/>`);
            $('.pokemon-page-species').html(species);
            $('.pokemon-page-height').html(height);
            $('.pokemon-page-weight').html(weight);
            $('.pokemon-page-description').html(pokemonData['description']);

            // display abilities of each pokemon
            let abilitiesHtml = '';
            abilities.forEach(ability => {
                let abilityName = ability[0];
                let isHidden = ability[1] === "true";
                abilitiesHtml += `<span class="pokemon-ability ${isHidden ? 'hidden-ability' : ''}">${abilityName}</span>`;
            });
            $('.pokemon-page-abilities').html(abilitiesHtml);

            // Generate and display types HTML
            let typeHtml = '';
            typeList.forEach(type => {
                typeHtml += `<span class="pokemon-type ${type.toLowerCase()}">${type}</span>`;
            });
            $('.pokemon-page-types').html(typeHtml);

           // Reset bar widths to 0%
            $('.bar div').css('width', '0%');

           // Calculate stat percentages
            let hpPercentage = (baseStats['HP'] / 255) * 100;
            let attackPercentage = (baseStats['Attack'] / 255) * 100;
            let defensePercentage = (baseStats['Defense'] / 255) * 100;
            let spAttackPercentage = (baseStats['Sp. Attack'] / 255) * 100;
            let spDefensePercentage = (baseStats['Sp. Defense'] / 255) * 100;
            let speedPercentage = (baseStats['Speed'] / 255) * 100;
            let totalStats = baseStats['HP'] + baseStats['Attack'] + baseStats['Defense'] +
                baseStats['Sp. Attack'] + baseStats['Sp. Defense'] + baseStats['Speed'];

            $('.total').html(totalStats); // Set total value
            // Populate stat values
            $('.hp-val').html(`<div>${baseStats['HP']}</div>`);
            $('.attack-val').html(`<div>${baseStats['Attack']}</div>`);
            $('.defense-val').html(`<div>${baseStats['Defense']}</div>`);
            $('.sp-attack-val').html(`<div>${baseStats['Sp. Attack']}</div>`);
            $('.sp-defense-val').html(`<div>${baseStats['Sp. Defense']}</div>`);
            $('.speed-val').html(`<div>${baseStats['Speed']}</div>`);

            // Animate stats bars based on Pokémon's stats
            $('.hp div').animate({ width: hpPercentage + '%' }); // Animate HP bar
            $('.attack div').animate({ width: attackPercentage + '%' }); // Animate Attack bar
            $('.defense div').animate({ width: defensePercentage + '%' }); // Animate Defense bar
            $('.sp-attack div').animate({ width: spAttackPercentage + '%' }); // Animate Special Attack bar
            $('.sp-defense div').animate({ width: spDefensePercentage + '%' }); // Animate Special Defense bar
            $('.speed div').animate({ width: speedPercentage + '%' }); // Animate Speed bar
        })
    }
});