import { useEffect } from 'react';
import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { setInitialPokemon } from '../store/pokemonSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getInitialPokemon } from '../store/selectors';
import Link from 'next/link';
import { getAllPokemon } from '../apiCalls';

interface HomeProps {
  ssrPokemon?: { name: string; url: string }[];
}

const Home: NextPage<HomeProps> = (props) => {
  const { ssrPokemon } = props;
  const dispatch = useDispatch();

  const pokemon = useSelector(getInitialPokemon);

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    if (ssrPokemon && ssrPokemon.length > 0) {
      dispatch(setInitialPokemon(ssrPokemon));
    } else {
      // Runs a client side fetch
      const fetchPokemon = async () => {
        const csrPokemon = await getAllPokemon();
        dispatch(setInitialPokemon(csrPokemon));
      };
      // Set's the state client side for the app to use
      fetchPokemon();
    }
  }, []);

  // Handles the initial loading of the app
  if (ssrPokemon && ssrPokemon.length > 0) {
    return (
      <>
        <div className={styles.container}>
          <h1 className='font-bold text-3xl mb-2'>Here we go!</h1>
          {/* {pokemon && pokemon.map((p) => <p key={p.name}>{p.name}</p>)} */}
          {ssrPokemon &&
            ssrPokemon.map((p) => (
              <Link
                className='block underline w-40'
                key={p.name}
                href={`/${p.name}`}>
                {capitalizeFirstLetter(p.name)}
              </Link>
            ))}
        </div>
      </>
    );
  }

  // Handles Client side routing changes
  return (
    <>
      <div className={styles.container}>
        <h1 className='font-bold text-3xl mb-2'>Here we go!</h1>
        {pokemon &&
          pokemon.map((p) => (
            <Link
              className='block underline w-40'
              key={p.name}
              href={`/${p.name}`}>
              {capitalizeFirstLetter(p.name)}
            </Link>
          ))}
      </div>
    </>
  );
};

Home.getInitialProps = async (ctx) => {
  const { req } = ctx;
  if (!req) {
    return {
      ssrPokemon: [],
    };
  }

  const ssrPokemon = await getAllPokemon();

  return {
    ssrPokemon,
  };
};

export default Home;
