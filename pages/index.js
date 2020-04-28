import { useEffect, useReducer, useState } from "react";
import feather from "feather-icons";

import ErrorMessage from "../components/ErrorMessage";
import WeekSummary from "../components/WeekSummary";
import DayWeather from "../components/DayWeather";
import Footer from "../components/Footer";

import { BASE_URL } from "../lib/apiUtils";
import useSelectors from "../lib/hooks/useSelectors";
import useActions from "../lib/hooks/useActions";
import useGeoPosition from "../lib/hooks/useGeoPosition";

import reducer, {
  weatherActions,
  weatherSelectors,
  initialState,
} from "../lib/weatherReducer";

const Home = () => {
  const geoState = useGeoPosition();
  const weatherReducer = useReducer(reducer, initialState);
  const [isFetching, setIsFetching] = useState(false);

  const { setWeather, setSelectedDayIndex } = useActions(
    weatherReducer,
    weatherActions
  );

  const {
    getSelectedDay,
    getDaily,
    getSelectedDayIndex,
    isCurrentDay,
  } = useSelectors(weatherReducer, weatherSelectors);

  const { error, latitude, longitude } = geoState;

  useEffect(() => {
    const getWeather = async (latitude, longitude) => {
      const res = await fetch(
        `${BASE_URL}/api/weather?latitude=${latitude}&longitude=${longitude}`
      );
      const json = await res.json();

      setWeather(json);
      setIsFetching(false);
    };

    if (latitude && longitude) {
      setIsFetching(true);
      getWeather(latitude, longitude);
    }
  }, [latitude, longitude]);

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <>
      <div className="hero-body has-text-centered">
        <div className="container">
          {isFetching ? (
            <div
              className="quick-fade spin"
              dangerouslySetInnerHTML={{
                __html: feather.icons.loader.toSvg({
                  width: 36,
                  height: 36,
                }),
              }}
            ></div>
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
      <Footer latitude={latitude} longitude={longitude} />
    </>
  );
};

export default Home;
