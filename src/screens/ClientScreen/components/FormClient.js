import React from 'react';
import {View, Text} from 'react-native';
import { PlaceholderText, Line } from '../../../components';
import { colors } from '../../../constants';
import { strings } from "../../../../locale/i18n";

export const FormClient = ({troubleList,consultingObject,psychoHelp,depression})=>{
  
  return (
    <View style={{marginTop:20,width: '90%',alignSelf: 'center'}}>
        <View style={{borderBottomWidth:1,paddingBottom:15,borderColor:colors.halfTransparentColorPrimary}}>
          <Text style={{fontSize:16,fontWeight:'600'}}>
            {strings("firstQuiz.firstQuizTitle")}
          </Text>
        </View>
      
        <View style={{marginTop:15,borderBottomWidth:1,borderColor:colors.halfTransparentColorPrimary,paddingBottom:15}}>
          <PlaceholderText>{strings("client.clientTroubles")}</PlaceholderText>
          { troubleList ? (troubleList.map(el=>(<Text key={el} style={{marginTop:5}}>{el}</Text>))) : null}
        </View>
        <View style={{marginTop:10,borderBottomWidth:1,borderColor:colors.halfTransparentColorPrimary,paddingBottom:15}}>
          <PlaceholderText>{strings("client.clientTroubles1")}</PlaceholderText>
          <Text style={{marginTop:5}}>{consultingObject}</Text>
        </View>
        <View style={{marginTop:10,borderBottomWidth:1,borderColor:colors.halfTransparentColorPrimary,paddingBottom:15}}>
          <PlaceholderText>{strings("client.clientTroubles2")}</PlaceholderText>
          <Text style={{marginTop:5}}>{psychoHelp}</Text>
        </View>
        <View style={{marginTop:10,paddingBottom:15}}>
          <PlaceholderText>{strings("client.clientTroubles3")}</PlaceholderText>
          {depression ? <Text style={{marginTop:5}}>{strings("client.clientPositive")}</Text> : <Text style={{marginTop:5}}>{strings("client.clientNegative")}</Text>}
        </View>
    </View>
  );
}