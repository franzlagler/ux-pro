import { AppProps } from 'next/app';
import { useCallback } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import Layout from '../components/layout';
import { store } from '../state/store';

function MyApp({ Component, pageProps }: AppProps) {
  useCallback(async () => {
    await fetch('/api/insertDefaultData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }, []);
  return (
    <ReduxProvider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ReduxProvider>
  );
}

export default MyApp;
