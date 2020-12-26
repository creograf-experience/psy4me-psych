import { executeRequest } from '../utils';


export const getIDNetworkRequest = token => executeRequest({
  method: 'GET',
  url: 'private/psych/personal/id',
  token,
});

export const getProfileNetworkRequest = token => executeRequest({
  method: 'GET',
  url: 'private/psych/personal/profile',
  token,
});

export const fetchFirstQuizNetworkRequest = token => executeRequest({
  method: 'GET',
  url: 'private/psych/personal/fetchfirstquiz',
  token,
});

export const fetchSecondQuizNetworkRequest = token => executeRequest({
  method: 'GET',
  url: 'private/psych/personal/fetchsecondquiz',
  token,
});

export const fetchClientListNetworkRequest = token => executeRequest({
  method: 'GET',
  url: 'private/psych/personal/clientlist',
  token,
});