import { Moon as MoonIcon } from "lucide-react";
import styled, { useTheme } from "styled-components";
import Moon from "react-moon";
import chroma from "chroma-js";

import { WeatherItemTitle } from "./WeatherItem";

type MoonPhaseProps = {
  moonPhase: number;
};

const Container = styled.div`
  padding: 8px;
  border-radius: 8px;
  overflow: scroll;
  display: flex;
  flex-direction: column;

  background-color: ${({ theme: { theme, colors } }) =>
    theme === "dark"
      ? chroma(colors.whiteTer).alpha(0.3).css()
      : chroma(colors.greyDark).alpha(0.2).css()};
`;

const MoonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const MoonInnerContainer = styled.div``;

const MoonPhase = ({ moonPhase }: MoonPhaseProps) => {
  const { theme, colors } = useTheme();

  return (
    <Container>
      <WeatherItemTitle Icon={MoonIcon} title="Moon Phase" />
      <MoonContainer>
        <MoonInnerContainer>
          <Moon
            phase={moonPhase}
            size={70}
            border={"none"}
            lightColor={theme === "dark" ? colors.greyLight : colors.white}
            darkColor={theme === "dark" ? colors.greyDark : colors.grey}
          />
        </MoonInnerContainer>
      </MoonContainer>
    </Container>
  );
};

export default MoonPhase;
