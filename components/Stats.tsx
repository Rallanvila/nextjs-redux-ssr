import { FC } from 'react';

interface StatProps {
  statName: string;
  baseStat: number;
}

export const Stats: FC<StatProps> = ({ statName, baseStat }) => {
  switch (statName) {
    case 'hp':
      return (
        <div
          className='bg-green-600 h-2.5 rounded-full'
          style={{ width: `${baseStat}%` }}
        />
      );
    case 'attack':
      return (
        <div
          className='bg-red-600 h-2.5 rounded-full'
          style={{ width: `${baseStat}%` }}
        />
      );
    case 'defense':
      return (
        <>
          <div
            className='bg-blue-600 h-2.5 rounded-full'
            style={{ width: `${baseStat}%` }}
          />{' '}
        </>
      );
    case 'special-attack':
      return (
        <div
          className='bg-orange-600 h-2.5 rounded-full'
          style={{ width: `${baseStat}%` }}
        />
      );
    case 'special-defense':
      return (
        <div
          className='bg-green-600 h-2.5 rounded-full'
          style={{ width: `${baseStat}%` }}
        />
      );
    case 'speed':
      return (
        <div
          className='bg-yellow-600 h-2.5 rounded-full'
          style={{ width: `${baseStat}%` }}
        />
      );
    default:
      return '';
  }
};
