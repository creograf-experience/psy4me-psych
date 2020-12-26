import { combineReducers } from 'redux';
import { auth,chats,socket,messages } from '../reducers';
import { registration } from '../screens/RegistrationScreen/reducers';
import { logIn } from '../screens/AuthenticationScreen/reducers';
import { resetPW } from '../screens/PasswordResetScreen/reducers';
import { firstQuiz } from '../screens/FirstQuizScreen/reducers';
import { secondQuiz } from '../screens/SecondQuizScreen/reducers';
import { profile } from '../screens/ProfileScreen/reducers';
import { client } from '../screens/ClientListScreen/reducers';
import { consultations } from '../screens/AllConsultationScreen/reducers';

export default combineReducers({
  auth,
  registration,
  logIn,
  resetPW,
  firstQuiz,
  secondQuiz,
  profile,
  consultations,
  client,
  chats,
  socket,
  messages
});
