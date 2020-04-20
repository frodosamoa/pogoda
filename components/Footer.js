const Footer = ({ latitude, longitude }) => (
  <div className="hero-foot has-text-centered">
    <nav id="lat-lon" className="tabs is-boxed is-fullwidth">
      <div className="container">
        <p className="has-text-centered has-text-grey-dark is-italic is-size-6">
          {latitude}, {longitude}
        </p>
      </div>
    </nav>

    <style jsx>{`
      .lat-lon {
        padding-bottom: 12px;
      }
    `}</style>
  </div>
);

export default Footer;
