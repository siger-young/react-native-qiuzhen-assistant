import { combineReducers } from 'redux';

import sessionReducer from './modules/session';
import configReducer from './modules/config';

export default combineReducers({
  session: sessionReducer,
  config: configReducer,
});
