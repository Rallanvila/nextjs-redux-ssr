import { NextPage, NextPageContext } from 'next';
import { useDispatch } from 'react-redux';
import { setPokemonInfo } from '../store/pokemonInfoSlice';
import { useEffect } from 'react';
import { getPokemonInfo } from '../apiCalls';
import { AppDispatch } from '../store/store';
import PokemonStats from '../components/PokemonStats';
import { SearchButton } from '../components/SearchButton';
import { PokemonInfo } from '../types/types';

// Interfaces
export interface PokemonPageProps {
  ssrPokemonInfo: PokemonInfo;
}

// Functional Component- Default export
const PokemonPage: NextPage<PokemonPageProps> = (props) => {
  const { ssrPokemonInfo } = props;
  const { name } = ssrPokemonInfo;
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (name) {
      dispatch(setPokemonInfo(ssrPokemonInfo));
    }
  }, []);

  // Handles the initial loading of the app
  if (ssrPokemonInfo.name) {
    return (
      <div className='max-w-3xl mx-auto'>
        <SearchButton />
        <PokemonStats />
        Server Side Rendered
      </div>
    );
  }
  // Handles Client side routing changes
  return (
    <div className='max-w-3xl mx-auto'>
      csr
      <SearchButton />
      {/* //Todo: create link button directly to charizard */}
      <PokemonStats />
      Client Side Rendered
    </div>
  );
};

export default PokemonPage;

//small doc on how this setup works with all SSR
export const getServerSideProps = async (ctx: NextPageContext) => {
  const { query, req } = ctx;
  const searchedPokemon = query.pokemon;

  if (!req) {
    return {
      ssrPokemonInfo: {
        image: '',
        name: '',
        stats: [],
        types: [],
      },
    };
  }

  const ssrPokemonInfo =
    searchedPokemon && typeof searchedPokemon === 'string'
      ? await getPokemonInfo(searchedPokemon)
      : [];

  return {
    props: {
      ssrPokemonInfo,
    },
  };
};
