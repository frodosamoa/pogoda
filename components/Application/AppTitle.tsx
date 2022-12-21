import styled from "styled-components";

type ContainerProps = {
  $hasWeather: boolean;
};

const Container = styled.div<ContainerProps>`
  position: fixed;
  top: 24px;
  left: 24px;
  opacity: ${({ $hasWeather }) => ($hasWeather ? 0 : 1)};
  transition: opacity 300ms ease-in-out;
`;

const Title = styled.p`
  font-size: ${({ theme }) => theme.fontSizes[4]};
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes[6]};
`;

type AppTitleProps = {
  hasWeather: boolean;
};

const AppTitle = ({ hasWeather }: AppTitleProps) => (
  <Container $hasWeather={hasWeather}>
    <Title>pogoda</Title>
    <Subtitle>weather dashboard</Subtitle>
  </Container>
);

export default AppTitle;
