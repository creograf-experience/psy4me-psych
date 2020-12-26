import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import { ContainerWrapper, ScrollContentWrapper, CallWrapper, AvatarWrapper, ContentWrapper, Spinner, ModalChangeAccept } from '../../components';
import { Header, AvatarContainer, Button, ConsultationSwitchButtons} from '../../containers';
import { colors,mediaHost, ALL_CONSULTATION_SCREEN, RE_CHANGE_CONSULTATION_SCREEN, CONS_CHAT_SCREEN, CLIENT_CONSULTATION_SCREEN } from '../../constants';
import {ModalRating, NoPressRatingView, ModalDoneConsultation} from './components';
import moment from 'moment';
import { ButtonWrapper } from '../SecondQuizScreen/components';
import { completeConsultationRequest, rateConsultationRequest } from '../../networkers/consultation';
import { strings } from "../../../locale/i18n";

export default class ConsultationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false,
      comment:'',
      isVisible:false,
      isVisibleRate:false,
      item:props.navigation.state.params.item,
      chat:props.navigation.state.params.chat,
      clientNav:props.navigation.state.params.clientNav,
      rating:3
    };
    this.consultStatus = {
      'Запланирована':'Консультация запланирована',
      'Завершена':'Консультация завершена', 
      'Перенесена':'Консультация перенесена'
    }
  }

  componentDidMount(){
    const { chat }= this.state;
    const {setActiveConsChats} = this.props;
    if(chat){
      this.setState({loading:true});
      setActiveConsChats(chat);
      this.setState({loading:false})
    }
  }

  hideModal = () => this.setState({isVisible: false});
  hideModalRate = () => this.setState({isVisibleRate: false, rating:3});

  renderCurrentConsult=()=>{
    const {isVisible,comment,clientNav,isVisibleRate,item,rating}=this.state;
    return (
      <>
      <ConsultationSwitchButtons onPressChat={()=>{this.props.navigation.navigate(CONS_CHAT_SCREEN,{clientProfile:item.client})}}/>
      <ScrollContentWrapper contentContainerStyle={{ alignItems: 'center', marginTop:15, marginBottom:15 }}>
        <View style={{alignItems:'center',flex:8}}>
          <Text style={{marginTop:15,alignItems:'center',flex:8}} style={[(item.durationInMinutes <= 5) ? styles.alert : null]}>
              {strings("consultation.consultEnd")} {item.durationInMinutes} {strings("allConsultations.min")}
          </Text>

          <CallWrapper>
            
          </CallWrapper>

          <View style={{flexDirection: 'row', marginTop:15, marginHorizontal: 10}}>
            <Text style={{ fontSize:14 }}>{item.client.firstName} {item.client.lastName}</Text>
          </View>

          <ButtonWrapper>
            {
              item.date + 10800000 >= item.date
              ? <Button
                  type='third'
                  text={strings("consultation.offerTime")}
                  onPress={()=>{this.props.navigation.navigate(RE_CHANGE_CONSULTATION_SCREEN,{item, clientNav, soloCons:true})}}
                />
              : <Button
                  text={strings("consultation.connect")}
                  type='third'
                  onPress={()=>{}}
                />
            }
          </ButtonWrapper>
        </View>
          <ButtonWrapper>
            <Button
              text={strings("consultation.noApp")}
              type="secondary"
              onPress={()=>this.setState({isVisible:true})}
            />
          </ButtonWrapper>
          
          <ModalDoneConsultation
            isVisible={isVisible}
            closeModal={()=>this.hideModal()}
            onChangeText={comment=>this.setState({comment})}
            value={comment}
            onPressSave={()=>this.consultationComment()}
          /> 
           {/*<ModalChangeAccept
            isVisible={isVisible}
            item={item}
            onPressChange={()=>this.changeConsultation()}
            onPressSave={()=>this.hideModal()}
           />*/}
          <ModalRating
            isVisible={isVisibleRate}
            rating={rating}
            onFinishRating={(rating)=>this.setState({rating})}
            closeModal={()=> this.hideModalRate()}
            onPressRate={()=> this.rateConsultation()}
          />
      </ScrollContentWrapper>
      </>
    )
  }

  // changeConsultation = () => {
  //   const {item,clientNav}=this.state
  //   const {navigation} = this.props;
  //   this.setState({isVisible:false,loading:true});
  //   this.props.navigation.navigate(RE_CHANGE_CONSULTATION_SCREEN,{item ,soloCons:true,clientNav})
  //   this.setState({loading:false});
  // }

  consultationComment = async () => {
    const {comment,item} = this.state;
    const {navigation} = this.props;
    const postComment = {
      "comment":comment
    }
    this.setState({isVisible:false,loading:true});
    const token = await AsyncStorage.getItem('jwt');
    await completeConsultationRequest(item._id,token);
    setTimeout(()=>this.setState({isVisibleRate:true,loading:false}),1500)
  }

  rateConsultation = async () => {
    const {item,rating,clientNav} = this.state;
    const rate = {
      id:item._id,
      connectionRating:rating
    }
    const token = await AsyncStorage.getItem('jwt');
    await rateConsultationRequest(rate,token);
    if(clientNav) this.props.navigation.navigate(CLIENT_CONSULTATION_SCREEN)
    else this.props.navigation.navigate(ALL_CONSULTATION_SCREEN)
  }

  renderCompleteConsult=()=>{
    const {item}=this.state
    return(
      <>
      <View style={{marginTop:15,alignItems:'center',flex:5.2}}>
        <AvatarWrapper>
          <AvatarContainer
            avatar={item.client.avatar ?{ uri: `${mediaHost}/client/${item.client._id}/avatar/avatar_${item.client._id}.jpg` } : null}
          />
        </AvatarWrapper>
        <View style={styles.containerName }>
          <Text style={{ fontSize:14 }}>{item.client.lastName} {item.client.firstName} {item.client.middleName}</Text>
        </View>
        <Text style={{fontSize:12,marginBottom:5}}>{item.durationInMinutes} {strings("allConsultations.min")}</Text>
        <Text style={{fontSize:12,color:colors.selectedRadioColor}}>{this.consultStatus[item.status]}</Text>
        <Text style={{fontSize:12,marginTop:5,color:colors.hintColor}}>{moment(item.date).format('HH:mm DD.MM.YYYY')}</Text>
        <NoPressRatingView
          text={strings("consultation.communEvaluation")}
          ratingValue={item.psychRating.connection}
        />
      </View>
      <ButtonWrapper>
        <Button
          text="Назад"
          onPress={()=>this.props.navigation.goBack()}
        />
      </ButtonWrapper>
      </>
    )
  }

  render() {
    const {loading, item}=this.state;
    return  (
      <ContainerWrapper>
        <ContentWrapper>
          <Header 
            dotsButton
            title={strings("allConsultations.consulTitle")}
            onLeftPress={()=>this.props.navigation.openDrawer()}
          />
          {loading 
            ? (<Spinner/>)
            :  item.status==='Завершена' ? this.renderCompleteConsult() : this.renderCurrentConsult()
          }
        </ContentWrapper>
      </ContainerWrapper>
    );
  }
}

const styles = StyleSheet.create({
  containerName: {
    marginTop:15,
    marginBottom:10, 
    paddingBottom:15,
    width:'90%',
    alignItems:'center'
  },
  alert: {
    color: 'red'
  },
  ready: {
    color: 'green'
  }
})