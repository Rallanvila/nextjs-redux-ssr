import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import axios from 'axios';
import { setInitialPokemon } from '../store/pokemonSlice';
import { useSelector } from 'react-redux';
import { getInitialPokemon } from '../store/selectors';

interface HomeProps {
  allPokemon?: { name: string; url: string }[];
}

const Home: NextPage<HomeProps> = (props) => {
  const { allPokemon } = props;
  console.log('allPokemon', allPokemon);
  console.log('props', props);

  useEffect(() => {
    setInitialPokemon(allPokemon);
  }, []);

  //Todo: get this working
  const test = useSelector(getInitialPokemon);
  console.log('test', test);

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
      {allPokemon && allPokemon.map((p) => <p>{p.name}</p>)}
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
