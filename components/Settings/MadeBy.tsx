const MadeBy = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "end",
      flexDirection: "column",
    }}
  >
    <p className="is-size-7">
      code available on{" "}
      <a
        className="has-text-light is-underlined"
        target="_blank"
        rel="noreferrer"
        href={"https://www.github.com/frodosamoa/pogoda"}
      >
        GitHub
      </a>
    </p>
    <p className="is-size-7">
      made by{" "}
      <a
        className="has-text-light is-underlined"
        target="_blank"
        rel="noreferrer"
        href={"https://www.andrewkowalczyk.com"}
      >
        Andrew Kowalczyk
      </a>
    </p>
  </div>
);

export default MadeBy;
