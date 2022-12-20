import { Ruler } from "lucide-react";

import WeatherItem from "./WeatherItem";

type PressureProps = {
  pressure: number;
};

const Pressure = ({ pressure }: PressureProps) => (
  <WeatherItem Icon={Ruler} title="Pressure" $animationDelay={1200}>
    {pressure} hPa
  </WeatherItem>
);

export default Pressure;
