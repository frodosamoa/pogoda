import { ReactNode } from "react";
import styled from "styled-components";

type SettingsItemProps = {
  children: ReactNode;
};

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const SettingsItem = ({ children }: SettingsItemProps) => (
  <Container>{children}</Container>
);

export default SettingsItem;
