import styled from "styled-components";
import { Dispatch, SetStateAction } from "react";

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
`;

const Divider = styled.div`
  width: 1px;
  height: 30px;
  margin: 0px 8px;

  background-color: ${({ theme: { themes, theme } }) =>
    theme === "light" ? themes.dark : themes.light};
`;

const Unit = styled.div<{ $isSelected: boolean }>`
  padding: 4px 6px;
  border-radius: 4px;
  background-color: ${({ $isSelected, theme: { theme, colors } }) => {
    if (!$isSelected) return "initial";
    return theme === "light" ? colors.greyLighter : colors.blackTer;
  }};

  transition: background-color 150ms ease-in-out;
`;

type TimeProps = {
  is24hr: boolean;
  setIs24hr: Dispatch<SetStateAction<boolean>>;
};

const Time = ({ is24hr, setIs24hr }: TimeProps) => (
  <Container onClick={() => setIs24hr(!is24hr)}>
    <Unit $isSelected={is24hr} title="24h">
      24h
    </Unit>
    <Divider />
    <Unit $isSelected={!is24hr} title="12h">
      12h
    </Unit>
  </Container>
);

export default Time;
