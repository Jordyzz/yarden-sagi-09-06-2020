import { pick } from 'lodash';

import { httpService } from './HttpService/HttpService';
import { LocationAutoCompleteResponse } from './HttpService/http.interface';
import { Favorite, CurrentLocationState } from '@redux/redux.interface';
import { dispatch, getState } from '@redux/store';
import { addFavorite, initFavorites, removeFavorite } from '@redux/favorites';
import { storageService } from './StorageService';
import { setLocation } from '@redux/currentLocation';
import { setTempType } from '@redux/config';

let timeoutHandler: NodeJS.Timeout;

class WeatherService {
  private ms: number = 300;
  private defaultLocationKey: { key: string; name: string } = { key: '215854', name: 'Tel Aviv' };

  getLocationSuggestions(input: string): Promise<Array<LocationAutoCompleteResponse>> {
    clearTimeout(timeoutHandler);
    return new Promise(resolve => {
      timeoutHandler = setTimeout(
        () =>
          httpService
            .api<Array<LocationAutoCompleteResponse>>({
              type: 'locationAutoComplete',
              urlParams: { input }
            })
            .then(locations => {
              resolve(locations);
            }),
        this.ms
      );
    });
  }

  private getCurrentWeather(key: string, name: string) {
    return httpService
      .api({
        type: 'getCurrentWeather',
        urlParams: { key }
      })
      .then(res => {
        return this.prepareCurrentWeather(key, name, res[0]);
      });
  }

  private prepareCurrentWeather(key: string, name: string, currentWeather: any) {
    return {
      id: key,
      name,
      description: currentWeather.WeatherText,
      temperature: {
        c: currentWeather.Temperature.Metric.Value,
        f: currentWeather.Temperature.Imperial.Value
      },
      iconId: currentWeather.WeatherIcon
    };
  }

  getLocationForcast({ key, name }) {
    httpService
      .api({
        type: 'getFiveDayForecast',
        urlParams: { key }
      })
      .then((res: any) => {
        const currentLocation: CurrentLocationState = {
          id: key,
          name,
          forecast: this.prepareDailyForecast(res.DailyForecasts)
        };

        dispatch(setLocation(currentLocation));
      });
  }

  // Server to local
  private prepareDailyForecast(forecast: any) {
    return forecast.map(day => ({
      date: day.Date,
      description: day.Day.IconPhrase,
      temperature: {
        f: day.Temperature.Maximum.Value,
        c: this.convertToCelcius(day.Temperature.Maximum.Value)
      },
      iconId: day.Day.Icon
    }));
  }

  toggleFavorites(location: Favorite) {
    const currentFavorites = getState().favorites;
    currentFavorites.map(f => f.id).includes(location.id)
      ? this.removeFromFavorites(location)
      : this.addToFavorites(location);
  }

  addToFavorites(location: Favorite) {
    const currentFavorites = getState().favorites;
    dispatch(addFavorite(location));
    storageService.set('favorites', [
      ...currentFavorites.map(f => pick(f, ['id', 'name'])),
      pick(location, ['id', 'name'])
    ]);
  }

  removeFromFavorites(location: Favorite) {
    const currentFavorites = getState().favorites.filter(f => f.id !== location.id);

    dispatch(removeFavorite(location.id));
    storageService.set('favorites', [...currentFavorites.map(f => pick(f, ['id', 'name']))]);
  }

  getUserGeoLocation() {
    navigator.geolocation.getCurrentPosition(
      pos => this.getForecastByGeoLocation(pos.coords),
      () => this.getLocationForcast(this.defaultLocationKey)
    );
  }

  getForecastByGeoLocation(coords: Coordinates) {
    const { latitude, longitude } = coords;

    httpService
      .api({
        type: 'getGeoPosition',
        urlParams: { lat: latitude, lon: longitude }
      })
      .then((res: any) => {
        dispatch(setLocation({ id: res.Key, name: res.AdministrativeArea.EnglishName }));
      });
  }

  getSavedFavorites() {
    const favorites = storageService.get('favorites');
    Promise.all(favorites.map(f => this.getCurrentWeather(f.id, f.name))).then(res => {
      dispatch(initFavorites(res));
    });
  }

  toggleTemperatureType(tempType: string) {
    dispatch(setTempType(tempType === 'f' ? 'c' : 'f'));
  }

  private convertToCelcius(fahrenheit: number) {
    return Math.floor((5 / 9) * (fahrenheit - 32));
  }
}

export const weatherService = new WeatherService();
