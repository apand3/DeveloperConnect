

import { SET_CURRENT_USER } from '../actions/types';
const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
}
function isEmpty(val){
  val===undefined ||
  val===null ||
  (typeof val==='object' && Object.keys(val).length===0)||
  (typeof val==='string' && val.trim().length===0);
}
