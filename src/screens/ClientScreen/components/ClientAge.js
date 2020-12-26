import React from 'react';
import {View, Text} from 'react-native';
import { QuizFieldWrapper } from '../../FirstQuizScreen/components';
import { PlaceholderText, Line } from '../../../components';
import { strings } from "../../../../locale/i18n";

export const ClientAge = ({age})=>{
  const moment = require('moment');
  moment.suppressDeprecationWarnings = true;
  const year=moment().diff(age,'years');
  var textAge='';
  (year %10 == 1 && year %100 != 11 
    ? textAge='год' 
    : ((year %10 >= 2 && year %10 <= 4 && year < 5) 
      || (year %10 >= 2 && year %10 <= 4 && year > 20) 
      && !(year %100 >= 11 && year %100 <= 14))
        ? textAge='года'
        : textAge='лет')
  return (
    <QuizFieldWrapper activeOpacity={1}>
      <View style={{flexDirection:'row',flex:1,alignItems:'center'}}>
        <PlaceholderText>
          {strings("client.clientAge")}
        </PlaceholderText>
        <View style={{alignItems:'flex-end',flex:1}}>
          <Text>
            {year} {textAge}
          </Text>
        </View>
      </View>
      <Line/>
    </QuizFieldWrapper>
  );
}