import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  allPokemon: PokemonBase[];
}

export interface PokemonBase {
  name: string;
  url: string;
}

const initialState: InitialState = {
  allPokemon: [],
};

const pokemonSlice = createSlice({
  name: 'pokemonSlice',
  initialState,
  reducers: {
    setInitialPokemon(state, action) {
      state.allPokemon = action.payload;
    },
  },
});

export const { setInitialPokemon } = pokemonSlice.actions;
export default pokemonSlice.reducer;
