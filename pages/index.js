import { useEffect, useReducer, useState } from "react";
import { Loader } from "react-feather";

import WeekSummary from "../components/WeekSummary";
import DayWeather from "../components/DayWeather";
import CitySearch from "../components/CitySearch";
import Settings from "../components/settings";
import UseUserLocation from "../components/UseUserLocation";

import useSelectors from "../lib/hooks/useSelectors";
import useActions from "../lib/hooks/useActions";

import reducer, {
  weatherActions,
  weatherSelectors,
  initialState,
} from "../lib/weatherReducer";

const Home = () => {
  const [latLon, setLatLon] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const weatherReducer = useReducer(reducer, initialState);
  const { setWeather, setSelectedDayIndex } = useActions(
    weatherReducer,
    weatherActions
  );
  const { getSelectedDay, getDaily, getSelectedDayIndex, isCurrentDay } =
    useSelectors(weatherReducer, weatherSelectors);

  useEffect(() => {
    const getWeather = async (latitude, longitude) => {
      const res = await fetch(
        `${window.location.href}/api/weather?latitude=${latitude}&longitude=${longitude}`
      );
      const json = await res.json();

      setWeather(json);
      setIsFetching(false);
    };

    if (latLon.length > 0) {
      setIsFetching(true);
      getWeather(latLon[1], latLon[0]);
    }
  }, [latLon]);

  return (
    <>
      <section className="hero is-dark is-fullheight">
        <div className="hero-body has-text-centered">
          <div className="container">
            {!isFetching && !(latLon.length > 0) && (
              <>
                <h1 className="title is-1">pogoda</h1>
                <h4 className="subtitle is-4">weather dashboard</h4>
                <br />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <CitySearch setLatLon={setLatLon} />
                </div>
                <br />
                <h5>or</h5>
                <br />
                <UseUserLocation setLatLon={setLatLon} />
              </>
            )}
            {isFetching ? (
              <div className="quick-fade spin">
                <Loader size={36} />
              </div>
            ) : (
              <>
                <DayWeather
                  current={getSelectedDay()}
                  isCurrentDay={isCurrentDay()}
                />
                <WeekSummary
                  daily={getDaily()}
                  setSelectedDayIndex={setSelectedDayIndex}
                  selectedDayIndex={getSelectedDayIndex()}
                />
              </>
            )}
          </div>
        </div>
      </section>
      {/* <Settings /> */}
    </>
  );
};

export default Home;
