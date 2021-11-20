import { AppProps } from 'next/app';
import { useCallback, useEffect, useState } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import Layout from '../components/layout';
import { store } from '../state/store';

function MyApp({ Component, pageProps }: AppProps) {
  const [loggedIn, setLoggedIn] = useState(false);

  const checkSession = useCallback(async () => {
    const response = await fetch('/api/checkSession', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const validSession = await response.json();

    if (validSession.message) {
      setLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);
  return (
    <ReduxProvider store={store}>
      <Layout loggedIn={loggedIn} setLoggedIn={setLoggedIn}>
        <Component {...pageProps} setLoggedIn={setLoggedIn} />
      </Layout>
    </ReduxProvider>
  );
}

export default MyApp;
