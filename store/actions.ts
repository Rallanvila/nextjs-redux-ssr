import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { PokemonBase, setInitialPokemon } from './pokemonSlice';
import { pokemonApiBaseURL } from '../apiCalls';
import { setPokemonInfo } from './pokemonInfoSlice';

export const fetchInitialPokemon = createAsyncThunk<void, undefined>(
  'fetchInitialPokemon',
  async (_, { dispatch }) => {
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
            const pokemonWithoutIds = {
              ...currentValue,
              id: index + 1,
            };
            accumulator.push(pokemonWithoutIds);
            return accumulator;
          },
          []
        );
        dispatch(setInitialPokemon(pokemonWithIds));
      });
  }
);

export const fetchPokemonInfo = createAsyncThunk<void, string>(
  'fetchPokemonInfo',
  async (searchedPokemon, { dispatch }) => {
    const pokemonInfo = await axios
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

    dispatch(setPokemonInfo(pokemonInfo));
  }
);
