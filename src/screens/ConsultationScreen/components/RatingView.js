import React from 'react';

import {
  View,
  StyleSheet,
  Text
} from 'react-native';
import { AirbnbRating } from 'react-native-ratings';


export const RatingView = ({text,rating,onFinishRating}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <View style={{flexDirection:'row'}}>
        {
          <AirbnbRating
            showRating ={false}
            ratingDefault={rating}
            onFinishRating={onFinishRating}
            style={{ paddingVertical: 10 }}
          />
        }
      </View>
    </View>
  );
};

const styles=StyleSheet.create({
  container:{
    marginTop:15,
    width:'100%',
    alignItems:'center'
  },
  text:{
    marginBottom:10,
    textAlign:'center'
  }
})