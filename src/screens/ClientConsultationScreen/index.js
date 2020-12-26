import { connect } from 'react-redux';
import ClientConsultationScreenComponent from './ClientConsultationScreen';
import { getAllConsultation } from '../AllConsultationScreen/actions';
import { clearActiveConsChats, clearMessages } from '../../actions';

const mapStateToProps = state => ({
  allConsultations: state.consultations.allConsultations,
  chatList:state.chats.chatList,
  activeConsChat:state.chats.activeConsChat
});

const mapDispatchToProps = dispatch => ({
  getAllConsultation: (token)=>{
    dispatch(getAllConsultation(token));
  },
  clearActiveConsChats:()=>{
    dispatch(clearActiveConsChats());
  },
  clearMessages: () => {
    dispatch(clearMessages())
  },
});

export const ClientConsultationScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientConsultationScreenComponent);