import { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { setPokemonInfo } from '../store/pokemonInfoSlice';
import { useEffect } from 'react';
import { getPokemonInfo } from '../apiCalls';
import {
  StatsType,
  getPokemonInfoImage,
  getPokemonInfoName,
  getPokemonInfoStats,
  getPokemonInfoTypes,
} from '../store/selectors';
import { fetchPokemonInfo } from '../store/actions';
import { AppDispatch } from '../store/store';
import PokemonStats from '../components/PokemonStats';
import { SearchButton } from '../components/SearchButton';

interface PokemonInfo {
  image: string;
  name: string;
  stats: { base_stat: number; stat: { name: string } }[] | StatsType[];
  types: { type: { name: string } }[] | string[];
}

export interface PokemonPageProps {
  ssrPokemonInfo: PokemonInfo;
  rtkPokemonInfo?: PokemonInfo;
}

const PokemonPage: NextPage<PokemonPageProps> = (props) => {
  const { ssrPokemonInfo } = props;
  const { name } = ssrPokemonInfo;
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const searchedPokemon = router.query.pokemon as 'string';

  const pokemonInfoImage = useSelector(getPokemonInfoImage);
  const pokemonInfoName = useSelector(getPokemonInfoName);
  const pokemonInfoTypes = useSelector(getPokemonInfoTypes);
  const pokemonInfoStats = useSelector(getPokemonInfoStats);

  useEffect(() => {
    if (name) {
      dispatch(setPokemonInfo(ssrPokemonInfo));
    } else {
      dispatch(fetchPokemonInfo(searchedPokemon));
    }
  }, []);

  const navigateHome = () => {
    router.push('/');
  };

  // Handles the initial loading of the app
  if (ssrPokemonInfo.name) {
    return (
      <div className='max-w-3xl mx-auto'>
        <SearchButton />
        <PokemonStats ssrPokemonInfo={ssrPokemonInfo} />
        SSR Rendered
      </div>
    );
  }
  // Handles Client side routing changes
  if (pokemonInfoImage) {
    const pokemonInfo: PokemonInfo = {
      image: pokemonInfoImage,
      name: pokemonInfoName,
      types: pokemonInfoTypes,
      stats: pokemonInfoStats,
    };
    return (
      <div className='max-w-3xl mx-auto'>
        csr
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded m-4'
          onClick={onButtonClick}>
          Back to Home
        </button>
        {/* //Todo: create link button directly to charizard */}
        <PokemonStats ssrPokemonInfo={pokemonInfo} />
      </div>
    );
  }
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
