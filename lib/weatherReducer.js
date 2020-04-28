export const SET_WEATHER = "SET_WEATHER";
export const SET_SELECTED_DAY_INDEX = "SET_SELECTED_DAY_INDEX";

export const initialState = {
  current: {},
  daily: [],
  hourly: [],
  selectedDayIndex: null,
};

export const weatherActions = (dispatch) => ({
  setWeather: (json) => dispatch({ type: SET_WEATHER, payload: json }),
  setSelectedDayIndex: (selectedDayIndex) =>
    dispatch({
      type: SET_SELECTED_DAY_INDEX,
      payload: { selectedDayIndex },
    }),
});

export const weatherSelectors = ({ daily, current, selectedDayIndex }) => ({
  getSelectedDay: () => {
    const day =
      selectedDayIndex !== undefined && selectedDayIndex !== null
        ? daily[selectedDayIndex]
        : current;
    const temp = day
      ? typeof day.temp === "object"
        ? day.temp.max
        : day.temp
      : 0;

    return {
      ...day,
      temp,
    };
  },
  getDaily: () => daily,
  getSelectedDayIndex: () => selectedDayIndex,
  isCurrentDay: () => selectedDayIndex === 0 || selectedDayIndex === null,
});

const weatherReducer = (state = initialState, action = {}) => {
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
