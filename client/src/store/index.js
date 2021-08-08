import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

let store;

export function configureStore() {
  store = createStore(reducers, compose(applyMiddleware(thunk)));
  return store;
}
