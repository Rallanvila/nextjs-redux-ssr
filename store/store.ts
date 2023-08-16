import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import pokemonReducer from '../store/pokemonSlice';
import pokemonInfoReducer from '../store/pokemonInfoSlice';
import { createWrapper, Context, HYDRATE } from 'next-redux-wrapper';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState } from '@reduxjs/toolkit/dist/query/core/apiState';

export const makeStore = () =>
  configureStore({
    reducer: {
      pokemonSlice: pokemonReducer,
      pokemonInfoSlice: pokemonInfoReducer,
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        immutableCheck: false, // following log stmt recommendation
        serializableCheck: false,
      });
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const wrapper = createWrapper<AppStore>(makeStore);
