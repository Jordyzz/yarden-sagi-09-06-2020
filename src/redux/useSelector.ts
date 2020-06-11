import { useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux';
import { StoreState } from './redux.interface.d';

/* This is the useSelector hook from react-redux, automatically typed to the StoreState */

export const useSelector: TypedUseSelectorHook<StoreState> = useReduxSelector;
