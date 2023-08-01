import { createSelector } from '@reduxjs/toolkit';

//todo: this is not working
const getPokemon = (state) => state.allPokemon;

export const getInitialPokemon = createSelector(
  getPokemon,
  (pokemonState) => pokemonState
);
