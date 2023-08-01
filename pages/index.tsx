import { useEffect } from 'react';
import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import axios from 'axios';
import { PokemonBase, setInitialPokemon } from '../store/pokemonSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getInitialPokemon } from '../store/selectors';

interface HomeProps {
  allPokemon?: { name: string; url: string }[];
}

const Home: NextPage<HomeProps> = (props) => {
  const dispatch = useDispatch();
  const { allPokemon } = props;

  useEffect(() => {
    dispatch(setInitialPokemon(allPokemon));
  }, []);

  const pokemon: PokemonBase[] = useSelector(getInitialPokemon);
  console.log('pokemonSelector', pokemon);

  return (
    <div className={styles.container}>
      <h1>Here we go!</h1>
      {allPokemon && allPokemon.map((p) => <p key={p.name}>{p.name}</p>)}
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
