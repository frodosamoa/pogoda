export const SWITCH_UNITS = "SWITCH_UNITS";
export const SET_WEATHER = "SET_WEATHER";

export const initialState = {
  units: "imperial",
  current: {},
  daily: [],
  hourly: [],
};

const weatherReducer = (state, action) => {
  const { type, payload } = action;

  if (type === SWITCH_UNITS) {
    const { units } = payload;
    return { ...state, units };
  }

  if (type === SET_WEATHER) {
    const { current, daily, hourly } = payload;
    return {
      ...state,
      current,
      daily,
      hourly,
    };
  }

  return state;
};

export default weatherReducer;
