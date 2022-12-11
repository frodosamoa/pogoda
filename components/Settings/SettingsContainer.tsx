import { ReactNode } from "react";
import styled from "styled-components";

type SettingsContainerProps = {
  isSettingsOpen: boolean;
  children: ReactNode;
};

const WIDTH = 250;

type ContainerProps = {
  $isSettingsOpen: boolean;
};

const Container = styled.div<ContainerProps>`
  position: fixed;
  top: 0;
  right: 0;
  width: ${WIDTH}px;
  height: 100%;
  transform: translateX(
    ${({ $isSettingsOpen }) => ($isSettingsOpen ? 0 : WIDTH)}px
  );
  transition: transform 400ms ease-out;
  padding: 24px;
  text-align: center;
`;

const ChildrenContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const SettingsContainer = ({
  isSettingsOpen,
  children,
}: SettingsContainerProps) => (
  <Container
    className="has-background-black-ter has-text-light"
    $isSettingsOpen={isSettingsOpen}
  >
    <ChildrenContainer>{children}</ChildrenContainer>
  </Container>
);

export default SettingsContainer;
