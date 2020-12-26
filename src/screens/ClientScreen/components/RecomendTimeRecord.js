import React from 'react';
import {View, Text} from 'react-native';
import { colors } from '../../../constants';
import { strings } from "../../../../locale/i18n";


export const RecomendTimeRecord = ({schedule})=>{
  
  return (
    <View style={{marginTop:20,width: '90%',alignSelf: 'center',marginBottom:20}}>
        <View style={{borderBottomWidth:1,paddingBottom:15,borderColor:colors.halfTransparentColorPrimary}}>
          <Text style={{fontSize:16,fontWeight:'600'}}>
            {strings("timeRecord.recTime")}
          </Text>
        </View>
      
        <View style={{marginTop:15,borderBottomWidth:1,borderColor:colors.halfTransparentColorPrimary,paddingBottom:15}}>
          { schedule 
            ? (schedule.map(el=>(
              <View key={el._id}>
                <Text style={{marginTop:5}}>{el.weekDay}</Text>
                <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                  {(el.startTime>=0 && el.startTime<=9) ? <Text>0{el.startTime}:00 - </Text> : <Text>{el.startTime}:00 - </Text> }
                  {(el.endTime>=0 && el.endTime<=9) ? <Text>0{el.endTime}:00</Text> : <Text>{el.endTime}:00</Text> }
                </View>
              </View>))) 
            : null}
        </View>
        
    </View>
  );
}