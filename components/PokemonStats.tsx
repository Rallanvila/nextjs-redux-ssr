import { FC } from 'react';
import { PokemonPageProps } from '../pages/[pokemon]';
import { Stats } from './Stats';

const PokemonStats: FC<PokemonPageProps> = (props) => {
  const { image, name, stats, types } = props.ssrPokemonInfo;
  const pokemonTypes = types.map((type) => type.type.name);
  const pokemonStats = stats.map((pokeStat) => {
    const { base_stat, stat } = pokeStat;
    return {
      baseStat: base_stat,
      name: stat.name,
    };
  });

  return (
    <div className='flex p-8 justify-center align-middle'>
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
            {/* {stat.baseStat} */}
            <Stats statName={stat.name} baseStat={stat.baseStat} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonStats;
