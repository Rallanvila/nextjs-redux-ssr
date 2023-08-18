import { Provider } from 'react-redux';
import { store } from '../store/store';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { PageHead } from '../components/Head';
import { SearchButton } from '../components/SearchButton';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PageHead />
      <SearchButton />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
