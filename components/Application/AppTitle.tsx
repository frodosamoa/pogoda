import styled from "styled-components";

type ContainerProps = {
  $hasWeather: boolean;
};

const Container = styled.div<ContainerProps>`
  position: fixed;
  top: 24px;
  left: 24px;
  text-align: start;
  opacity: ${({ $hasWeather }) => ($hasWeather ? 0 : 1)};
  transition: opacity 300ms ease-in-out;
`;

type AppTitleProps = {
  hasWeather: boolean;
};

const AppTitle = ({ hasWeather }: AppTitleProps) => (
  <Container $hasWeather={hasWeather}>
    <p className="is-size-4">pogoda</p>
    <p className="is-size-6">weather dashboard</p>
  </Container>
);

export default AppTitle;
