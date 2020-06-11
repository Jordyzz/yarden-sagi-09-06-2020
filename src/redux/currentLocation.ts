import { StoreAction, CurrentLocationState } from './redux.interface.d';

export const setLocation = (payload): StoreAction => ({
  type: 'location/SET_LOCATION',
  payload
});

const initialState: CurrentLocationState = null;

export default function currentLocationReducer(
  state: CurrentLocationState = initialState,
  action: StoreAction
) {
  switch (action.type) {
    case 'location/SET_LOCATION':
      return action.payload;
    default:
      return state;
  }
}
