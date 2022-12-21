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

  background-color: ${({ theme: { theme, themes, colors } }) => {
    if (theme === "dark") return themes["dark"];
    if (theme === "light") return themes["light"];
    return colors["greyLighter"];
  }};
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
