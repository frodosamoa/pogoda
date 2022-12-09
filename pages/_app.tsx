import Head from "next/head";
import type { AppProps } from "next/app";

import "../styles/styles.scss";

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="shortcut icon" href="/favicon.png" />
      <title>Pogoda - Weather Dashboard</title>
    </Head>
    <Component {...pageProps} />
  </>
);

export default App;
