import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {persistCombineReducers} from 'redux-persist';
import {AsyncStorage} from 'react-native';
import thunk from 'redux-thunk';
import user from '@redux/user/reducer';

const reducers = {
  user,
};

export default createStore(
  persistCombineReducers(
    {
      key: 'root',
      storage: AsyncStorage,
    },
    reducers,
  ),
  composeWithDevTools(applyMiddleware(thunk)),
);
