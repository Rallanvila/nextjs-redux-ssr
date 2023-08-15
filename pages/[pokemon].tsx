import { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setPokemonInfo } from '../store/pokemonInfoSlice';
import { useEffect } from 'react';
import { getPokemonInfo } from '../apiCalls';
import { AppDispatch } from '../store/store';
import PokemonStats from '../components/PokemonStats';
import { PokemonInfo } from '../types/types';

// Interfaces
export interface PokemonPageProps {
  ssrPokemonInfo: PokemonInfo;
}

// Functional Component- Default export
const PokemonPage: NextPage<PokemonPageProps> = (props) => {
  const { ssrPokemonInfo } = props;
  const { name } = ssrPokemonInfo;
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (name) {
      dispatch(setPokemonInfo(ssrPokemonInfo));
    }
  }, []);

  const onButtonClick = () => {
    router.push('/');
  };

  return (
    <div className='max-w-3xl mx-auto'>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded m-4'
        onClick={onButtonClick}>
        Back to Home
      </button>
      <PokemonStats />
    </div>
  );
};

// Server Side Rendering Logic
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

export default PokemonPage;
