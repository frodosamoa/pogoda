type AppTitleProps = {
  hasWeather: boolean;
};

const AppTitle = ({ hasWeather }: AppTitleProps) => (
  <div
    style={{
      position: "fixed",
      top: 24,
      left: 24,
      textAlign: "start",
      opacity: hasWeather ? 0 : 1,
      transition: "opacity 300ms ease-in-out",
    }}
  >
    <p className="is-size-4">pogoda</p>
    <p className="is-size-6">weather dashboard</p>
  </div>
);

export default AppTitle;
