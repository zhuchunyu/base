import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ListView,
  Button,
  BackAndroid
} from 'react-native';
import BaseScene from './BaseScene';

import ImagePicker from 'react-native-image-crop-picker';

export default class ButtonOpen extends BaseScene {
  render() {
    return (
      <View>
        <Image source={require('../images/Bananavarieties.jpg')} style={{width: 50, height: 30}}/>
        <Button title="NEXT" onPress={() => {
          alert(123);
        }} />
        <Button title="照相机" onPress={() => {
          
          ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
            alert(image);
          }).catch(function (err) {
            alert(err);
          });
        }} style={{marginTop:5}} />
      </View>
    );
  }
}
