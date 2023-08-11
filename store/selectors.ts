import { PokemonBase } from './pokemonSlice';
import { createSelector } from '@reduxjs/toolkit';

export interface StatsType {
  type: {
    base_stat: number;
    stat: string;
  }[];
}
interface AppState {
  pokemonSlice: {
    allPokemon: PokemonBase[];
  };
  pokemonInfoSlice: {
    image: string;
    name: string;
    types: string[];
    stats: StatsType[];
  };
}

// PokemonSlice Selectors
const getPokemon = (state: AppState) => state.pokemonSlice;

export const getInitialPokemon = createSelector(getPokemon, (pokemonState) => {
  return pokemonState['allPokemon'];
});

// PokemonInfoSlice Selectors
const getPokemonInfo = (state: AppState) => state.pokemonInfoSlice;

export const getPokemonInfoImage = createSelector(getPokemonInfo, (info) => {
  return info['image'];
});

export const getPokemonInfoName = createSelector(getPokemonInfo, (info) => {
  return info['name'];
});

export const getPokemonInfoTypes = createSelector(getPokemonInfo, (info) => {
  return info['types'];
});

export const getPokemonInfoStats = createSelector(getPokemonInfo, (info) => {
  return info['stats'];
});
