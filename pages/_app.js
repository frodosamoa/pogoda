import Head from "next/head";
import "../styles/styles.scss";

const App = ({ Component, pageProps }) => (
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
