import "../styles/styles.scss";

const App = ({ Component, pageProps }) => (
  <section className="hero is-dark is-fullheight">
    <Component {...pageProps} />
  </section>
);

export default App;
