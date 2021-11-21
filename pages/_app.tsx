import { AppProps } from 'next/app';
import { Provider as ReduxProvider } from 'react-redux';
import Layout from '../components/layout';
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
