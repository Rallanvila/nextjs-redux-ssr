import { createSlice } from '@reduxjs/toolkit';
import { PokemonBase } from '../types/types';
import { HYDRATE } from 'next-redux-wrapper';

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
  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log('HYDRATE', state, action.payload);
      return {
        ...state, //init state on server
        ...action.payload.subject, //csr state that was updated on client but needs to overwrite for server
      };
    },
  },
});
export const { setInitialPokemon } = pokemonSlice.actions;
export default pokemonSlice.reducer;
