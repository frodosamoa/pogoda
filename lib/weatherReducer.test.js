import weatherReducer, {
  weatherSelectors,
  initialState,
  SET_WEATHER,
  SET_SELECTED_DAY_INDEX,
} from "./weatherReducer";

describe("weatherReducer", () => {
  test("initial state", () => {
    expect(weatherReducer()).toBe(initialState);
  });

  test(SET_SELECTED_DAY_INDEX, () => {
    const selectedDayIndex = 3;

    const nextState = weatherReducer(initialState, {
      type: SET_SELECTED_DAY_INDEX,
      payload: {
        selectedDayIndex,
      },
    });

    expect(nextState.selectedDayIndex).toBe(selectedDayIndex);
  });

  test(SET_WEATHER, () => {
    const payload = {
      current: "Rick Sanchez",
      daily: "Morty",
      hourly: "Mr. Meeseeks",
    };

    const nextState = weatherReducer(initialState, {
      type: SET_WEATHER,
      payload,
    });

    expect(nextState.current).toBe(payload.current);
    expect(nextState.daily).toBe(payload.daily);
    expect(nextState.hourly).toBe(payload.hourly);
  });
});

describe("weatherSelectors", () => {
  test("getSelectedDay", () => {});

  test("getDaily", () => {
    const { getSelectedDay } = weatherSelectors({
      daily: [{ temp: 54 }, { temp: { max: 76 } }],
    });

    expect(getSelectedDay()).toHaveProperty("temp");
    expect(getSelectedDay().temp).toBe(0);

    const { getSelectedDay: getSelectedDayThree } = weatherSelectors({
      daily: [{ temp: 54 }, { temp: { max: 76 } }],
      selectedDayIndex: 0,
    });

    expect(getSelectedDayThree()).toHaveProperty("temp");
    expect(getSelectedDayThree().temp).toBe(54);

    const { getSelectedDay: getSelectedDayTwo } = weatherSelectors({
      daily: [{ temp: 54 }, { temp: { max: 76 } }],
      selectedDayIndex: 1,
    });

    expect(getSelectedDayTwo()).toHaveProperty("temp");
    expect(getSelectedDayTwo().temp).toBe(76);
  });

  test("getSelectedDayIndex", () => {
    const selectedDayIndex = "Palmetto";
    const { getSelectedDayIndex } = weatherSelectors({ selectedDayIndex });

    expect(getSelectedDayIndex()).toBe(selectedDayIndex);
  });

  test("isCurrentDay", () => {
    const { getSelectedDayIndex } = weatherSelectors({ selectedDayIndex: 0 });

    expect(getSelectedDayIndex()).toBe(0);

    const { getSelectedDayIndex: getSelectedDayIndexNull } = weatherSelectors({
      selectedDayIndex: null,
    });

    expect(getSelectedDayIndexNull()).toBe(null);
  });
});
