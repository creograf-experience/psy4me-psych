import { executeRequest } from '../utils';

export const fetchAllConsultationRequest = token => executeRequest({
  method: 'GET',
  url: 'private/psych/consultations',
  token
});

export const rescheduleConsultationRequest = (newDate, token) => executeRequest({
  method:'PUT',
  url: 'private/psych/consultations',
  body: {
    content: JSON.stringify( newDate ),
    contentType: 'application/json',
  },
  token,
});

export const acceptRescheduleConsultationRequest = (id,token) => executeRequest({
  method:'PUT',
  url: 'private/psych/consultations/accept-reschedule',
  body: {
    content: JSON.stringify({ id }),
    contentType: 'application/json'
  },
  token
});

export const completeConsultationRequest = (id,token) => executeRequest({
  method:'PUT',
  url: 'private/psych/consultations/complete',
  body: {
    content: JSON.stringify( {id} ),
    contentType: 'application/json'
  },
  token
});

export const rateConsultationRequest = (rate,token) => executeRequest({
  method:'PUT',
  url: 'private/psych/consultations/rate',
  body: {
    content: JSON.stringify( rate ),
    contentType: 'application/json'
  },
  token
});