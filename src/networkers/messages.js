import { executeRequest } from '../utils';

export const fetchMessages = (chatId,limit,skip,token) => executeRequest({
  method: 'GET',
  url: `private/psych/message/${chatId}?limit=${limit}&skip=${skip}`,
  token
})