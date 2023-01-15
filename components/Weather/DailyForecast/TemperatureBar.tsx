import styled from "styled-components";
import chroma from "chroma-js";

const Container = styled.div`
  flex: 6;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Temp = styled.div`
  flex: 1;
  font-size: ${({ theme }) => theme.fontSizes[7]};
`;

const Bar = styled.div`
  flex: 4;
  height: 8px;
  padding: 0 4px;
  border-radius: 4px;
  margin: 0px 8px;
  position: relative;
  transition: background-color 150ms ease-in-out;

  background-color: ${({ theme: { theme, colors } }) =>
    theme === "dark"
      ? chroma(colors.whiteTer).alpha(0.5).css()
      : chroma(colors.greyDark).alpha(0.5).css()}; ;
`;

const InnerBar = styled.div<{ $start: string; $end: string }>`
  height: 6px;
  flex: 1;
  border-radius: 4px;
  margin: 1px;
  position: absolute;
  z-index: 100;
  transition: background-color 150ms ease-in-out;

  background-color: ${({ theme: { theme, themes } }) => themes[theme]};
  left: ${({ $start }) => $start}%;
  right: ${({ $end }) => $end}%;
`;

type TemperatureBarProps = {
  day: DailyForecast;
};

const TemperatureBar = ({ day }: TemperatureBarProps) => (
  <Container>
    <Temp>{day.temp.min}°</Temp>
    <Bar>
      <InnerBar $start={day.barStart} $end={day.barEnd} />
    </Bar>
    <Temp>{day.temp.max}°</Temp>
  </Container>
);

export default TemperatureBar;
