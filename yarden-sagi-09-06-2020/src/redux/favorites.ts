import { FavoritesState, StoreAction } from './redux.interface.d';

export const initFavorites = (payload): StoreAction => ({
  type: 'favorites/INIT',
  payload
});

export const addFavorite = (payload): StoreAction => ({
  type: 'favorites/ADD_FAVORITE',
  payload
});

export const removeFavorite = (payload): StoreAction => ({
  type: 'favorites/REMOVE_FAVORITE',
  payload
});

const initialState: FavoritesState = [];

export default function favoritesReducer(
  state: FavoritesState = initialState,
  action: StoreAction
) {
  switch (action.type) {
    case 'favorites/INIT':
      return [...action.payload];
    case 'favorites/ADD_FAVORITE':
      return [...state, action.payload];
    case 'favorites/REMOVE_FAVORITE':
      return [...state.filter(item => item.id !== action.payload)];
    default:
      return state;
  }
}
