export interface AppState {
  pokemonSlice: {
    allPokemon: PokemonBase[];
  };
  pokemonInfoSlice: {
    image: string;
    name: string;
    types: Type[];
    stats: Stat[];
  };
}

export interface PokemonInfo {
  image: string;
  name: string;
  stats: Stat[];
  types: Type[];
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface Type {
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonBase {
  name: string;
  url: string;
  id: number;
}
