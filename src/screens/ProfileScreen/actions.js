import { createAction } from 'redux-actions';

import {
  getIDNetworkRequest,
  getProfileNetworkRequest,
  fetchFirstQuizNetworkRequest,
  fetchSecondQuizNetworkRequest,
} from '../../networkers';


export const getDataRequest = createAction('GET_DATA_REQUEST');

export const getIDSuccess = createAction('GET_ID_SUCCESS');
export const getProfileSuccess = createAction('GET_PROFILE_SUCCESS');
export const fetchFirstQuizSuccess = createAction('FETCH_FIRST_QUIZ_SUCCESS');
export const fetchSecondQuizSuccess = createAction('FETCH_SECOND_QUIZ_SUCCESS');

export const getDataFailure = createAction('GET_DATA_FAILURE');

export const getID = token => async (dispatch) => {
  dispatch(getDataRequest());

  try {
    const { _id } = await getIDNetworkRequest(token);

    dispatch(getIDSuccess({ userID: _id }));
  } catch (error) {
    dispatch(getDataFailure({ serverError: error }));
  }
};

export const getProfileData = token => async (dispatch) => {
  dispatch(getDataRequest());

  try {
    const { profile } = await getProfileNetworkRequest(token);
    dispatch(getProfileSuccess({ profile }));
  } catch (error) {
    dispatch(getDataFailure({ serverError: error }));
  }
};

export const fetchFirstQuiz = token => async (dispatch) => {
  dispatch(getDataRequest());

  try {
    const { quiz } = await fetchFirstQuizNetworkRequest(token);
    dispatch(fetchFirstQuizSuccess({ quiz }));
  } catch (error) {
    dispatch(getDataFailure({ serverError: error }));
  }
};

export const fetchSecondQuiz = token => async (dispatch) => {
  dispatch(getDataRequest());

  try {
    const { quiz } = await fetchSecondQuizNetworkRequest(token);
    dispatch(fetchSecondQuizSuccess({ quiz }));
  } catch (error) {
    dispatch(getDataFailure({ serverError: error }));
  }
};
