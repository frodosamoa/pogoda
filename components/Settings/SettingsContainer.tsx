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
  right: -${WIDTH}px;
  width: ${WIDTH}px;
  height: 100%;
  transform: translateX(
    ${({ $isSettingsOpen }) => ($isSettingsOpen ? -WIDTH : 0)}px
  );
  transition: transform 400ms ease-out;
  padding: 24px;
  text-align: center;
  color: ${({ theme: { themes } }) => themes.light};
  background-color: ${({ theme }) => theme.colors.blackTer};
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
  <Container $isSettingsOpen={isSettingsOpen}>
    <ChildrenContainer>{children}</ChildrenContainer>
  </Container>
);

export default SettingsContainer;
