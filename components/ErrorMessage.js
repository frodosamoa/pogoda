const ErrorMessage = ({ error }) => (
  <div className="hero-body">
    <div className="container has-text-centered">
      <h1 className="title">{error.message}</h1>
    </div>
  </div>
);

export default ErrorMessage;
