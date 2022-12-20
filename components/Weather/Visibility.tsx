import { Eye } from "lucide-react";

import { METERS_TO_MILES } from "../../lib/constants/conversion";
import WeatherItem from "./WeatherItem";

type VisibilityProps = {
  isMetric: boolean;
  visibility: number;
};

const Visibility = ({ isMetric, visibility }: VisibilityProps) => (
  <WeatherItem Icon={Eye} title="Visibility" $animationDelay={600}>
    {isMetric
      ? `${Math.round(visibility / 1000)} km`
      : `${Math.round(visibility * METERS_TO_MILES)} miles`}
  </WeatherItem>
);

export default Visibility;
