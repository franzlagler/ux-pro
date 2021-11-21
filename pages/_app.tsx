import { AppProps } from 'next/app';
import { useCallback, useEffect } from 'react';
import { Provider as ReduxProvider, useDispatch } from 'react-redux';
import Layout from '../components/layout';
import { logIn } from '../state/loggedInSlice';
import { store } from '../state/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ReduxProvider>
  );
}

export default MyApp;
