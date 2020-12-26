import { executeRequest } from '../utils';

export const logInNetworkRequest = (phone, password) => executeRequest({
  method: 'POST',
  url: 'public/psych/auth/login',
  body: {
    content: JSON.stringify({ phone, password }),
    contentType: 'application/json',
  },
});

export const registerNetworkRequest = (phone, password) => executeRequest({
  method: 'POST',
  url: 'public/psych/auth/reg',
  body: {
    content: JSON.stringify({ phone, password }),
    contentType: 'application/json',
  },
});

export const resetPasswordNetworkRequest = phone => executeRequest({
  method: 'POST',
  url: 'public/psych/auth/code',
  body: {
    content: JSON.stringify({ phone }),
    contentType: 'application/json',
  },
});

export const codeSubmissionNetworkRequest = (phone, code) => executeRequest({
  method: 'PUT',
  url: 'public/psych/auth/code',
  body: {
    content: JSON.stringify({ phone, code }),
    contentType: 'application/json',
  },
});

export const newPasswordNetworkRequest = (password, token) => executeRequest({
  method: 'PUT',
  url: 'private/psych/auth/password',
  body: {
    content: JSON.stringify({ password }),
    contentType: 'application/json',
  },
  token,
});

export const firstQuizSubmissionNetworkRequest = (quiz, token) => executeRequest({
  method: 'PUT',
  url: 'private/psych/auth/firstquiz/',
  body: {
    content: quiz,
    contentType: 'multipart/form-data',
  },
  token,
});

export const secondQuizSubmissionNetworkRequest = (quiz, token) => executeRequest({
  method: 'PUT',
  url: 'private/psych/auth/secondquiz/',
  body: {
    content: quiz,
    contentType: 'multipart/form-data',
  },
  token,
});
