import { ConfigState, StoreAction } from './redux.interface.d';

export const incrementBusyCounter = (): StoreAction => ({
  type: 'config/INCREMENT_BUSY_COUNTER',
  payload: null
});

export const decrementBusyCounter = (): StoreAction => ({
  type: 'config/DECREMENT_BUSY_COUNTER',
  payload: null
});

export const setTheme = (payload): StoreAction => ({
  type: 'config/SET_THEME',
  payload
});

export const setTempType = (payload): StoreAction => ({
  type: 'config/SET_TEMP_TYPE',
  payload
});

export const addError = (payload): StoreAction => ({
  type: 'config/ADD_ERROR',
  payload
});
export const clearErrors = (): StoreAction => ({
  type: 'config/CLEAR_ERRORS',
  payload: null
});

const initialState: ConfigState = {
  tempType: 'f',
  theme: 'light',
  busyCounter: 0,
  errorMessages: []
};

export default function configReducer(state: ConfigState = initialState, action: StoreAction) {
  switch (action.type) {
    case 'config/SET_THEME':
      return { ...state, theme: action.payload };
    case 'config/SET_TEMP_TYPE':
      return { ...state, tempType: action.payload };
    case 'config/INCREMENT_BUSY_COUNTER':
      return { ...state, busyCounter: state.busyCounter + 1 };
    case 'config/DECREMENT_BUSY_COUNTER':
      const busyCounter = Math.max(state.busyCounter - 1, 0);
      return { ...state, busyCounter };
    case 'config/ADD_ERROR':
      return state.errorMessages.includes(action.payload)
        ? state
        : { ...state, errorMessages: [...state.errorMessages, action.payload] };
    case 'config/CLEAR_ERRORS':
      return { ...state, errorMessages: [] };
    default:
      return state;
  }
}
