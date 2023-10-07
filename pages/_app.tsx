import '@/styles/globals.css'
import '@/styles/theme.css'
import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import { useState, createContext, useEffect } from 'react';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

interface ConnexConextInterface {
  thor: any;
  vendor: any;
};

export const ConnexContext = createContext<ConnexConextInterface>({
  thor: null,
  vendor: null,
});

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
