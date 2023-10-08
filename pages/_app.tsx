import '@/styles/globals.css';
import '@/styles/theme.css';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import { useState, createContext, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
}

interface ConnexContextInterface {
  thor: any;
  vendor: any;
}

export const ConnexContext = createContext<ConnexContextInterface>({ thor: null, vendor: null });

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);

  const [thor, setThor] = useState<any>(null);
  const [vendor, setVendor] = useState<any>(null);

  useEffect(() => {
    const initConnex = async () => {
      const { Connex } = await import('@vechain/connex');
      const connex = new Connex({
        node: 'https://testnet.veblocks.net/',
        network: 'test',
        signer: 'sync2'
      });
      setThor(connex.thor);
      setVendor(connex.vendor);
    }
    initConnex();
  }, []);

  return getLayout(
    <ConnexContext.Provider value={{ thor, vendor }}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        limit={1}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
      <Component {...pageProps} />
    </ConnexContext.Provider>
  )

}
