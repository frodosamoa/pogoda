export const SET_WEATHER = "SET_WEATHER";
export const SET_SELECTED_DAY_INDEX = "SET_SELECTED_DAY_INDEX";

export const initialState = {
  current: {},
  daily: [],
  hourly: [],
  selectedDayIndex: null,
};

const weatherReducer = (state, action) => {
  const { type, payload } = action;

  if (type === SET_SELECTED_DAY_INDEX) {
    const { selectedDayIndex } = payload;
    return { ...state, selectedDayIndex };
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
