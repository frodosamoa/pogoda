import { Eye } from "lucide-react";

import WeatherItem from "./WeatherItem";

type VisibilityProps = {
  visibility: string;
};

const Visibility = ({ visibility }: VisibilityProps) => (
  <WeatherItem Icon={Eye} title="Visibility" $animationDelay={600}>
    {visibility}
  </WeatherItem>
);

export default Visibility;
