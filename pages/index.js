import { useEffect, useReducer } from "react";

import ErrorMessage from "../components/ErrorMessage";
import WeekSummary from "../components/WeekSummary";
import DayWeather from "../components/DayWeather";
import Footer from "../components/Footer";

import { BASE_URL } from "../lib/api";
import { useSelectors, useActions } from "../lib/hooks";
import useGeoPosition from "../lib/useGeoPosition";
import reducer, {
  initialState,
  SET_WEATHER,
  SET_SELECTED_DAY_INDEX,
} from "../lib/weatherReducer";

const Home = () => {
  const geoState = useGeoPosition();
  const { error, latitude, longitude } = geoState;

  const weatherReducer = useReducer(reducer, initialState);

  const { setWeather, setSelectedDayIndex } = useActions(
    weatherReducer,
    (dispatch) => ({
      setWeather: (json) => dispatch({ type: SET_WEATHER, payload: json }),
      setSelectedDayIndex: (selectedDayIndex) =>
        dispatch({
          type: SET_SELECTED_DAY_INDEX,
          payload: { selectedDayIndex },
        }),
    })
  );

  const {
    getSelectedDay,
    getDaily,
    getSelectedDayIndex,
    isCurrentDay,
  } = useSelectors(weatherReducer, ({ daily, current, selectedDayIndex }) => ({
    getSelectedDay: () => {
      const day = selectedDayIndex ? daily[selectedDayIndex] : current;
      return {
        ...day,
        temp: typeof day.temp === "object" ? day.temp.max : day.temp,
      };
    },
    getDaily: () => daily,
    getSelectedDayIndex: () => selectedDayIndex,
    isCurrentDay: () => selectedDayIndex === 0 || selectedDayIndex === null,
  }));

  if (error) {
    return <ErrorMessage error={error} />;
  }

  useEffect(() => {
    const getWeather = async (latitude, longitude) => {
      const res = await fetch(
        `${BASE_URL}/api/weather?latitude=${latitude}&longitude=${longitude}`
      );
      const json = await res.json();

      setWeather(json);
    };

    if (latitude && longitude) {
      getWeather(latitude, longitude);
    }
  }, [latitude, longitude]);

  return (
    <>
      <div className="hero-body has-text-centered">
        <div className="container">
          <DayWeather
            current={getSelectedDay()}
            isCurrentDay={isCurrentDay()}
          />
          <WeekSummary
            daily={getDaily()}
            setSelectedDayIndex={setSelectedDayIndex}
            selectedDayIndex={getSelectedDayIndex()}
          />
        </div>
      </div>
      <Footer latitude={latitude} longitude={longitude} />
    </>
  );
};

export default Home;
