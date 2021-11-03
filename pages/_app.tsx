import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import Layout from '../components/layout';
import { store } from '../state/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </Layout>
  );
}

export default MyApp;
