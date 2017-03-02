import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image
} from 'react-native';

import BaseScene from './BaseScene';

class ShowImage extends BaseScene {
  render() {
    let pic = {
      uri: this.props.url
    };
    return (
      <View>
        <Image source={pic} style={{width: 350, height: 600}}/>
      </View>
    );
  }
}


export default ShowImage;