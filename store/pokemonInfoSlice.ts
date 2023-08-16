import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

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
  stats: [],
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
  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log('HYDRATE', state, action.payload);
      return {
        ...state,
        ...action.payload.subject,
      };
    },
  },
});

export const { setPokemonInfo } = pokemonInfoSlice.actions;
export default pokemonInfoSlice.reducer;
