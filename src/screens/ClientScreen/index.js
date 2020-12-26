import { connect } from 'react-redux';
import ClientScreenComponent from './ClientScreen';
import {setActiveChats,clearMessages} from '../../actions';

const mapStateToProps = state => ({
  activeChat:state.chats.activeChat
});

const mapDispatchToProps = dispatch => ({
  setActiveChats: (chat)=>{
    dispatch(setActiveChats(chat));
  },
  clearMessages: () => {
    dispatch(clearMessages())
  },
});

export const ClientScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientScreenComponent);