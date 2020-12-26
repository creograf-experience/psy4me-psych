import React, { Component } from 'react';
import { View } from 'react-native';
import { ContainerWrapper, ScrollContentWrapper, AvatarWrapper } from '../../components';
import { Header, SwitchButtons, AvatarContainer } from '../../containers';
import { mediaHost, CLIENT_CONSULTATION_SCREEN, CHAT_SCREEN } from '../../constants';
import { QuizField } from '../FirstQuizScreen/containers';
import { ClientAge, FormClient, RecomendTimeRecord } from './components';
import { strings } from "../../../locale/i18n";

export default class ClientScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      client:props.navigation.state.params.item,
      chat:props.navigation.state.params.chat
    };
    this.fioFields = [
      {
        placeholder: strings("profile.lastName"),
        name: 'lastName',
      },
      {
        placeholder: strings("profile.firstName"),
        name: 'firstName',
      },
      {
        placeholder: strings("profile.middleName"),
        name: 'middleName',
      },
      {
        placeholder: strings("profile.gender"),
        name: 'gender',
      }
    ];
    this.extraInfo = [
      {
        placeholder: strings("profile.country"),
        name: 'country',
      },
      {
        placeholder: strings("profile.timeZone"),
        name: 'timezone',
      },
      {
        placeholder: strings("profile.language"),
        name: 'language',
      },
    ];
  }

  componentDidMount() {
    const { chat }= this.state;
    const {setActiveChats} = this.props;
    if(chat){
      this.setState({loading:true});
      setActiveChats(chat);
      this.setState({loading:false})
    }
  }

  
  render() {
    const {client}=this.state;
    return  (
      <ContainerWrapper>
        <View style={{flex:1}}>
          <Header 
            dotsButton
            title={strings("consultation.myClients")}
            onLeftPress={()=>this.props.navigation.openDrawer()}
          />
          <SwitchButtons
            onPressConsultation={()=>{this.props.clearMessages();this.props.navigation.navigate(CLIENT_CONSULTATION_SCREEN,{client})}}
            onPressChat={()=>{this.props.clearMessages();this.props.navigation.navigate(CHAT_SCREEN,{clientProfile:client})}}
          />
        <ScrollContentWrapper contentContainerStyle={{ alignItems: 'center',marginTop:15 }}>
          <AvatarWrapper>
            <AvatarContainer
              avatar={client.avatar ? { uri: `${mediaHost}/client/${client._id}/avatar/avatar_${client._id}.jpg` } : null}
            />
          </AvatarWrapper>  
          {this.fioFields.map(({placeholder, name}, index)=>(
            <QuizField
              key={index}
              type="immutable"
              placeholder={placeholder}
              value={client[name]}
            />
          ))}
          <ClientAge
            age={client.birthDay}
          />
          <FormClient
            troubleList={client.troubles}
            consultingObject={client.consultingObject}
            psychoHelp={client.psychoHelp}
            depression={client.depression}
          />
          {this.extraInfo.map(({ placeholder, name }, index)=> (
            <QuizField
              key={index}
              type="immutable"
              placeholder={placeholder}
              value={client[name]}
            />
          ))}
          <View style={{marginBottom:40}}></View>
          <RecomendTimeRecord
            schedule={client.schedule}
          />
        </ScrollContentWrapper>
        </View>
      </ContainerWrapper>
    );
  }
}