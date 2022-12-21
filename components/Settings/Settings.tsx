import classNames from "classnames";
import { Dispatch, SetStateAction } from "react";
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
  isSettingsOpen: boolean;
  setIsSettingsOpen: Dispatch<SetStateAction<boolean>>;
  setLatLon: Dispatch<SetStateAction<[number, number]>>;
  setCity: Dispatch<SetStateAction<City>>;
  setIsMetric: Dispatch<SetStateAction<boolean>>;
  setTheme: Dispatch<SetStateAction<Theme>>;
  setWeather: Dispatch<SetStateAction<WeatherResponse>>;
};

const Settings = ({
  isSettingsOpen,
  setIsSettingsOpen,
  isMetric,
  setIsMetric,
  setTheme,
  latLon,
  setLatLon,
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
