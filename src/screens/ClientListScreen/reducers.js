import { handleActions } from 'redux-actions';
import {
  getClientListFailure,
  getClientListRequest,
  getClientListSuccess
} from './actions';


const initialState = {
  fetching: false,
  status: null,
  clientList:[],
  errors: null,
};

export const client = handleActions(
  {
    [getClientListRequest](state) {
      return { ...state, fetching: true };
    },
    [getClientListSuccess](state, { payload }) {
      return {
        ...state,
        clientList:payload.clientList,
        errors: null,
        status: 'ok',
        fetching: false,
      };
    },
    [getClientListFailure](state, { payload }) {
      return {
        ...state,
        errors: payload.serverError,
        status: 'error',
        fetching: false,
      };
    },
  },
  initialState
);

