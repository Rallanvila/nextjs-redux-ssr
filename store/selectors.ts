import { createSelector } from '@reduxjs/toolkit';

const getPokemon = (state) => state.pokemonSlice;

export const getInitialPokemon = createSelector(
  getPokemon,
  (pokemonState) => pokemonState
);
