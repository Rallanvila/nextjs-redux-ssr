import axios from 'axios';
import { PokemonBase } from './store/pokemonSlice';

export const pokemonApiBaseURL = 'https://pokeapi.co/api/v2';

export const getAllPokemon = async () => {
  const params = new URLSearchParams([['limit', '150']]);
  return await axios
    .get(`${pokemonApiBaseURL}/pokemon`, { params })
    .then((res) => {
      const arrayOfPokemon = res.data.results;

      const pokemonWithIds = arrayOfPokemon.reduce(
        (
          accumulator: PokemonBase[],
          currentValue: PokemonBase,
          index: number
        ) => {
          const pokemonWithoutIds = { ...currentValue, id: index + 1 };
          accumulator.push(pokemonWithoutIds);
          return accumulator;
        },
        []
      );
      return pokemonWithIds;
    });
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
