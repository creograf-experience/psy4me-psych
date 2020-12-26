import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native';
import { colors } from '../constants';

const width=Dimensions.get('window').width;
export const SwitchButtons = ({onPressConsultation,onPressProfileClient,onPressChat}) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onPressProfileClient} style={[styles.btnLayout,onPressProfileClient ? null : styles.current]}>
      <Text style={{fontSize:width<=320 ? 14: 16,color:onPressProfileClient ? null : colors.hintColor}}>Профиль</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={onPressConsultation} style={[styles.btnLayout,onPressConsultation ? null : styles.current]}>
      <Text style={{fontSize:width<=320 ? 14: 16,color:onPressConsultation ? null : colors.hintColor}}>Консультации</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={onPressChat} style={[styles.btnLayout,onPressChat ? null : styles.current]}>
      <Text style={{fontSize:width<=320 ? 14: 16,color:onPressChat ? null : colors.hintColor}}>Чат</Text>
    </TouchableOpacity>
  </View>
);

const styles=StyleSheet.create({
  btnLayout:{
    flex:1,
    alignItems:'center',
    justifyContent:'flex-start',
    paddingTop:7,
    paddingBottom:7
  },
  current:{
    borderBottomWidth:3,
    borderColor:colors.hintColor
  },
  container:{
    flexDirection:'row',
    width:'90%',
    alignSelf:'center',
    borderBottomWidth:1,
    borderColor:colors.halfTransparentColorPrimary
  }
})