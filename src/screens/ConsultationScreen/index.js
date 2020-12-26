import { connect } from 'react-redux';
import ConsultationScreenComponent from './ConsultationScreen';
import {setActiveConsChats,clearActiveChats} from '../../actions';

const mapStateToProps = state => ({
  activeConsChat:state.chats.activeConsChat
});

const mapDispatchToProps = dispatch => ({
  setActiveConsChats: (chat)=>{
    dispatch(setActiveConsChats(chat));
  },
  clearActiveChats: ()=>{
    dispatch(clearActiveChats())
  }
});

export const ConsultationScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConsultationScreenComponent);