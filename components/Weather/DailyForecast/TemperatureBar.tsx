import styled from "styled-components";
import chroma from "chroma-js";

const Container = styled.div`
  flex: 3;
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
  border-radius: 5px;
  margin: 0px 8px;
  position: relative;
  transition: background-color 150ms ease-in-out;
  background-color: ${({ theme: { theme, themes } }) => themes[theme]};
`;

const InnerBar = styled.div<{ $start: string; $end: string }>`
  height: 6px;
  flex: 1;
  border-radius: 3px;
  margin: 1px;
  position: absolute;
  z-index: 100;
  transition: background-color 150ms ease-in-out;
  min-width: 6px;

  background-color: ${({ theme: { theme, colors } }) =>
    theme === "yellow" || theme === "light"
      ? chroma(colors.greyDark).alpha(0.3).css()
      : chroma(colors.whiteTer).alpha(0.3).css()};
  left: ${({ $start }) => $start}%;
  right: ${({ $end }) => $end}%;
`;

type TemperatureBarProps = {
  dayMin: number;
  dayMax: number;
  maxTemp: number;
  minTemp: number;
};

const TemperatureBar = ({
  dayMin,
  dayMax,
  maxTemp,
  minTemp,
}: TemperatureBarProps) => {
  const barWidth = maxTemp - minTemp;
  const innerBarStart = (((dayMin - minTemp) / barWidth) * 100).toFixed(2);
  const innerBarEnd = (((maxTemp - dayMax) / barWidth) * 100).toFixed(2);

  return (
    <Container>
      <Temp>{dayMin}°</Temp>
      <Bar>
        <InnerBar $start={innerBarStart} $end={innerBarEnd} />
      </Bar>
      <Temp>{dayMax}°</Temp>
    </Container>
  );
};

export default TemperatureBar;
