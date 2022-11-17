const MadeBy = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "end",
      flexDirection: "column",
    }}
  >
    <p className="is-size-6">made by </p>
    <p className="is-size-6 is-underlined">
      <a
        className="has-text-light"
        target="_blank"
        href={"https://www.andrewkowalczyk.com"}
      >
        Andrew Kowalczyk
      </a>
    </p>
  </div>
);

export default MadeBy;
