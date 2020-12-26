import { connect } from 'react-redux';
import ReChangeConsultationScreenComponent from './ReChangeConsultationScreen';

const mapStateToProps = state => ({
  userID: state.profile.userID,
});

const mapDispatchToProps = dispatch => ({
  
});

export const ReChangeConsultationScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReChangeConsultationScreenComponent);