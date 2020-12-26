import { connect } from 'react-redux';
import ClientListScreenComponent from './ClientListScreen';
import { getClientList } from './actions';
import {getUserChats, clearActiveChats} from '../../actions';

const mapStateToProps = state => ({
  clientList:state.client.clientList,
  chatList:state.chats.chatList,
});

const mapDispatchToProps = dispatch => ({
  getClientList: (token) => {
    dispatch(getClientList(token));
  },
  getUserChats: (token)=>{
    dispatch(getUserChats(token));
  },
  clearActiveChats:()=>{
    dispatch(clearActiveChats());
  }
});

export const ClientListScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientListScreenComponent);