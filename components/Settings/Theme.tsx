import { SetStateAction, Dispatch } from "react";
import { Check as CheckIcon } from "lucide-react";
import styled from "styled-components";

type ThemeProps = {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<string>>;
};

const Container = styled.div`
  flex: 0 0 25%;
  height: 40px;
  margin-bottom: 8px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

type IconContainerProps = {
  $iconTheme: Theme;
};

const IconContainer = styled.div<IconContainerProps>`
  height: 100%;
  width: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme, $iconTheme }) => theme.themes[$iconTheme]};
`;

type StyledCheckIconProps = {
  $iconTheme: Theme;
};

const StyledCheckIcon = styled(CheckIcon)<StyledCheckIconProps>`
  color: ${({ theme: { themes, theme } }) =>
    theme === "yellow" || theme === "light" ? themes.dark : themes.light};
  opacity: ${({ theme: { theme }, $iconTheme }) =>
    theme === $iconTheme ? 1 : 0};
  transition: opacity 150ms ease-in-out;
`;

const Theme = ({ theme, setTheme }: ThemeProps) => (
  <Container onClick={() => setTheme(theme)}>
    <IconContainer $iconTheme={theme}>
      <StyledCheckIcon size={24} $iconTheme={theme} />
    </IconContainer>
  </Container>
);

export default Theme;
