import { useEffect } from 'react';
import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { setInitialPokemon } from '../store/pokemonSlice';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { getAllPokemon } from '../apiCalls';
import { AppDispatch } from '../store/store';
import Image from 'next/image';
import { useRouter } from 'next/router';

// Interfaces
interface HomeProps {
  ssrPokemon?: { name: string; url: string }[];
}

// Functional Component- Default export
const Home: NextPage<HomeProps> = (props) => {
  const { ssrPokemon } = props;
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    if (ssrPokemon && ssrPokemon.length > 0) {
      dispatch(setInitialPokemon(ssrPokemon));
    }
  }, []);

  const navigateToPokemon = (pokemonName: string) => {
    router.push(`/${pokemonName}`);
  };

  return (
    <>
      <div className='max-w-3xl mx-auto grid grid-cols-4 gap-4 gap-y-6 items-center my-8'>
        {ssrPokemon &&
          ssrPokemon.map((p, i) => (
            <div className='shadow-md py-4 rounded'>
              {/* #{i + 1} */}
              <Link
                className='ml-4 w-40 text-center flex flex-col items-center '
                key={p.name}
                href={`/${p.name}`}>
                <Image
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                    i + 1
                  }.png`}
                  alt={p.name}
                  width={100}
                  height={100}
                />
                {capitalizeFirstLetter(p.name)}
              </Link>
            </div>
          ))}
      </div>
    </>
  );
};

// Server Side Rendering Logic
export const getServerSideProps = async (ctx) => {
  const { req } = ctx;
  if (!req) {
    return {
      props: {
        ssrPokemon: [],
      },
    };
  }

  //Todo: See if we can use store with getServerSideProps instead of getInitialProps

  //! We want to see if we can set selectors on the server rather than the client
  //build store in server
  //selectors should be available within component by useSelector
  //https://redux-toolkit.js.org/rtk-query/usage/server-side-rendering

  const ssrPokemon = await getAllPokemon();

  return {
    props: {
      ssrPokemon,
    },
  };
};

export default Home;
