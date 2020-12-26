import { createAction } from 'redux-actions';
import { AsyncStorage } from 'react-native';

import { secondQuizSubmissionNetworkRequest } from '../../networkers';


export const secondQuizSubmissionRequest = createAction('QUIZ_SUBMISSION_REQUEST');
export const secondQuizSubmissionSuccess = createAction('QUIZ_SUBMISSION_SUCCESS');
export const secondQuizSubmissionFailure = createAction('QUIZ_SUBMISSION_FAILURE');

export const submitQuiz = quiz => async (dispatch) => {
  dispatch(secondQuizSubmissionRequest());

  try {
    const token = await AsyncStorage.getItem('jwt');
    const response = await secondQuizSubmissionNetworkRequest(quiz, token);
    dispatch(secondQuizSubmissionSuccess());
    AsyncStorage.setItem('quizDone', 'done');
  } catch (error) {
    dispatch(secondQuizSubmissionFailure({ serverError: error }));
  }
};
