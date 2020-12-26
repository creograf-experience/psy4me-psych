import { connect } from 'react-redux';
import ProfileScreenComponent from './ProfileScreen';
import {
  getID,
  getProfileData,
  fetchFirstQuiz,
  fetchSecondQuiz,
} from './actions';
import {
  logOut,
} from '../../actions';


const mapStateToProps = state => ({
  fetching: state.profile.fetching,
  status: state.profile.status,
  errors: state.profile.status,
  userID: state.profile.userID,
  profile: state.profile.profile,
});

const mapDispatchToProps = dispatch => ({
  getID: (token) => {
    dispatch(getID(token));
  },

  getProfileData: (token) => {
    dispatch(getProfileData(token));
  },

  fetchFirstQuiz: (token) => {
    dispatch(fetchFirstQuiz(token));
  },

  fetchSecondQuiz: (token) => {
    dispatch(fetchSecondQuiz(token));
  },

  logOut: () => {
    dispatch(logOut());
  },
});

export const ProfileScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileScreenComponent);
