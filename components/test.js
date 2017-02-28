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
import BaseComponent from './BaseComponent';

export default class Test extends BaseComponent {
  render() {
    return (
      <View>
        <Image source={require('../images/Bananavarieties.jpg')} style={{width: 50, height: 30}}/>
        <Button title="ok" onPress={this.props.onBack} />
        <Image source={require('../images/Bananavarieties.jpg')} style={{width: 50, height: 30}}/>
        <Button title="NEXT" onPress={() => {
          alert(123);
        }} />
      </View>
    );
  }
}
