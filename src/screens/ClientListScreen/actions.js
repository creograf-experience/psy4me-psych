import { createAction } from 'redux-actions';

import {
  fetchClientListNetworkRequest
} from '../../networkers';

export const getClientListRequest = createAction('GET_CLIENT_LIST_REQUEST');
export const getClientListSuccess = createAction('GET_CLIENT_LIST_SUCCESS');
export const getClientListFailure = createAction('GET_CLIENT_LIST_FAILURE');

export const getClientList = token => async (dispatch) => {
  dispatch(getClientListRequest());

  try {
    const { clientList } = await fetchClientListNetworkRequest(token);
    
    dispatch(getClientListSuccess({ clientList }));
  } catch (error) {
    dispatch(getClientListFailure({ serverError: error }));
  }
};