import React, { Component } from 'react';
import {  View, Text, StyleSheet, Alert, AsyncStorage } from 'react-native';
import { ContainerWrapper, ScrollContentWrapper, AvatarWrapper, HintText } from '../../components';
import { Header, Button, AvatarContainer } from '../../containers';
import { colors, ALL_CONSULTATION_SCREEN, mediaHost, CLIENT_LIST_SCREEN, CLIENT_CONSULTATION_SCREEN} from '../../constants';
import { TimeInput } from './components/TimeInput';
import moment from 'moment';
import { rescheduleConsultationRequest } from '../../networkers/consultation';
import { strings } from "../../../locale/i18n";

export default class ReChangeConsultationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item:props.navigation.state.params.item,
      soloCons:props.navigation.state.params.soloCons,
      clientNav:props.navigation.state.params.clientNav,
      isDatePickerVisible:false,
      chooseDate:''
    };
  }

  handleStateChange = stateProp => newValue => this.setState({ [stateProp]: newValue });
  
  changeTimeCons=async(item)=>{
    const { chooseDate,clientNav }=this.state;
    if(chooseDate.length===0){
      Alert.alert(strings("timeRecord.warning"),strings("timeRecord.timeChoice"));
      return;
    } else {
      const newDate = {
        "id":item._id,
        "date":moment(chooseDate).valueOf()
      }
      const token = await AsyncStorage.getItem('jwt');
      await rescheduleConsultationRequest(newDate,token);
      Alert.alert('',strings("timeRecord.successOtherChoice"),[{
        text:'Ок', 
        onPress:()=>{clientNav ? this.props.navigation.navigate(CLIENT_CONSULTATION_SCREEN) : this.props.navigation.navigate(ALL_CONSULTATION_SCREEN)}}
      ])
    }
  }

  render() {
    const { item, soloCons, chooseDate, isDatePickerVisible }=this.state;
    return  (
      <ContainerWrapper>
        <View style={{flex:1}}>
          <Header 
            dotsButton
            closeButton
            title={strings("timeRecord.reRecord")}
            onLeftPress={()=>this.props.navigation.openDrawer()}
            onRightPress={()=>this.props.navigation.goBack()}
          />
          <ScrollContentWrapper contentContainerStyle={{ alignItems: 'center', marginTop:15 }}>

            <AvatarWrapper>
              <AvatarContainer
                avatar={item.client.avatar ? { uri: `${mediaHost}/psych/${item.client._id}/avatar/avatar_${item.client._id}.jpg` } : null}
              />
            </AvatarWrapper>

            <View style={styles.containerName }>
              <Text style={{ fontSize:14 }}>{item.client.lastName} {item.client.firstName} {item.client.middleName}</Text>
            </View>

            <Text style={{ fontSize:14,fontWeight:'600' }}>{strings("timeRecord.recTime")}</Text>

            { item.client.schedule 
              ? (item.client.schedule.map(el=>(
                <View style={{alignItems:'center'}} key={el._id}>
                  <HintText style={{marginTop:5}}>{el.weekDay}</HintText>
                  <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                    {(el.startTime>=0 && el.startTime<=9) ? <Text style={styles.dayStyle}>0{el.startTime}:00 - </Text> : <Text style={styles.dayStyle}>{el.startTime}:00 - </Text> }
                    {(el.endTime>=0 && el.endTime<=9) ? <Text style={styles.dayStyle}>0{el.endTime}:00</Text> : <Text style={styles.dayStyle}>{el.endTime}:00</Text> }
                  </View>
                </View>))) 
              : null}

            <View style={styles.hintContainer}>
              <Text style={[styles.textHeaderStyle,{marginBottom:15}]}>{strings("timeRecord.convTime")}</Text>
              <TimeInput
                isVisible={ isDatePickerVisible }
                value={ chooseDate }
                toggleVisible={this.handleStateChange('isDatePickerVisible')}
                onConfirm={ this.handleStateChange('chooseDate') }
              />  
              <Text style={{textAlign:'center',fontSize:12,color:colors.hintColor}}>{strings("timeRecord.psychAlert")}</Text>
              <Text style={[styles.textHeaderStyle,{marginTop:15}]}>{strings("timeRecord.duration")} {soloCons ? 60 : 90} {strings("timeRecord.min")}</Text>
            </View>

            <View style={{marginBottom:40}}>
              <Button
                text={strings("timeRecord.reRecord")}
                onPress={()=>this.changeTimeCons(item)}
              />
            </View>
            
          </ScrollContentWrapper>
        </View>
      </ContainerWrapper>
    );
  }
}

const styles=StyleSheet.create({
  containerName: {
    marginTop:15,
    marginBottom:15, 
    paddingBottom:15,
    borderBottomWidth:1,
    borderBottomColor:colors.halfTransparentColorPrimary,
    width:'90%',
    alignItems:'center'
  },
  dayStyle: {
    fontSize:12
  },
  hintContainer: {
    width:'100%',
    borderRadius:35,
    backgroundColor:colors.transparentColorPrimary,
    paddingVertical:20,
    paddingHorizontal:15,
    marginVertical:20,
    alignItems:'center'
  },
  textHeaderStyle:{
    fontSize:14,
    fontWeight:'600'
  }
})