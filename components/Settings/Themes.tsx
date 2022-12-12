import styled, { useTheme } from "styled-components";
import { SetStateAction, Dispatch } from "react";

import Theme from "./Theme";

type ThemesProps = {
  globalTheme: Theme;
  setTheme: Dispatch<SetStateAction<string>>;
};

const Title = styled.p`
  margin-bottom: 16px;
  font-size: ${({ theme }) => theme.fontSizes[6]};
`;

const Themes = ({ globalTheme, setTheme }: ThemesProps) => {
  const theme = useTheme();

  return (
    <>
      <Title>theme</Title>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {Object.keys(theme.themes).map((theme) => (
          <Theme
            key={theme}
            theme={theme as Theme}
            globalTheme={globalTheme}
            setTheme={setTheme}
          />
        ))}
      </div>
    </>
  );
};

export default Themes;
