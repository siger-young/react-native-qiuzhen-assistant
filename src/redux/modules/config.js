import { createAction, handleActions } from 'redux-actions';

import Themes from '../../themes';
// Action types;
export const INITIAL_OVER = 'app/session/initial_over';
export const CHANGE_THEME = 'app/session/change_theme';
// Initial state
const initialState = {
  appName: '求真帮',
  appVersion: 'v0.3',
  theme: Themes[0],
  options: {
    notifications: true,
  },
};
// reducer
const reducer = handleActions({
  [INITIAL_OVER]: (state, action) => {
    return {
      ...state,
      ...action.payload,
    };
  },
  [CHANGE_THEME]: (state, action) => {
    return {
      ...state,
      theme: action.payload,
    };
  },
}, initialState);
export default reducer;

// action creators:
export const initialOver = createAction(INITIAL_OVER);
export const changeTheme = createAction(CHANGE_THEME);

// async action creators: create async function as redux-thunk.
export function init() {
  return async (dispatch) => {
    const info = await fetch('/users/me');
    dispatch(initialOver(info));
  };
}

// export function changeTheme(theme) {
//   return async (dispatch) => {
//     dispatch(changeThemeAction(theme));
//   };
// }
