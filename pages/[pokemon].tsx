import { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { setPokemonInfo } from '../store/pokemonInfoSlice';
import { useEffect } from 'react';
import { getPokemonInfo } from '../apiCalls';
import {
  getPokemonInfoImage,
  getPokemonInfoName,
  getPokemonInfoStats,
  getPokemonInfoTypes,
} from '../store/selectors';

interface PokemonPageProps {
  ssrPokemonInfo: {
    image: string;
    name: string;
    stats: { base_stat: number; stat: { name: string } }[];
    types: { type: { name: string } }[];
  };
}

const PokemonPage: NextPage<PokemonPageProps> = (props) => {
  const { ssrPokemonInfo } = props;
  const { image, name, stats, types } = ssrPokemonInfo;
  const router = useRouter();
  const dispatch = useDispatch();
  const searchedPokemon = router.query.pokemon as 'string';

  const pokemonInfoImage = useSelector(getPokemonInfoImage);
  const pokemonInfoName = useSelector(getPokemonInfoName);
  const pokemonInfoTypes = useSelector(getPokemonInfoTypes);
  const pokemonInfoStats = useSelector(getPokemonInfoStats);

  useEffect(() => {
    if (name) {
      dispatch(setPokemonInfo(ssrPokemonInfo));
    } else {
      // Runs a client side fetch
      const fetchPokemonInfo = async () => {
        const csrPokemonPokemonInfo = await getPokemonInfo(searchedPokemon);
        dispatch(setPokemonInfo(csrPokemonPokemonInfo));
      };
      // Set's the state client side for the app to use
      fetchPokemonInfo();
    }
  }, []);

  const onButtonClick = () => {
    router.push('/');
  };

  // Handles the initial loading of the app
  if (ssrPokemonInfo.name) {
    const pokemonTypes = types.map((type) => type.type.name);
    const pokemonStats = stats.map((pokeStat) => {
      const { base_stat, stat } = pokeStat;
      return {
        baseStat: base_stat,
        name: stat.name,
      };
    });

    return (
      <div className='max-w-3xl mx-auto'>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded m-4'
          onClick={onButtonClick}>
          Back to Home
        </button>

        <div className='flex p-8  justify-center align-middle'>
          <img src={image} className='w-80 h-80 mr-16' />
          <div className='align-middle w-100'>
            <h1 className='text-xl font-bold mb-4'>{name.toUpperCase()}</h1>
            <div className='mb-2'>
              <h2 className='text-lg font-semibold'>Type</h2>
              {pokemonTypes.map((pokemonType) => (
                <span className=' mr-2' key={pokemonType}>
                  {pokemonType}
                </span>
              ))}
            </div>
            <h2 className='text-lg font-semibold'>Stats</h2>
            {pokemonStats.map((stat) => (
              <div key={stat.name}>
                <span className='font-semibold mr-2'>{stat.name}:</span>{' '}
                {stat.baseStat}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Handles Client side routing changes
  if (pokemonInfoImage) {
    const pokemonTypes = pokemonInfoTypes.map((type) => type.type.name);
    const pokemonStats = pokemonInfoStats.map((pokeStat) => {
      const { base_stat, stat } = pokeStat;
      return {
        baseStat: base_stat,
        name: stat.name,
      };
    });
    return (
      <div className='max-w-3xl mx-auto'>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded m-4'
          onClick={onButtonClick}>
          Back to Home
        </button>

        <div className='flex p-8  justify-center align-middle'>
          <img src={pokemonInfoImage} className='w-80 h-80 mr-16' />
          <div className='align-middle w-100'>
            <h1 className='text-xl font-bold mb-4'>
              {pokemonInfoName.toUpperCase()}
            </h1>
            <div className='mb-2'>
              <h2 className='text-lg font-semibold'>Type</h2>
              {pokemonTypes.map((pokemonType) => (
                <span className=' mr-2' key={pokemonType}>
                  {pokemonType}
                </span>
              ))}
            </div>
            <h2 className='text-lg font-semibold'>Stats</h2>
            {pokemonStats.map((stat) => (
              <div key={stat.name}>
                <span className='font-semibold mr-2'>{stat.name}:</span>{' '}
                {stat.baseStat}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default PokemonPage;

PokemonPage.getInitialProps = async (ctx: NextPageContext) => {
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
    ssrPokemonInfo,
  };
};
