import { createStore } from 'redux';
import rootReducer from './rootReducer';

const store = createStore(rootReducer);

export default store;
export const dispatch = store.dispatch;
export const getState = store.getState;
