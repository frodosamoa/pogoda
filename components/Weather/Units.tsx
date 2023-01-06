import styled from "styled-components";
import { Dispatch, SetStateAction } from "react";

const Container = styled.div`
  position: absolute;
  left: 0px;
  right: 0px;
  margin: 0 auto;
  bottom: -36px;
  width: fit-content;
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

type UnitsProps = {
  isMetric: boolean;
  setIsMetric: Dispatch<SetStateAction<boolean>>;
};

const Units = ({ isMetric, setIsMetric }: UnitsProps) => (
  <Container onClick={() => setIsMetric(!isMetric)}>
    <Unit $isSelected={isMetric} title="Metric">
      C°, m/s
    </Unit>
    <Divider />
    <Unit $isSelected={!isMetric} title="Imperial">
      F°, mph
    </Unit>
  </Container>
);

export default Units;
