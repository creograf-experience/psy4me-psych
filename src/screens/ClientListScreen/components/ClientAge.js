import React from 'react';
import { Text } from 'react-native';
import moment from 'moment';


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
    <Text style={{fontSize:14}}>{year} {textAge}</Text>
  );
}