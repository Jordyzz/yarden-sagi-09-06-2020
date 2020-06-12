import { ApiMap } from './http.interface';

const locationPrefix =
  'https://cors-anywhere.herokuapp.com/http://dataservice.accuweather.com/locations/v1/cities';
const forecastPrefix =
  'https://cors-anywhere.herokuapp.com/http://dataservice.accuweather.com/forecasts/v1/daily';
const conditionPrefix =
  'https://cors-anywhere.herokuapp.com/http://dataservice.accuweather.com/currentconditions/v1';
const apiKey = '1IYPmwH3VT5A6WuAAZkD8gWIjRGlJMu6';

export const apiMap: ApiMap = {
  locationAutoComplete: {
    url: `${locationPrefix}/autocomplete?apikey=${apiKey}&q=<%= input %>`,
    method: 'get'
  },
  getCurrentWeather: {
    url: `${conditionPrefix}/<%= key %>?apikey=${apiKey}`,
    method: 'get'
  },
  getFiveDayForecast: {
    url: `${forecastPrefix}/5day/<%= key %>?apikey=${apiKey}`,
    method: 'get'
  },
  getGeoPosition: {
    url: `${locationPrefix}/geoposition/search?apikey=${apiKey}&q=<%= lat %>,<%= lon %>`,
    method: 'get'
  }
};
