import { useEffect, useReducer, useState } from "react";
import feather from "feather-icons";

import WeekSummary from "../components/WeekSummary";
import DayWeather from "../components/DayWeather";
// import Footer from "../components/Footer";

import useSelectors from "../lib/hooks/useSelectors";
import useActions from "../lib/hooks/useActions";
import useGeoPosition from "../lib/hooks/useGeoPosition";

import reducer, {
  weatherActions,
  weatherSelectors,
  initialState,
} from "../lib/weatherReducer";

const Home = () => {
  const [fetchGeo, setFetchGeo] = useState(false);
  const [latLon, setLatLon] = useState([]);
  const geoState = useGeoPosition(fetchGeo);
  const weatherReducer = useReducer(reducer, initialState);
  const [value, setValue] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [cities, setCities] = useState([]);

  const { setWeather, setSelectedDayIndex } = useActions(
    weatherReducer,
    weatherActions
  );

  useEffect(() => {
    const getCities = async () => {
      const res = await fetch(
        `${window.location.href}/api/cities?query=${value}`
      );
      const json = await res.json();

      setCities(json);
    };

    if (value !== "") {
      getCities(value);
    } else {
      setCities([]);
    }
  }, [value]);

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

    if (geoState.latitude && geoState.longitude) {
      setIsFetching(true);
      getWeather(geoState.latitude, geoState.longitude);
    }

    if (latLon.length > 0) {
      setIsFetching(true);
      getWeather(latLon[1], latLon[0]);
    }
  }, [geoState, latLon]);

  const hasLatLon =
    (geoState.latitude && geoState.longitude) || latLon.length > 0;

  return (
    <>
      <div className="hero-body has-text-centered">
        <div className="container">
          {!isFetching && !hasLatLon && (
            <>
              <h1 className="title is-1">pogoda</h1>
              <h3 className="subtitle is-3">
                <span className="is-italic">your</span>&nbsp;&nbsp;weather
                dashboard
              </h3>
              <br />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div style={{ width: 300 }}>
                  <input
                    placeholder="Enter a city name..."
                    className="input is-small"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                </div>
                {cities.length > 0 && (
                  <div
                    className="select is-multiple is-small"
                    style={{
                      width: 300,
                      marginTop: 50,
                      position: "absolute",
                      zIndex: 100,
                    }}
                  >
                    <select
                      multiple
                      size={cities.length > 5 ? 5 : cities.length}
                      style={{ width: 300 }}
                    >
                      {cities.map((city) => (
                        <option
                          value={city.cityId}
                          key={city.cityId}
                          onClick={() => {
                            setLatLon(city.coordinates);
                            setValue("");
                          }}
                        >
                          {city.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              <br />
              <h5>or</h5>
              <br />
              <button
                className="button is-black"
                onClick={() => setFetchGeo(true)}
              >
                use your location
              </button>
              <div
                className="is-size-7 has-text-grey-light is-italic"
                style={{ marginTop: 8 }}
              >
                your location isn't stored
              </div>
            </>
          )}
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
      {/* <Footer latitude={latitude} longitude={longitude} /> */}
    </>
  );
};

export default Home;
