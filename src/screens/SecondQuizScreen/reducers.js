import { handleActions } from 'redux-actions';
import {
  secondQuizSubmissionRequest,
  secondQuizSubmissionSuccess,
  secondQuizSubmissionFailure,
} from './actions';


const initialState = {
  fetching: false,
  status: null,
  errors: null,
};

export const secondQuiz = handleActions(
  {
    [secondQuizSubmissionRequest](state) {
      return { ...state, fetching: true };
    },
    [secondQuizSubmissionSuccess](state) {
      return {
        ...state,
        errors: null,
        status: 'ok',
        fetching: false,
      };
    },
    [secondQuizSubmissionFailure](state, { payload }) {
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
