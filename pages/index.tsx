import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import axios from 'axios';

interface HomeProps {
  allPokemon?: { name: string; url: string }[];
}

interface PokemonBase {
  name: string;
  url: string;
}

const Home: NextPage<HomeProps> = (props) => {
  const { allPokemon } = props;
  console.log('allPokemon', allPokemon);
  console.log('props', props);

  const [pokemon, setPokemon] = useState<PokemonBase[]>([]);

  useEffect(() => {
    if (allPokemon) setPokemon(allPokemon);
  }, [allPokemon]);

  return (
    <div className={styles.container}>
      <Head>
        <title>NextJS React SSR</title>
        <meta
          name='description'
          content='a test boilerplate for redux setting pages server-side'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1>Here we go!</h1>
      {pokemon && pokemon.map((p) => <p>{p.name}</p>)}
    </div>
  );
};

Home.getInitialProps = async () => {
  const pokemonApiBaseURL = 'https://pokeapi.co/api/v2/';
  const allPokemon = await axios.get(`${pokemonApiBaseURL}/pokemon`);
  const { data } = allPokemon;

  return {
    allPokemon: data.results,
  };
};

export default Home;
