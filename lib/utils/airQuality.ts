export const getAirQualityLabel = (airQuality: number): string => {
  if (airQuality <= 33) {
    return "Very Good";
  } else if (airQuality <= 66) {
    return "Good";
  } else if (airQuality <= 99) {
    return "Fair";
  } else if (airQuality <= 149) {
    return "Poor";
  } else if (airQuality <= 200) {
    return "Very Poor";
  }

  return "Hazardous";
};

export const getAirQualityMessage = (airQuality: number): string => {
  if (airQuality <= 66) {
    return "Enjoy normal activities.";
  } else if (airQuality <= 99) {
    return "People unusually sensitive to air pollution should reduce outdoor activity.";
  } else if (airQuality <= 149) {
    return "Everyone should avoid outdoor actitivities if symptoms arise.";
  } else if (airQuality <= 200) {
    return "Everyone should avoid outdoor actitivities if symptoms arise.";
  }

  return "Stay indoors as much as possible.";
};
