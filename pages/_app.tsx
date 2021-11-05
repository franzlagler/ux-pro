import { AppProps } from 'next/app';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import Layout from '../components/layout';
import { store } from '../state/store';
import { getCookies, removeCookie, setCookies } from '../util/cookies';
import { connectToDatabase } from '../util/mongodb';

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
