import { Provider } from 'react-redux';
import { wrapper } from '../store/store';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { PageHead } from '../components/Head';

function MyApp({ Component, pageProps, ...rest }: AppProps) {
  const { store } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <PageHead />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
