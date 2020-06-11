import { Temperature, Forecast } from '@components/LocationForecast/LocationForecast.interface';

export interface StoreState {
  config: ConfigState;
  favorites: FavoritesState;
  currentLocation: CurrentLocationState;
}

export interface StoreAction {
  type: string;
  payload: any;
}

export interface ConfigState {
  theme: string;
  tempType: TempType;
  busyCounter: number;
  errorMessages: Array<string>;
}

export interface CurrentLocationState {
  id: string;
  name: string;
  forecast: Array<Forecast>;
}

export type TempType = 'f' | 'c';

export type FavoritesState = Array<Favorite>;

export interface Favorite {
  id: string;
  name: string;
  description: string;
  temperature: Temperature;
  iconId?: number;
}
