import axios from 'axios';

export const pokemonApiBaseURL = 'https://pokeapi.co/api/v2';

export const getAllPokemon = async () => {
  const params = new URLSearchParams([['limit', '150']]);
  return await axios
    .get(`${pokemonApiBaseURL}/pokemon`, { params })
    .then((res) => res.data.results);
};

/**
 *
 * @param searchedPokemon use the router.query to get the searched pokemon
 */
export const getPokemonInfo = async (searchedPokemon: string) => {
  return await axios
    .get(`${pokemonApiBaseURL}/pokemon/${searchedPokemon}`)
    .then((res) => {
      const info = res.data;
      const { sprites, species, stats, types } = info;

      return {
        image: sprites.other.dream_world.front_default,
        name: species.name,
        types,
        stats,
      };
    })
    .catch((error) => error);
};
