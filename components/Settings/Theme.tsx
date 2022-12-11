import { SetStateAction, Dispatch } from "react";
import { Check as CheckIcon } from "react-feather";
import styled from "styled-components";

type ThemeProps = {
  theme: Theme;
  globalTheme: Theme;
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

const IconContainer = styled.div`
  height: 100%;
  width: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Theme = ({ theme, globalTheme, setTheme }: ThemeProps) => (
  <Container onClick={() => setTheme(theme)}>
    <IconContainer className={`has-background-${theme}`}>
      <CheckIcon
        size={24}
        style={{
          opacity: globalTheme === theme ? 1 : 0,
          transition: "opacity 150ms ease-in-out",
        }}
        className={
          theme === "warning" || theme === "light"
            ? "has-text-dark"
            : "has-text-light"
        }
      />
    </IconContainer>
  </Container>
);

export default Theme;
