import { executeRequest } from '../utils';

export const fetchAllChats = token => executeRequest({
  method: 'GET',
  url: 'private/psych/chats',
  token
})