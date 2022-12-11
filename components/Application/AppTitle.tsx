import styled from "styled-components";

type AppTitleProps = {
  hasWeather: boolean;
};

const Container = styled.div<AppTitleProps>`
  position: fixed;
  top: 24px;
  left: 24px;
  text-align: start;
  opacity: ${({ hasWeather }) => (hasWeather ? 0 : 1)};
  transition: opacity 300ms ease-in-out;
`;

const AppTitle = ({ hasWeather }: AppTitleProps) => (
  <Container hasWeather={hasWeather}>
    <p className="is-size-4">pogoda</p>
    <p className="is-size-6">weather dashboard</p>
  </Container>
);

export default AppTitle;
