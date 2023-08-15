import { useEffect } from 'react';
import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { setInitialPokemon } from '../store/pokemonSlice';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { getAllPokemon } from '../apiCalls';
import { AppDispatch } from '../store/store';

interface HomeProps {
  ssrPokemon?: { name: string; url: string }[];
}

const Home: NextPage<HomeProps> = (props) => {
  const { ssrPokemon } = props;
  const dispatch = useDispatch<AppDispatch>();

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    if (ssrPokemon && ssrPokemon.length > 0) {
      dispatch(setInitialPokemon(ssrPokemon));
    }
  }, []);

  return (
    <>
      <div className={styles.container}>
        <h1 className='font-bold text-3xl mb-2'>Here we go!</h1>
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
};

//Todo: See if we can use store with getServerSideProps instead of getInitialProps

//! We want to see if we can set selectors on the server rather than the client
//build store in server
//selectors should be available within component by useSelector
//https://redux-toolkit.js.org/rtk-query/usage/server-side-rendering

export const getServerSideProps = async (ctx) => {
  const { req } = ctx;
  if (!req) {
    return {
      props: {
        ssrPokemon: [],
      },
    };
  }

  const ssrPokemon = await getAllPokemon();

  return {
    props: {
      ssrPokemon,
    },
  };
};

export default Home;
