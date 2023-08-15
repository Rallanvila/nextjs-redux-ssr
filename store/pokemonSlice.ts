import { createSlice } from '@reduxjs/toolkit';
import { PokemonBase } from '../types/types';

interface InitialState {
  allPokemon: PokemonBase[];
}

const initialState: InitialState = {
  allPokemon: [],
};

const pokemonSlice = createSlice({
  name: 'pokemonSlice',
  initialState,
  reducers: {
    setInitialPokemon(state, action) {
      state.allPokemon = action.payload || [];
    },
  },
});

export const { setInitialPokemon } = pokemonSlice.actions;
export default pokemonSlice.reducer;
