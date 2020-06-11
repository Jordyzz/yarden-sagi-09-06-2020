import { combineReducers, Reducer } from 'redux';
import * as RI from './redux.interface';
import configReducer from './config';
import favoritesReducer from './favorites';
import currentLocationReducer from './currentLocation';

const rootReducer = combineReducers({
  config: configReducer as Reducer<RI.ConfigState>,
  favorites: favoritesReducer as Reducer<RI.FavoritesState>,
  currentLocation: currentLocationReducer as Reducer<RI.CurrentLocationState>
});

export default rootReducer;
