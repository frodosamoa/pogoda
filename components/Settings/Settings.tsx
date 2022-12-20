import classNames from "classnames";
import { Dispatch, SetStateAction } from "react";
import {
  Thermometer as ThermometerIcon,
  Wind as WindIcon,
  CloudRain as CloudRainIcon,
} from "lucide-react";
import styled from "styled-components";

import Themes from "./Themes";
import UseUserLocation from "./UseUserLocation";
import MadeBy from "./MadeBy";
import SettingsItem from "./SettingsItem";
import SettingsContainer from "./SettingsContainer";
import SettingsIcon from "./SettingsIcon";

const Title = styled.p`
  margin-bottom: 16px;
  font-size: ${({ theme }) => theme.fontSizes[6]};
`;

type SettingProps = {
  latLon: [number, number];
  isMetric: boolean;
  dailyForecastView: string;
  isSettingsOpen: boolean;
  setIsSettingsOpen: Dispatch<SetStateAction<boolean>>;
  setLatLon: Dispatch<SetStateAction<[number, number]>>;
  setCity: Dispatch<SetStateAction<City>>;
  setIsMetric: Dispatch<SetStateAction<boolean>>;
  setTheme: Dispatch<SetStateAction<Theme>>;
  setDailyForecastView: Dispatch<SetStateAction<string>>;
  setWeather: Dispatch<SetStateAction<Weather>>;
};

const Settings = ({
  isSettingsOpen,
  setIsSettingsOpen,
  isMetric,
  setIsMetric,
  setTheme,
  latLon,
  setLatLon,
  dailyForecastView,
  setDailyForecastView,
  setCity,
  setWeather,
}: SettingProps) => {
  return (
    <>
      <SettingsContainer isSettingsOpen={isSettingsOpen}>
        <SettingsItem>
          <Themes setTheme={setTheme} />
        </SettingsItem>

        <SettingsItem>
          <Title>settings</Title>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className={"buttons has-addons"}>
              <button
                className={classNames("button", !isMetric && "is-black")}
                onClick={() => setIsMetric(true)}
              >
                °C, m/s
              </button>
              <button
                className={classNames("button", isMetric && "is-black")}
                onClick={() => setIsMetric(false)}
              >
                °F, mph
              </button>
            </div>
          </div>
        </SettingsItem>

        <SettingsItem>
          <Title>daily forecast</Title>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className={"buttons has-addons"}>
              <button
                title="temperature"
                className={classNames(
                  "button",
                  dailyForecastView !== "temperature" && "is-black"
                )}
                onClick={() => setDailyForecastView("temperature")}
              >
                <ThermometerIcon size={16} />
              </button>
              <button
                title="precipitation"
                className={classNames(
                  "button",
                  dailyForecastView !== "precipitation" && "is-black"
                )}
                onClick={() => setDailyForecastView("precipitation")}
              >
                <CloudRainIcon size={16} />
              </button>
              <button
                title="wind"
                className={classNames(
                  "button",
                  dailyForecastView !== "wind" && "is-black"
                )}
                onClick={() => setDailyForecastView("wind")}
              >
                <WindIcon size={16} />
              </button>
            </div>
          </div>
        </SettingsItem>

        <UseUserLocation
          latLon={latLon}
          setLatLon={setLatLon}
          setCity={setCity}
          setIsSettingsOpen={setIsSettingsOpen}
          setWeather={setWeather}
        />

        <MadeBy />
      </SettingsContainer>

      <SettingsIcon
        setIsSettingsOpen={setIsSettingsOpen}
        isSettingsOpen={isSettingsOpen}
      />
    </>
  );
};
export default Settings;
