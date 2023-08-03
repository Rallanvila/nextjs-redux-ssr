import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  image: string;
  name: string;
  types: string[];
  stats:
    | {
        baseStat: number;
        name: string;
      }[]
    | null;
}

const initialState: InitialState = {
  image: '',
  name: '',
  types: [],
  stats: null,
};

const pokemonInfoSlice = createSlice({
  name: 'pokemonInfoSlice',
  initialState,
  reducers: {
    setPokemonInfo(state, { payload }) {
      (state.image = payload.image),
        (state.name = payload.name),
        (state.stats = payload.stats),
        (state.types = payload.types);
    },
  },
});

export const { setPokemonInfo } = pokemonInfoSlice.actions;
export default pokemonInfoSlice.reducer;
