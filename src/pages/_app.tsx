import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { AllUsersProvider } from '../contexts/AllUsersContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return null;

  return (
    <SessionProvider>
      <AllUsersProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AllUsersProvider>
    </SessionProvider>
  );
}

export default MyApp;
