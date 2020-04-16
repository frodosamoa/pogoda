const Footer = ({ latitude, longitude }) => (
  <div className="hero-foot has-text-centered">
    <nav className="tabs is-boxed is-fullwidth">
      <div className="container">
        <p className="has-text-centered has-text-grey-dark is-italic is-size-6">
          {latitude}, {longitude}
        </p>
      </div>
    </nav>
  </div>
);

export default Footer;
