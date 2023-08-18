import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import pokemonLogo from '../public/pokemonLogo.png';

export const SearchButton: FC = () => {
  const [searchValue, setSearchValue] = useState<string>();
  const router = useRouter();

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    router.push(`/${searchValue}`);
    setSearchValue('');
  };

  const navigateHome = () => {
    router.push('/');
  };

  return (
    <form>
      <div className='flex mt-4 '>
        <Image
          src={pokemonLogo}
          onClick={navigateHome}
          width={150}
          height={100}
          alt='pokemon logo'
          className='mr-8 hover:cursor-pointer'
        />
        <input
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-4'
          id='searchPokemon'
          type='text'
          value={searchValue}
          placeholder='Search for Pokemon here'
          onChange={(e) => setSearchValue(e.target.value)}
          onSubmit={handleSubmit}
        />
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          type='submit'
          onClick={handleSubmit}>
          Search
        </button>
      </div>
    </form>
  );
};
