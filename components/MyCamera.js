import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';

import BaseScene from './BaseScene';
import Camera from 'react-native-camera';
import ShowImage from './ShowImage';

class MyCamera extends BaseScene {
  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[照相]</Text>
        </Camera>
      </View>
    );
  }
  
  takePicture() {
    this.camera.capture()
      .then(((data) => {
        //alert(data.path);
        this.props.navigator.push({
          title: 'ShowImage',
          component: ShowImage,
          params: {
            url:data.path
          }
        });
      }).bind(this))
      .catch(err => console.error(err));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height-100,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});

export default MyCamera;