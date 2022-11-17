import { Check as CheckIcon } from "react-feather";

const THEMES = [
  "primary",
  "link",
  "info",
  "success",
  "warning",
  "danger",
  "dark",
  "light",
];

const Theme = ({ theme, globalTheme, setTheme }) => (
  <div
    className={`has-background-${theme}`}
    style={{
      height: 20,
      borderRadius: 4,
      marginBottom: 8,
      cursor: "pointer",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
    onClick={() => setTheme(theme)}
  >
    {globalTheme === theme && (
      <CheckIcon
        size={16}
        className={
          theme === "warning" || theme === "light"
            ? "has-text-dark"
            : "has-text-light"
        }
      />
    )}
  </div>
);

const Themes = ({ globalTheme, setTheme }) => (
  <>
    <p className="is-size-6 m-b-16">theme</p>
    {THEMES.map((theme) => (
      <Theme
        key={theme}
        theme={theme}
        globalTheme={globalTheme}
        setTheme={setTheme}
      />
    ))}
  </>
);

export default Themes;
