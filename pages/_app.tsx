import { Provider } from 'react-redux';
import { store } from '../store/store';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { PageHead } from '../components/Head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PageHead />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
