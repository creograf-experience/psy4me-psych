import React, { Component } from 'react';
import { AsyncStorage, View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { ContainerWrapper, PlaceholderText, Spinner } from '../../components';
import { Header } from '../../containers';
import { colors,mediaHost, CLIENT_SCREEN } from '../../constants';
import { AvatarList, ClientAge  } from './components';
import { strings } from "../../../locale/i18n";

export default class ClientListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
     clientList:[],
     loading:true,
     refreshing:false
    };
  }

  async componentDidMount() {
   const {getClientList,getUserChats}=this.props;
   const token = await AsyncStorage.getItem('jwt');
   await getUserChats(token);
   setTimeout(async () => await getClientList(token), 2000);
  }

  componentDidUpdate(prevProps){
    if(prevProps.clientList!==this.props.clientList){
      this.setState({clientList:this.props.clientList,loading:false,refreshing:false})
    }
  }

  onRefresh= async() => {
    this.setState({refreshing:true});
    const {getClientList,getUserChats}=this.props;
    const token = await AsyncStorage.getItem('jwt');
    await getUserChats(token);
    setTimeout(async () => await getClientList(token), 2000);
  }

  renderItem=({item})=>{
    const chat=this.props.chatList.find(el=>(el.receivingId===item._id ) && el.consultationChat===false);
    return(
      <TouchableOpacity style={styles.itemContainer}
        onPress={()=>{this.props.clearActiveChats(); this.props.navigation.navigate(CLIENT_SCREEN,{item,chat})}}
      >
        <View style={{ marginRight:5, marginTop: 5, flex:1 }}>
          <AvatarList
            avatar={item.avatar ? { uri: `${mediaHost}/client/${item._id}/avatar/avatar_${item._id}.jpg` } : null}
          />
        </View>
        <View style={{flex:3, marginTop: 10, marginLeft: 3}}>
          <Text style={{fontSize:14}}>{item.firstName} {item.lastName}</Text>
          <ClientAge age={item.birthDay}/>
          <PlaceholderText>{strings("payment.consultations")}</PlaceholderText>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const {clientList,loading, refreshing}=this.state;

    return  (
      <ContainerWrapper>
        <View style={{flex:1}}>
          <Header 
            dotsButton
            title={strings("consultation.myClients")}
            onLeftPress={()=>this.props.navigation.openDrawer()}
          />

          {loading 
            ? (
              <Spinner/>
            ) 
            : (
              <View style={{flex:9}}>
                <FlatList
                  style={{marginTop:5}}
                  data={clientList}
                  renderItem={this.renderItem}
                  refreshing={refreshing}
                  onRefresh={this.onRefresh}
                  keyExtractor={(item,index)=>index.toString()}
                />
              </View>
          )}
        </View>
      </ContainerWrapper>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer:{
    flexDirection:'row',
    marginRight:10,
    marginLeft:10,
    paddingBottom:7,
    borderBottomWidth:1,
    borderBottomColor:colors.halfTransparentColorPrimary
  }
})